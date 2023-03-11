import cors from 'cors'
import express from "express";
import mongoose from 'mongoose';
import { userRouter } from './routers/userRouter';
import { phaseRouter } from './routers/phaseRouter';

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

//Daniel: rota de usuário
app.use('/users', userRouter)

//Daniel: rota ADMIN
app.use('/phase', phaseRouter)

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

// //Daniel: listar todos os usuários
// app.get('/users',(req:Request, res:Response)=>{
//     try {
        
//     } catch (error) {
//         console.log(error)

//         if(res.statusCode === 200){
//             res.status(500)
//         }
                
//         if (error instanceof Error) {
//             res.send(error.message)
//         } else {
//             res.send("Erro inesperado")
//         } 
//     }
// })

// //Daniel: login de usuário
// app.post('/users/login',(req:Request, res:Response)=>{
//     try {
        
//     } catch (error) {
//         console.log(error)

//         if(res.statusCode === 200){
//             res.status(500)
//         }
                
//         if (error instanceof Error) {
//             res.send(error.message)
//         } else {
//             res.send("Erro inesperado")
//         } 
//     }
// })

// //Daniel: cadastrar usuário
// app.post('/users/signup',(req:Request, res:Response)=>{
//     try {
        
//     } catch (error) {
//         console.log(error)

//         if(res.statusCode === 200){
//             res.status(500)
//         }
                
//         if (error instanceof Error) {
//             res.send(error.message)
//         } else {
//             res.send("Erro inesperado")
//         } 
//     }
// })

// //Daniel: analisar histórico de compra usuário
// app.get('/users/:id/purchases',(req:Request, res:Response)=>{
//     try {
        
//     } catch (error) {
//         console.log(error)

//         if(res.statusCode === 200){
//             res.status(500)
//         }
                
//         if (error instanceof Error) {
//             res.send(error.message)
//         } else {
//             res.send("Erro inesperado")
//         } 
//     }
// })

// //Daniel: buscar produtos
// app.get('/products',(req:Request, res:Response)=>{
//     try {
        
//     } catch (error) {
//         console.log(error)

//         if(res.statusCode === 200){
//             res.status(500)
//         }
                
//         if (error instanceof Error) {
//             res.send(error.message)
//         } else {
//             res.send("Erro inesperado")
//         } 
//     }
// })

// //Daniel: cadastrar produto
// app.post('/products',(req:Request, res:Response)=>{
//     try {
        
//     } catch (error) {
//         console.log(error)

//         if(res.statusCode === 200){
//             res.status(500)
//         }
                
//         if (error instanceof Error) {
//             res.send(error.message)
//         } else {
//             res.send("Erro inesperado")
//         } 
//     }
// })

// //Daniel: Atualizar produto
// app.put('/products',(req:Request, res:Response)=>{
//     try {
        
//     } catch (error) {
//         console.log(error)

//         if(res.statusCode === 200){
//             res.status(500)
//         }
                
//         if (error instanceof Error) {
//             res.send(error.message)
//         } else {
//             res.send("Erro inesperado")
//         } 
//     }
// })

// //Daniel: analisar pedidos
// app.get('/purchases',(req:Request, res:Response)=>{
//     try {
        
//     } catch (error) {
//         console.log(error)

//         if(res.statusCode === 200){
//             res.status(500)
//         }
                
//         if (error instanceof Error) {
//             res.send(error.message)
//         } else {
//             res.send("Erro inesperado")
//         } 
//     }
// })

// //Daniel: buscar compra individual
// app.get('/purchases/:id',(req:Request, res:Response)=>{
//     try {
        
//     } catch (error) {
//         console.log(error)

//         if(res.statusCode === 200){
//             res.status(500)
//         }
                
//         if (error instanceof Error) {
//             res.send(error.message)
//         } else {
//             res.send("Erro inesperado")
//         } 
//     }
// })

// //Daniel: cadastrar compra
// app.post('/purchases',(req:Request, res:Response)=>{
//     try {
        
//     } catch (error) {
//         console.log(error)

//         if(res.statusCode === 200){
//             res.status(500)
//         }
                
//         if (error instanceof Error) {
//             res.send(error.message)
//         } else {
//             res.send("Erro inesperado")
//         } 
//     }
// })

// //Daniel: atualizar compra compra
// app.put('/purchases',(req:Request, res:Response)=>{
//     try {
        
//     } catch (error) {
//         console.log(error)

//         if(res.statusCode === 200){
//             res.status(500)
//         }
                
//         if (error instanceof Error) {
//             res.send(error.message)
//         } else {
//             res.send("Erro inesperado")
//         } 
//     }
// })

// //Daniel: excluir compra
// app.delete('/purchases',(req:Request, res:Response)=>{
//     try {
        
//     } catch (error) {
//         console.log(error)

//         if(res.statusCode === 200){
//             res.status(500)
//         }
                
//         if (error instanceof Error) {
//             res.send(error.message)
//         } else {
//             res.send("Erro inesperado")
//         } 
//     }
// })