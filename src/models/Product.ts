import mongoose, {Schema, Document} from "mongoose";

export interface ProductSchema extends Document{
    name: string; //Nome do produto
    price: number; //Preço do produto
    description: string; //descrição do produto
    image_url: string; //imagem do produto (Aplicavel ao Front-End)
    stock_product: number; //quantidade de itens no estoque
    created_at: Date; //Data de criação do produto
    updated_at: Date; //Data de atualização do produto
}

const ProductSchema = new Schema({
    name: {type:String, require:true},
    price: {type:Number, require:true, unique: true},
    description: {type:String, require:true},
    image_url: {type:String},
    stock_product: {type: Number, default: 0},
    created_at: {type:Date, default:(new Date()).toISOString()},
    updated_at: {type:Date, default:(new Date()).toISOString()},

})

export const Product = mongoose.model<ProductSchema>('Products', ProductSchema)