import { Request, Response } from 'express';
import { User } from '../models/User';
import { DeliveryProduct } from '../models/DeliveryProducts';
import { Delivery } from '../models/Delivery';
import { TokenPayload } from '../types';
import { HashManager } from '../services/HashManager';
import { TokenManager } from '../services/TokenManager';

export class PhaseController{
    constructor(

    ){}

    public async getPhase(req: Request, res: Response){
       try {
            const filterUsers = await User.find()
            
            const filterDeliverysProducts = await DeliveryProduct.aggregate([
                {
                    $group:{
                        _id: "$delivery_id",
                        total: {$sum:"$total_quantity"}
                    }
                }
            ]) //Daniel: variável para somar a quantidade total de itens por pedido.

            const filterDelivery = await Delivery.aggregate([
                {
                  $group: {
                    _id: "$user_id",
                    total_orders: { $sum: 1 }
                  } //Daniel: calculando o total de pedidos para cada cliente
                },
                {
                  $group: {
                    _id: null,
                    averageDelivery: { $avg: "$total_orders" }
                  } //Daniel: calculando a média de produtos
                }
              ])
              
            let delivery_delivery = 0
            let min_delivery = 0 //Daniel: retorna a menor quantidade de produto pedido entre todos os pedidos
            let max_delivery = 0 //Daniel: retorna a maior quantidade de produto pedido entre todos os pedidos
      

            //Daniel: função para ordenar o pedido com a menor e maior quantidade
            function maxMinDelivery(){
                min_delivery = filterDeliverysProducts[0].total
                for(let i=0; i< filterDeliverysProducts.length;i++){
                    min_delivery = min_delivery > filterDeliverysProducts[i].total ? filterDeliverysProducts[i].total : min_delivery 
                    max_delivery = max_delivery < filterDeliverysProducts[i].total ? filterDeliverysProducts[i].total : max_delivery
                }
            }

            maxMinDelivery()

            if(filterUsers.length <= 100){
                const phaseProject = {
                    total_users: filterUsers.length,
                    phase_project: "Fase 1 - MVP",
                    qtd_min_products_delivery: min_delivery,
                    qtd_max_products_delivery: max_delivery,
                    average_delivery_users: filterDelivery[0].averageDelivery,
                }
                res.status(200).send(phaseProject)
            }else if(filterUsers.length > 100 || filterUsers.length <= 10000){
                const phaseProject = {
                    total_users: filterUsers.length,
                    phase_project: "Fase 2 - early adopters",
                    qtd_min_products_delivery: min_delivery,
                    qtd_max_products_delivery: max_delivery,
                    average_delivery_users: filterDelivery[0].averageDelivery,
                }
                res.status(200).send(phaseProject)
            }else if(filterUsers.length > 10000 || filterUsers.length <= 1000000){
                const phaseProject = {
                    total_users: filterUsers.length,
                    phase_project: "Fase 3 - early majority",
                    qtd_min_products_delivery: min_delivery,
                    qtd_max_products_delivery: max_delivery,
                    average_delivery_users: filterDelivery[0].averageDelivery,
                }
                res.status(200).send(phaseProject)
            }else if(filterUsers.length > 1000000){
                const phaseProject = {
                    total_users: filterUsers.length,
                    phase_project: "Fase 4 - late majority",
                    qtd_min_products_delivery: min_delivery,
                    qtd_max_products_delivery: max_delivery,
                    average_delivery_users: filterDelivery[0].averageDelivery,
                }
                res.status(200).send(phaseProject)
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
}