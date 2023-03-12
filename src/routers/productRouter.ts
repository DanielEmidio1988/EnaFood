import express from 'express'
import { ProductController } from '../controller/ProductController'
import { HashManager } from '../services/HashManager'
import { TokenManager } from '../services/TokenManager'

export const productRouter = express.Router()

const productController = new ProductController(
    // new HashManager(),
    // new TokenManager()
)

//Daniel: endpoint para resgatar todos os produtos
productRouter.get("/", productController.getAllProducts)

//Daniel: endpoins para resgatar um produto pela 'id'
productRouter.get("/:id", productController.getProductsById)

//Daniel: endpoint para cadastrar um novo produto
productRouter.post("/", productController.insertNewProduct)

//Daniel: endpoint para atualização de produto
productRouter.put("/:id", productController.updateProduct)

//Daniel: endpoint para excluir produto
productRouter.delete("/:id", productController.deleteProductById)