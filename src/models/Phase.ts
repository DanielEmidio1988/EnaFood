import mongoose, {Schema, Document} from "mongoose";
import { ROLE_USER } from "../types";

//Daniel: talvez não seja necessário
export interface PhaseSchema extends Document{
    quantity_users: number;
    phase_name: string;
    qtd_min_products_purchase: number;
    qtd_max_products_purchase: number;
    average_purchases_users: number;
}

const PhaseSchema = new Schema({
    quantity_users: {type:String, require:true},
    phase_name: {type:String, require:true, unique: true},
    qtd_min_products_purchase: {type:String, require:true},
    qtd_max_products_purchase: {type:String, require:true, enum: [ROLE_USER.NORMAL, ROLE_USER.ADMIN], default: ROLE_USER.NORMAL},
    average_purchases_users: {type:Date, default:Date.now},
})

export const User = mongoose.model<PhaseSchema>('Phase', PhaseSchema)