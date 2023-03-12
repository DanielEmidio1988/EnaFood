import cors from 'cors'
import express from "express";
import mongoose from 'mongoose';
import { userRouter } from './routers/userRouter';
import { phaseRouter } from './routers/phaseRouter';
import { productRouter } from './routers/productRouter';
import { deliveryRouter } from './routers/deliveryRouter'

const app = express()
const USERDB = 'admin_enafood'
const PASSWORDDB = encodeURIComponent('fqDy2Myc9PLjwNVi')

app.use(cors())

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.use('/users', userRouter) //Daniel: rota de usuário
app.use('/products', productRouter) //Daniel: rota de produtos
app.use('/delivery', deliveryRouter) //Daniel: rota de compras
app.use('/phase', phaseRouter) //Daniel: rota ADMIN

//Daniel: metodo de conexão com a base MongoDB
mongoose.connect(`mongodb+srv://${USERDB}:${PASSWORDDB}@enafoodcluster.hkjpzqv.mongodb.net/?retryWrites=true&w=majority`)
.then(()=>{
    app.listen(3003, ()=>{
        console.log("Conectado ao MongoDB")
    })
})
.catch((error)=>{
    console.log(error)
})