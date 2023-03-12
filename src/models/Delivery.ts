import mongoose, {Schema, Document} from "mongoose";
import { FORM_PAYMENT } from "../types";
import { UserSchema } from "./User";

export interface DeliverySchema extends Document{

    user_id: UserSchema['_id'] //Referencia ao endereço 
    total_price: number //Valor total do pedido
    paid:boolean //confirmação de pedido aberto ou fechado    
    form_payment: FORM_PAYMENT //forma de pagamento do pedido
    created_at: string //data de criação do pedido
    delivery_confirmation: boolean //confirmação de entrega do pedido
    delivery_address_street: string; //Nome da rua de entrega do pedido usuário
    delivery_address_street_number: string; //Nº da Residencia de entrega do pedido usuário
    delivery_address_cep: string; //CEP de entrega do pedido do usuário
    delivery_address_complement: string; //Complemento Residencia de entrega do pedido usuário
}

const DeliverySchema = new Schema({
    user_id: {type:Schema.Types.ObjectId, ref: "Users", require:true},
    total_price: {type:Number, require:true},
    paid: {type:Boolean, default: false},
    form_payment: {type: String, enum: [FORM_PAYMENT.AVISTA, FORM_PAYMENT.CREDITO, FORM_PAYMENT.DEBITO, FORM_PAYMENT.VA, FORM_PAYMENT.VR], default: FORM_PAYMENT.AVISTA},
    created_at: {type:Date, default:(new Date()).toISOString()},
    delivery_address_street: {type:String, require:true},
    delivery_address_street_number: {type:String, require:true},
    delivery_address_cep: {type:String, require:true},
    delivery_address_complement: {type:String},
})

export const Delivery = mongoose.model<DeliverySchema>('Deliverys', DeliverySchema)