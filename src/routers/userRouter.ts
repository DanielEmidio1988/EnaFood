import express from 'express'
import { UserController } from '../controller/UserController'
import { HashManager } from '../services/HashManager'
import { TokenManager } from '../services/TokenManager'

export const userRouter = express.Router()

const userController = new UserController(
    // new HashManager(),
    // new TokenManager()
)

//Daniel: endpoint para resgatar todos os clientes (ROTA ADMIN!)
userRouter.get("/",userController.getAllUsers)

//Daniel: endpoint para cadastrar um novo cliente
userRouter.post("/signup", userController.signUp)

//Daniel: endpoint para verificar o histórico de compra do cliente
userRouter.get("/:id/purchases", userController.getUserbyId)