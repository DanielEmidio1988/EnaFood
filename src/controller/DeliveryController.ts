import { Request, Response } from 'express';
import { ObjectId } from 'mongodb'
import { Delivery } from '../models/Delivery';
import { DeliveryProduct } from '../models/DeliveryProducts';
import { Product } from '../models/Product';
import { User } from '../models/User';
import { TokenPayload } from '../types';
import { HashManager } from '../services/HashManager';
import { TokenManager } from '../services/TokenManager';

export class DeliveryController{
    constructor(

    ){}

    public async insertNewDelivery(req:Request,res:Response){
        try {

            const {idprod, iduser, quantity} = req.body

            if(!idprod){
                res.status(422)
                throw new Error("'idprod' é obrigatório!")
            }

            if(!iduser){
                res.status(422)
                throw new Error ("'iduser' é obrigatório!")
            }

            if(!quantity){
                res.status(422)
                throw new Error("'quantity' é obrigatório!")
            }

            if(quantity <= 0){
                res.status(400);
                throw new Error ("Quantidade de produto inválida, não pode ser igual ou menor que 0.")
            }

            const filterUser = await User.findOne({_id:iduser})
            const filterProd = await Product.findOne({_id:idprod})

            if(filterProd.stock_product < 1){
                res.status(422)
                throw new Error ("Produto não disponivel em Estoque")
            }

            if(quantity > filterProd.stock_product){
                res.status(422)
                throw new Error ("Quantidade solicitada acima do volume disponivel em estoque")
            }

            const delivery = {
                user_id: filterUser._id,
                total_price: filterProd.price * quantity,
                delivery_address_street: filterUser.address_street,
                delivery_address_street_number: filterUser.address_street_number,
                delivery_address_cep: filterUser.address_cep,
                delivery_address_complement: filterUser.address_complement === ''? 'N/A' : filterUser.address_complement,
            }

            //Daniel: criação da tabela de delivery
            const newDelivery = new Delivery({
                ...delivery,
                created_at: (new Date()).toISOString(),
            })

            await Delivery.create(newDelivery)

            //Daniel: incluindo pedido na tabela Delivery_Product

            const deliveryProduct = {
                product_id: filterProd._id,
                delivery_id: newDelivery._id,
                total_quantity: quantity,
                total_purchase: quantity * filterProd.price

            }
            const newDeliveryProduct = new DeliveryProduct({
                ...deliveryProduct
            })

            await DeliveryProduct.create(newDeliveryProduct)    
            
            //Daniel: atualização do estoque do produto na tabela
            const updateProduct = {
                    stock_product: filterProd.stock_product - quantity,
                    updated_at: (new Date()).toISOString()
                }

            await Product.updateOne({_id:idprod}, updateProduct)      

            res.status(201).send({ message: "Pedido gerado com sucesso!", id:newDelivery._id});

        } catch (error) {
            console.log(error)

            if(res.statusCode === 200){
                res.status(500)
            }
                    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }  
        }
    }

    //Daniel: listar todos os deliverys
    public async getAllDeliverys(req: Request, res: Response){
       try {
            const filterDeliverys = await Delivery.find()
            
            res.status(200).send(filterDeliverys)

       } catch (error) {
            console.log(error)

            if(res.statusCode === 200){
                res.status(500)
            }
                    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            } 
       }
    }

    //Daniel: listar todos os deliverys
    public async getDeliverybyId(req: Request, res: Response){
        try {
            const id = req.params.id
            
            const filterDeliverys = await Delivery.findOne({_id:id})
            const filterUser = await User.findOne({_id:filterDeliverys.user_id})
            const filterDeliverysProducts = await DeliveryProduct.find({delivery_id:id})
            const filterProducts = await Product.find()

            const delivery = {
                _id: filterDeliverys._id,
                user_id: filterDeliverys.user_id,
                username: filterUser.username,
                total_price: filterDeliverys.total_price,
                paid: filterDeliverys.paid,
                form_payment: filterDeliverys.form_payment,
                created_at: filterDeliverys.created_at,
                delivery_address_street: filterDeliverys.delivery_address_street,
                delivery_address_street_number: filterDeliverys.delivery_address_street_number,
                delivery_address_cep: filterDeliverys.delivery_address_cep,
                delivery_address_complement: filterDeliverys.delivery_address_complement,
                products:getProduct(),
            }

            function getProduct(){
                let listProd = []
                for(let i=0; i<filterDeliverysProducts.length;i++){
                    const product = filterProducts.find((product)=>{
                        return product._id.equals(new ObjectId(filterDeliverysProducts[i].product_id));
                    })
                    listProd.push(product)
                }

                return listProd
            }
             
             res.status(200).send(delivery)
 
        } catch (error) {
             console.log(error)
 
             if(res.statusCode === 200){
                 res.status(500)
             }
                     
             if (error instanceof Error) {
                 res.send(error.message)
             } else {
                 res.send("Erro inesperado")
             } 
        }
     }

    //Daniel: inserir novo produto no pedido
    public async insertNewProdDelivery(req:Request,res:Response){
        try {
            
            const id = req.params.id
            const {idprod, iduser, quantity} = req.body

            if(!idprod){
                res.status(422)
                throw new Error("'idprod' é obrigatório!")
            }

            if(!iduser){
                res.status(422)
                throw new Error ("'iduser' é obrigatório!")
            }

            if(!quantity){
                res.status(422)
                throw new Error("'quantity' é obrigatório!")
            }

            if(quantity <= 0){
                res.status(400);
                throw new Error ("Quantidade de produto inválida, não pode ser igual ou menor que 0.")
            }

            const filterDelivery = await Delivery.findOne({_id: id})
            
            if(filterDelivery.paid){
                res.status(422)
                throw new Error("Não é possivel adicionar produtos a pedidos finalizados")
            }

            const filterProd = await Product.findOne({_id:idprod})

            if(filterProd.stock_product < 1){
                res.status(422)
                throw new Error ("Produto não disponivel em Estoque")
            }

            if(quantity > filterProd.stock_product){
                res.status(422)
                throw new Error ("Quantidade solicitada acima do volume disponivel em estoque")
            }
            
            //Daniel: atualização da tabela Delivery
            const updateDelivery = {             
                total_price: (filterProd.price * quantity) + filterDelivery.total_price
            }

            await Delivery.updateOne({_id: id},updateDelivery)

            //Daniel: atualização da tabela Delivery_Product
            const newDeliveryProduct = new DeliveryProduct({
                product_id: filterProd._id,
                delivery_id: id,
                total_quantity: quantity,
                total_purchase: quantity * filterProd.price
            })

            await DeliveryProduct.create(newDeliveryProduct)    
            
            //Daniel: atualização do estoque do produto na tabela
            const updateProduct = {
                    stock_product: filterProd.stock_product - quantity,
                    updated_at: (new Date()).toISOString()
                }

            await Product.updateOne({_id:idprod}, updateProduct)      

            res.status(201).send({ message: "Produto inserido com sucesso!"});

        } catch (error) {
            console.log(error)

            if(res.statusCode === 200){
                res.status(500)
            }
                    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }  
        }
    }

    //Daniel: atualizar produto no pedido
    public async updateProdDelivery(req:Request,res:Response){
        try {
                
            const id = req.params.id
            const {idprod, quantity} = req.body
            let total_price_aux = 0
    
            if(!idprod){
                res.status(422)
                throw new Error("'idprod' é obrigatório!")
            }
    
            if(!quantity){
                res.status(422)
                throw new Error("'quantity' é obrigatório!")
            }

            if(quantity <= 0){
                res.status(400);
                throw new Error ("Quantidade de produto inválida, não pode ser igual ou menor que 0.")
            }
    
            const filterDelivery = await Delivery.findOne({_id: id})

            if(filterDelivery.paid){
                res.status(422)
                throw new Error("Não é possivel adicionar produtos a pedidos finalizados")
            }
       
            const filterProd = await Product.findOne({_id:idprod})

            const findProdInDelivery = await DeliveryProduct.findOne({delivery_id: id, product_id: idprod})
    
            //Daniel: atualização do estoque do produto na tabela
            const updateProduct = {
                    stock_product: quantity > findProdInDelivery.total_quantity ? filterProd.stock_product + (quantity - findProdInDelivery.total_quantity) : filterProd.stock_product + (findProdInDelivery.total_quantity - quantity),
                    updated_at: (new Date()).toISOString()
                }
    
            await Product.updateOne({_id:idprod}, updateProduct)   

            //Daniel: atualização da tabela Delivery_Product
            const updateDeliveryProduct = {
                product_id: filterProd._id,
                delivery_id: id,
                total_quantity: quantity,
                total_purchase: quantity * filterProd.price
            }

            await DeliveryProduct.updateOne({delivery_id: id, product_id: idprod}, updateDeliveryProduct)
             
            const filterDeliveryProd = await DeliveryProduct.find({delivery_id: id})
            
            //Daniel: laço utilizado para atualizar o valor do pedido após a atualização da tabela 'delivery_product'
            for(let i=0; i<filterDeliveryProd.length;i++){
                total_price_aux += filterDeliveryProd[i].total_purchase
            }
            
            //Daniel: atualização da tabela Delivery
            const updateDelivery = {             
                total_price: total_price_aux
            }
    
            await Delivery.updateOne({_id: id},updateDelivery)
    
            res.status(201).send("Pedido atualizado com sucesso!");
    
        } catch (error) {
            console.log(error)
    
            if(res.statusCode === 200){
                res.status(500)
            }
                        
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }  
        }
    }

    //Daniel: finalizar pedido
    public async finishDelivery(req:Request,res:Response){
        try {
            const id = req.params.id
            const {delivery_address_street, 
                delivery_address_street_number, 
                delivery_address_cep, 
                delivery_address_complement,
                form_payment } = req.body
            const filterDelivery = await Delivery.findOne({_id:id})

            if(filterDelivery.paid){
                res.status(422)
                throw new Error("Este pedido já foi finalizado")
            }
    
            const filterUser = await User.findOne({_id:filterDelivery.user_id})         

            const finishDelivery = {
                paid: true,        
                delivery_address_street: filterUser.address_cep === delivery_address_cep || delivery_address_cep === "" ? filterUser.address_street : delivery_address_street,
                delivery_address_street_number: filterUser.address_cep === delivery_address_cep || delivery_address_cep === "" ? filterUser.address_street_number : delivery_address_street_number,
                delivery_address_cep: filterUser.address_cep === delivery_address_cep || delivery_address_cep === "" ? filterUser.address_cep : delivery_address_cep,
                delivery_address_complement: filterUser.address_cep === delivery_address_cep || delivery_address_cep === "" ? filterUser.address_complement : delivery_address_complement,
                form_payment: form_payment,
            }

            await Delivery.updateOne({_id: id}, finishDelivery)   

            res.status(201).send({ message: "Pedido finalizado com sucesso!"});

        } catch (error) {
            console.log(error)

            if(res.statusCode === 200){
                res.status(500)
            }
                    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }  
        }
    }

    //Daniel: excluir pedido
    public async deleteDelivery(req:Request,res:Response){
        try {

            const id = req.params.id

            await DeliveryProduct.deleteMany({delivery_id: id})
            await Delivery.deleteOne({_id:id})

            res.status(201).send("Pedido gerado com sucesso!");

        } catch (error) {
            console.log(error)

            if(res.statusCode === 200){
                res.status(500)
            }
                    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }  
        }
    }

    //Daniel: excluir produto do pedido
    public async deleteProdDelivery(req:Request,res:Response){
        try {

            const {id, idprod} = req.params

            let total_price_aux = 0
    
            const filterDelivery = await Delivery.findOne({_id: id})

            if(filterDelivery.paid){
                res.status(422)
                throw new Error("Não é possivel remover produto de pedido finalizado")
            }
       
            const filterProd = await Product.findOne({_id:idprod})

            const findProdInDelivery = await DeliveryProduct.findOne({delivery_id: id, product_id: idprod})
    
            //Daniel: atualização do estoque do produto na tabela
            const updateProduct = {
                    stock_product: filterProd.stock_product + findProdInDelivery.total_quantity,
                    updated_at: (new Date()).toISOString()
                }
            
            await DeliveryProduct.deleteOne({product_id: idprod})

            await Product.updateOne({_id:idprod}, updateProduct)   
             
            const filterDeliveryProd = await DeliveryProduct.find({delivery_id: id})
            
            //Daniel: laço utilizado para atualizar o valor do pedido após a atualização da tabela 'delivery_product'
            for(let i=0; i<filterDeliveryProd.length;i++){
                total_price_aux += filterDeliveryProd[i].total_purchase
            }
            
            //Daniel: atualização da tabela Delivery
            const updateDelivery = {             
                total_price: total_price_aux
            }
    
            await Delivery.updateOne({_id: id},updateDelivery)
    
            res.status(201).send("Produto excluido com sucesso!");

        } catch (error) {
            console.log(error)

            if(res.statusCode === 200){
                res.status(500)
            }
                    
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }  
        }
    }
}