import mongoose, {Schema, Document} from "mongoose";
import { ROLE_USER, UF } from "../types";

export interface UserSchema extends Document{
    username: string; //Nome do usuário
    email: string; //E-mail do usuário
    password: string; //Senha do usuário
    role: ROLE_USER; //Perfil do usuário
    phone: string; //Telefone do usuário
    created_at: Date; //Data de criação do usuário
    address_street: string; //Nome da rua usuário
    address_street_number: string; //Nº da Residencia usuário
    address_cep: string; //CEP do usuário
    address_complement: string; //Complemento Residencia usuário
    address_uf: UF; //UF usuário
    city: string; //Cidade usuário
}

const UserSchema = new Schema({
    username: {type:String, require:true},
    email: {type:String, require:true, unique: true},
    password: {type:String, require:true},
    role: {type:String, require:true, enum: [ROLE_USER.NORMAL, ROLE_USER.ADMIN], default: ROLE_USER.NORMAL},
    phone: {type: String},
    created_at: {type:Date, default:(new Date()).toISOString()},
    address_street: {type:String, require:true},
    address_street_number: {type:String, require:true},
    address_cep: {type:String, require:true},
    address_complement: {type:String},
    address_uf: {type:String, require:true, enum: [UF.AC,UF.AL,UF.AM,UF.AP,UF.BA,UF.CE,UF.DF,UF.ES,UF.ES,UF.GO,UF.MA,UF.MG,UF.MS,UF.MT,UF.PA,UF.PB,UF.PE,UF.PI,UF.PR,UF.RJ,UF.RN,UF.RO,UF.RR,UF.RS,UF.SC,UF.SE,UF.SP,UF.TO]},
    city: {type:String, require:true},
})

export const User = mongoose.model<UserSchema>('Users', UserSchema)