import express from 'express'
import { PhaseController } from '../controller/PhaseController'
import { HashManager } from '../services/HashManager'
import { TokenManager } from '../services/TokenManager'

export const phaseRouter = express.Router()

const phaseController = new PhaseController(
    // new HashManager(),
    // new TokenManager()
)

//Daniel: endpoint para analisar o status do projeto
phaseRouter.get("/",phaseController.getPhase)