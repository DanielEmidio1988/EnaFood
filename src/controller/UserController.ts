import { Request, Response } from 'express';
import { User } from '../models/User';
import { Delivery } from '../models/Delivery';
import { ROLE_USER } from '../types';
import { TokenPayload } from '../types';
import { HashManager } from '../services/HashManager';
import { TokenManager } from '../services/TokenManager';


export class UserController{
    constructor(
        // private hashManager: HashManager,
        // private tokenManager: TokenManager,
    ){}

    //Daniel: cadastro novo usuário
    public async signUp(req: Request, res: Response){
        try {

        const {username, email, password, phone, address_street, address_street_number, address_cep, address_complement, address_uf, city} = req.body
        
        //Daniel: busca de dados para validar se há duplicidade de e-mail
        const findUserByEmail = await User.findOne({email:email})

        if(findUserByEmail){
            res.status(400)
            throw new Error("'E-mail' já cadastrado na base de dados")
        }

        //Daniel: aplicando Hash na senha (VERIFICAR, identificando como 'undefined')
        // const passwordHash = await this.hashManager.hash(password)

        //Daniel: preparando objeto para envio de dados
        const user = {
            username, 
            email,
            password,
            phone, 
            address_street,
            address_street_number, 
            address_cep,
            address_complement,
            address_uf,
            city}
      
        // Daniel: modelando dados para criação de usuário
        const newUser = new User({
            ...user,
            created_at: (new Date()).toISOString(),
            role: ROLE_USER.NORMAL,
        })
        
        // //Daniel: estruturando dados para geração de Token
        // const tokenPayload: TokenPayload={
        //     id: newUser._id,
        //     username: newUser.username,
        //     role: newUser.role,
        // }
        // //Daniel: gerando Token
        // const token = this.tokenManager.createToken(tokenPayload)

        //Daniel: criação do usuário na base de dados
        await User.create(newUser)

        res.status(201).send({ message: "Usuário cadastrado na Base de Dados"});

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
      };
      
      //Daniel: buscar todos os usuários
      public getAllUsers = async (req: Request, res: Response) => {
        try {
          const filterusers = await User.find();
          res.status(200).send(filterusers);
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
      };

            //Daniel: buscar todos os usuários
      public getUserbyId = async (req: Request, res: Response) => {
        try {
            const id = req.params.id

            const filterusers = await User.findOne({_id:id});
            const filterDeliverys = await Delivery.find({user_id: id})

            const user = {
                _id: filterusers.id,
                username: filterusers.username,
                email: filterusers.email,
                role: filterusers.role,
                phone: filterusers.phone,
                created_at: filterusers.created_at,
                address_street: filterusers.address_street,
                address_street_number: filterusers.address_street_number,
                address_cep: filterusers.address_cep,
                address_complement: filterusers.address_complement,
                address_uf: filterusers.address_uf,
                city: filterusers.city,
                deliverys: filterDeliverys
            }

            res.status(200).send(user);
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
      };
}