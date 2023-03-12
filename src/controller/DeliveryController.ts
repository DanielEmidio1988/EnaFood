import { Request, Response } from 'express';
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

            const filterUser = await User.findOne({_id:iduser})
            const filterProd = await Product.findOne({_id:idprod})

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

            //Daniel: atualização da tabela Delivery_Product
            const newDeliveryProduct = new DeliveryProduct({
                product_id: filterProd._id,
                delivery_id: newDelivery._id,
                quantity,
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

            const filterDelivery = await Delivery.findOne({_id: id}) //SERÁ ADICIONADO CONDICIONAL CASO PEDIDO NÃO SEJA ACHADO
   
            const filterUser = await User.findOne({_id:iduser}) //SERÁ ADICIONADO CONDICIONAL CASO USUÁRIO NÃO SEJA ACHADO
            const filterProd = await Product.findOne({_id:idprod})
            
            //Daniel: atualização da tabela Delivery
            const updateDelivery = {             
                total_price: (filterProd.price * quantity) + filterDelivery.total_price
            }

            await Delivery.updateOne({_id: id},updateDelivery)

            //Daniel: atualização da tabela Delivery_Product
            const newDeliveryProduct = new DeliveryProduct({
                product_id: filterProd._id,
                delivery_id: id,
                quantity,
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

    // //Daniel: listar todos os produtos
    // public async getProductsById(req: Request, res: Response){
    //     try {
    //         const id = req.params.id as string

    //         const filterProduct = await Product.findOne({_id: id})
                
    //         if(filterProduct === null){
    //             res.status(400)
    //             throw new Error("'id' não existe")
    //         }

    //         res.status(200).send(filterProduct)
     
    //     } catch (error) {
    //         console.log(error)
            
     
    //         if(res.statusCode === 200){
    //             res.status(500)
    //         }
                         
    //         if (error instanceof Error) {
    //             res.send(error.message)
    //             } else {
    //                 res.send("Erro inesperado")
    //             } 
    //     }
    // }

    // //Daniel: atualizar produto
    // public async updateProduct(req: Request, res: Response){
    //     try {
    //         const id = req.params.id as string | undefined
    //         const newName = req.body.name as string | undefined
    //         const newPrice = req.body.price as number | undefined
    //         const newDescription = req.body.description as string | undefined
    //         const newStock_product = req.body.stock_product as number | undefined
    //         const filterProduct = await Product.findOne({_id: id})

    //         if (newName !== undefined){
    //             if (typeof newName !== "string"){
    //                 res.status(400);
    //                 throw new Error ("Valor inválido! 'Name' precisa ser String");
    //             }
    //         }

    //         if (newPrice !== undefined){
    //             if (typeof newPrice !== "number"){
    //                 res.status(400);
    //                 throw new Error ("Valor inválido! 'Price' precisa ser Number");
    //             }
    //         }

    //         if (newDescription !== undefined){
    //             if (typeof newDescription !== "string"){
    //                 res.status(400);
    //                 throw new Error ("Valor inválido! 'Description' precisa ser String");
    //             }
    //         }

    //         if (newStock_product !== undefined){
    //             if (typeof newStock_product !== "number"){
    //                 res.status(400);
    //                 throw new Error ("Valor inválido! 'Stock_Product' precisa ser 'Number'");
    //             }
    //         }

    //         if(filterProduct){
    //             const updateProduct = {
    //                 name: newName || filterProduct.name,
    //                 price: newPrice || filterProduct.price,
    //                 description: newDescription || filterProduct.description,
    //                 stock_product: newStock_product || filterProduct.stock_product,
    //                 updated_at: (new Date()).toISOString()
    //             }


    //             await Product.updateOne({_id:id}, updateProduct)
    //             res.status(200).send("Produto atualizado com sucesso")
    //         }      
     
    //     } catch (error) {
    //         console.log(error)
            
     
    //         if(res.statusCode === 200){
    //             res.status(500)
    //         }
                         
    //         if (error instanceof Error) {
    //             res.send(error.message)
    //             } else {
    //                 res.send("Erro inesperado")
    //             } 
    //     }
    // }

    //     //Daniel: excluir produto
    //     public async deleteProductById(req: Request, res: Response){
    //         try {
    //             const id = req.params.id as string
    
    //             const filterProduct = await Product.findOne({_id: id})
                    
    //             if(filterProduct === null){
    //                 res.status(400)
    //                 throw new Error("'id' não existe")
    //             }
                
    //             await Product.deleteOne({_id:id})
    //             res.status(200).send('Produto excluido com sucesso!')
         
    //         } catch (error) {
    //             console.log(error)
                
         
    //             if(res.statusCode === 200){
    //                 res.status(500)
    //             }
                             
    //             if (error instanceof Error) {
    //                 res.send(error.message)
    //                 } else {
    //                     res.send("Erro inesperado")
    //                 } 
    //         }
    //     }
}