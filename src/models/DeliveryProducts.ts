import mongoose, {Schema, Document} from "mongoose";

import { ProductSchema } from "./Product";
import { DeliverySchema } from "./Delivery";

export interface DeliveryProductSchema extends Document{

    product_id: ProductSchema['_id'] //Referencia ao produto do delivery
    delivery_id: DeliverySchema['_id'] //Referencia ao numero do delivery
    quantity: number //Quantidade total do produto no pedido
}

const DeliveryProductSchema = new Schema({
    product_id: {type:Schema.Types.ObjectId, ref: "Products", require:true},
    delivery_id: {type:Schema.Types.ObjectId, ref: "Products", require:true},
    quantity: {type:Number, require:true},
})

export const DeliveryProduct = mongoose.model<DeliveryProductSchema>('DeliverysProducts', DeliveryProductSchema)