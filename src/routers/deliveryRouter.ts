import express from 'express'
import { DeliveryController } from '../controller/DeliveryController'
import { HashManager } from '../services/HashManager'
import { TokenManager } from '../services/TokenManager'

export const deliveryRouter = express.Router()

const deliveryController = new DeliveryController(
//     // new HashManager(),
//     // new TokenManager()
)

//Daniel: endpoint para resgatar todos os pedidos de delivery
deliveryRouter.get("/", deliveryController.getAllDeliverys)

//Daniel: endpoint para resgatar pedido de delivery individual
deliveryRouter.get("/:id", deliveryController.getDeliverybyId)

//Daniel: endpoint para cadastrar um novo pedido de delivery
deliveryRouter.post("/", deliveryController.insertNewDelivery)

//Daniel: endpoint para adicionar produto ao pedido de delivery
deliveryRouter.post("/:id", deliveryController.insertNewProdDelivery)

//Daniel: endpoint para atualização de pedido de delivery
deliveryRouter.put("/:id/", deliveryController.updateProdDelivery)

//Daniel: endpoint para finalização do pedido de delivery
deliveryRouter.put("/:id/finish", deliveryController.finishDelivery)

//Daniel: endpoint para excluir pedido de delivery
deliveryRouter.delete("/:id", deliveryController.finishDelivery)

//Daniel: endpoint para excluir um produto do pedido de delivery
deliveryRouter.delete("/:id/:idprod", deliveryController.deleteProdDelivery)