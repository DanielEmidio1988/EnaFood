import { Request, Response } from 'express';
import { User } from '../models/User';
import { ROLE_USER } from '../types';
import { TokenPayload } from '../types';
import { HashManager } from '../services/HashManager';
import { TokenManager } from '../services/TokenManager';

export class PhaseController{
    constructor(

    ){}

    public async getPhase(req: Request, res: Response){
       try {
            const filterUsers = await User.find()

            //Daniel: APLICAR ESTRUTURA PARA DEFINIR STATUS DO PROJETO
            // quantity_users: number;
            // phase_name: string;
            // qtd_min_products_purchase: number;
            // qtd_max_products_purchase: number;
            // average_purchases_users: number;

            res.status(200).send({clients: filterUsers.length})
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