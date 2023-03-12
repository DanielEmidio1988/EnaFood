import { Request, Response } from 'express';
import { User } from '../models/User';
import { DeliveryProduct } from '../models/DeliveryProducts';
import { Delivery } from '../models/Delivery';
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
            const filterDeliverysProducts = await DeliveryProduct.find()
            const filterDelivery = await Delivery.find()
            let delivery_delivery = 0
            let min_delivery = 0
            let max_delivery = 0
            const rel_delivery = []

            if(filterUsers.length <= 100){
                const phaseProject = {
                    total_users: filterUsers.length,
                    phase_project: "Fase 1 - MVP",
                    qtd_min_products_delivery: min_delivery,
                    qtd_max_products_delivery: max_delivery,
                    average_delivery_users: delivery_delivery,
                }
                res.status(200).send(phaseProject)
            }else if(filterUsers.length > 100 || filterUsers.length <= 10000){
                const phaseProject = {
                    total_users: filterUsers.length,
                    phase_project: "Fase 2 - early adopters",
                    qtd_min_products_delivery: min_delivery,
                    qtd_max_products_delivery: max_delivery,
                    average_delivery_users: delivery_delivery,
                }
                res.status(200).send(phaseProject)
            }else if(filterUsers.length > 10000 || filterUsers.length <= 1000000){
                const phaseProject = {
                    total_users: filterUsers.length,
                    phase_project: "Fase 3 - early majority",
                    qtd_min_products_delivery: min_delivery,
                    qtd_max_products_delivery: max_delivery,
                    average_delivery_users: delivery_delivery,
                }
                res.status(200).send(phaseProject)
            }else if(filterUsers.length > 1000000){
                const phaseProject = {
                    total_users: filterUsers.length,
                    phase_project: "Fase 4 - late majority",
                    qtd_min_products_delivery: min_delivery,
                    qtd_max_products_delivery: max_delivery,
                    average_delivery_users: delivery_delivery,
                }
                res.status(200).send(phaseProject)
            }
            res.status(200).send("Sucesso!")
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