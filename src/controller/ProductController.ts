import { Request, Response } from 'express';
import { Product } from '../models/Product';
import { TokenPayload } from '../types';
import { HashManager } from '../services/HashManager';
import { TokenManager } from '../services/TokenManager';

export class ProductController{
    constructor(

    ){}

    public async insertNewProduct(req:Request,res:Response){
        try {
            const {name, price, description, image_url} = req.body

            if(!name){
                res.status(422)
                throw new Error("'name' é obrigatório!")
            }

            if(!price){
                res.status(422)
                throw new Error ("'price' é obrigatório!")
            }

            if(!description){
                res.status(422)
                throw new Error("'description' é obrigatório!")
            }

            const product = {
                name, 
                price, 
                description, 
                image_url 
            }

            const newProduct = new Product({
                ...product,
                created_at: (new Date()).toISOString(),
                updated_at: (new Date()).toISOString(),
            })

            await Product.create(newProduct)

            res.status(201).send({ message: "Produto cadastrado na Base de Dados", id:newProduct._id});

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

    //Daniel: listar todos os produtos
    public async getAllProducts(req: Request, res: Response){
       try {
            const filterProducts = await Product.find()
            
            res.status(200).send(filterProducts)

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

    //Daniel: listar todos os produtos
    public async getProductsById(req: Request, res: Response){
        try {
            const id = req.params.id as string

            const filterProduct = await Product.findOne({_id: id})
                
            if(filterProduct === null){
                res.status(400)
                throw new Error("'id' não existe")
            }

            res.status(200).send(filterProduct)
     
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

    //Daniel: atualizar produto
    public async updateProduct(req: Request, res: Response){
        try {
            const id = req.params.id as string | undefined
            const newName = req.body.name as string | undefined
            const newPrice = req.body.price as number | undefined
            const newDescription = req.body.description as string | undefined
            const newStock_product = req.body.stock_product as number | undefined
            const filterProduct = await Product.findOne({_id: id})

            if (newName !== undefined){
                if (typeof newName !== "string"){
                    res.status(400);
                    throw new Error ("Valor inválido! 'Name' precisa ser String");
                }
            }

            if (newPrice !== undefined){
                if (typeof newPrice !== "number"){
                    res.status(400);
                    throw new Error ("Valor inválido! 'Price' precisa ser Number");
                }
            }

            if (newDescription !== undefined){
                if (typeof newDescription !== "string"){
                    res.status(400);
                    throw new Error ("Valor inválido! 'Description' precisa ser String");
                }
            }

            if (newStock_product !== undefined){
                if (typeof newStock_product !== "number"){
                    res.status(400);
                    throw new Error ("Valor inválido! 'Stock_Product' precisa ser 'Number'");
                }
            }

            if(filterProduct){
                const updateProduct = {
                    name: newName || filterProduct.name,
                    price: newPrice || filterProduct.price,
                    description: newDescription || filterProduct.description,
                    stock_product: newStock_product || filterProduct.stock_product,
                    updated_at: (new Date()).toISOString()
                }


                await Product.updateOne({_id:id}, updateProduct)
                res.status(200).send("Produto atualizado com sucesso")
            }      
     
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

        //Daniel: excluir produto
        public async deleteProductById(req: Request, res: Response){
            try {
                const id = req.params.id as string
    
                const filterProduct = await Product.findOne({_id: id})
                    
                if(filterProduct === null){
                    res.status(400)
                    throw new Error("'id' não existe")
                }
                
                await Product.deleteOne({_id:id})
                res.status(200).send('Produto excluido com sucesso!')
         
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