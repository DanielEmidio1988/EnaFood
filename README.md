# dFood

## 📖 Introdução

Esta é uma aplicação BackEnd para um sistema de delivery, dFood, onde o usuário poderá cadastrar sua conta e realizar pedidos de produtos cadastrados e manipula-los (inserir, aumentar/diminuir quantidade, remover, etc...).

`Observação: ` Para facilitar o uso e experiência do usuário a aplicação, as informações de usuário e senha da base MongoDB não foi aplicada no arquivo .env, uma vez que não se trata de um projeto real.

## 👥Equipe
| [<img src="https://avatars.githubusercontent.com/u/111311678?v=4" width=115><br><sub>Daniel Emidio</sub>](https://github.com/DanielEmidio1988) |
| :---: |

## 🧭Status do Projeto
- ⏳Concluido

## 📄Concepção do Projeto
Documentação Postman: [clique aqui](https://documenter.getpostman.com/view/24460616/2s93JtRPTi)

### Instalando
```bash
# Instalando dependências
npm install

# executando o projeto
npm run dev
```

Para este projeto, foram modelados 4 entidades: USERS(usuários), PRODUCTS(produtos), DELIVERYS(Pedidos), DELIVERYS_PRODUCTS(Relação Produto x Delivery).

**users:** username, email, password, role, phone, created_at, address_street, address_street_number, address_cep, address_complement, address_uf, city;

**products:** name, price, description, image_url, stock_product, created_at, updated_at

**deliverys:** user_id, total_price, paid, form_payment, created_at, delivery_confirmation, delivery_address_street, delivery_address_street_number, delivery_address_cep,  delivery_address_complement;

**deliverys_products:** product_id, delivery_id, total_quantity, total_purchase 

![Preview](./assets/diagram.png)

### Endpoints
--Users

**-Post Signup:** Cadastro de novos clientes
```bash
location: http://localhost:3003/users/signup

Request:
{
    "username":"Nome", 
    "email": "nome@dominio.com",
    "password":"123456",
    "phone":"(99)99999-9999",
    "address_street":"Rua Nome Rua",
    "address_street_number":"999",
    "address_cep":"99999999",
    "address_complement":"Complemento Endereço",
    "address_uf": "UF",
    "city":"Cidade"
}
```

```bash
Response:
{
     "message":"Usuário cadastrado na Base de Dados"
}
```
**-Get AllUsers:** Retorna todos os clientes

```bash
location: http://localhost:3003/users/

Request:

```

```bash
Response:
[
    {
        "username":"Nome", 
        "email": "nome@dominio.com",
        "password":"123456",
        "phone":"(99)99999-9999",
        "address_street":"Rua Nome Rua",
        "address_street_number":"999",
        "address_cep":"99999999",
        "address_complement":"Complemento Endereço",
        "address_uf": "UF",
        "city":"Cidade"
        "__v": 0
    },
    {
        "username":"Nome", 
        "email": "nome@dominio.com",
        "password":"123456",
        "phone":"(99)99999-9999",
        "address_street":"Rua Nome Rua",
        "address_street_number":"999",
        "address_cep":"99999999",
        "address_complement":"Complemento Endereço",
        "address_uf": "UF",
        "city":"Cidade"
        "__v": 0
    }
]
```

**-Get User By Id:** Retorna cliente pelo ID, com histórico de deliverys.
```bash
location: http://localhost:3003/users/:id/purchases

Request:

```

```bash
Response:
{
    "_id": "640cf4ca3fe268e1f56aa667",
    "username": "Daniel Emidio",
    "email": "daniel@teste.com",
    "role": "NORMAL",
    "phone": "(11)99999-8888",
    "created_at": "2023-03-11T21:38:18.171Z",
    "address_street": "Rua do Teste",
    "address_street_number": "1",
    "address_cep": "99999999",
    "address_complement": "N/A",
    "address_uf": "SP",
    "city": "São Paulo",
    "deliverys": [
        {
            "_id": "640dfe308685eb0ceae41c51",
            "user_id": "640cf4ca3fe268e1f56aa667",
            "total_price": 115,
            "paid": true,
            "form_payment": "VR",
            "created_at": "2023-03-12T16:30:40.283Z",
            "delivery_address_street": "",
            "delivery_address_street_number": "",
            "delivery_address_cep": "",
            "delivery_address_complement": "",
            "__v": 0
        }
    ]
}
```

--Product

**-Get Products:** Retorna todos os produtos:
```bash
location: http://localhost:3003/products

Request:
{

}
```

```bash
Response:
[
    {
        "_id": "640d35cc418b105350a03bf0",
        "name": "Hamburguer The Flash",
        "price": 20,
        "description": "Pão de Brioche, 120gr de Carne Bovina, Queijo,Alface,Tomate",
        "image_url": "prod01.png",
        "stock_product": 0,
        "created_at": "2023-03-12T02:15:40.747Z",
        "updated_at": "2023-03-12T02:15:40.747Z",
        "__v": 0
    },
    {
        "_id": "640d360d418b105350a03bf6",
        "name": "Hamburguer Do Infinito",
        "price": 49.5,
        "description": "Pão Fermentação Natural, 180gr de Carne Bovina, Queijo, Picles,Ovo Frito,Cheedar,Mostarda Dijon, Maionese da Casa,Alface,Tomate",
        "image_url": "prod02.png",
        "stock_product": 2,
        "created_at": "2023-03-12T02:16:45.782Z",
        "updated_at": "2023-03-12T16:30:40.747Z",
        "__v": 0
    }
]
```

**-Get Product by Id:** Retorna produto pela Id, com histórico de todos os deliverys onde o produto foi solicitado.
```bash
location: http://localhost:3003/products/:id

Request:
{

}

```

```bash
Response:
{
    "_id": "640e485c169d50b7f37cc8ef",
    "name": "Hamburguer Esmaga Hulk",
    "price": 41,
    "description": "Pão de Hamburguer, com 3 fatias de 120gr de carne  bovina para esmagar a sua fome, bacon, queijo prato e maionese da casa",
    "image_url": "prod04.png",
    "stock_product": 9,
    "delivery_historic": [
        {
            "delivery_id": "640e4b7a2e43c4167e22f020",
            "quantity": 1
        }
    ]
}
```

**-Post Product:**  Cadastro de novos produtos
```bash
location: http://localhost:3003/products/

Request:
{
    "name":"Nome Produto", 
    "price": 1, 
    "description": "descrição produto.", 
    "image_url":"imagem produto"
}

```

```bash
Response:
{
     "message":"Produto cadastrado na Base de Dados"
}
```

**-Put Product:** Atualização de produtos cadastrados
```bash
location: http://localhost:3003/products/:id

Request:
{
    "name": "Nome do Produto",
    "price": 1,
    "stock_product": 1,
    "description": "Descrição do Produto",
}

```

```bash
Response:
{
    "message": "Produto atualizado com sucesso"
}
```

**-Delete product:** Excluir produto cadastrado
```bash
location: http://localhost:3003/products/:id

Request:

```

```bash
Response:
{
     "message":"Produto excluido da base de dados"
}
```


--Delivery

**-Get Deliverys:** Retorna todos os pedidos cadastrados
```bash
location: http://localhost:3003/delivery/

Request:

```

```bash
Response:

[
    {
        "_id": "640dfe308685eb0ceae41c51",
        "user_id": "640cf4ca3fe268e1f56aa667",
        "total_price": 115,
        "paid": true,
        "form_payment": "VR",
        "created_at": "2023-03-12T16:30:40.283Z",
        "delivery_address_street": "",
        "delivery_address_street_number": "",
        "delivery_address_cep": "",
        "delivery_address_complement": "",
        "__v": 0
    },
    {
        "_id": "640e49cb169d50b7f37cc903",
        "user_id": "640e4984169d50b7f37cc8fd",
        "total_price": 46,
        "paid": true,
        "form_payment": "Débito",
        "created_at": "2023-03-12T21:53:15.618Z",
        "delivery_address_street": "",
        "delivery_address_street_number": "",
        "delivery_address_cep": "",
        "delivery_address_complement": "",
        "__v": 0
    }
]

```

**-Get Delivery by Id:** Retorna pedido pela Id, com relação de produtos solicitados.
```bash
location: http://localhost:3003/delivery/:id

Request:

```

```bash
Response:
{
    "_id": "640dfe308685eb0ceae41c51",
    "user_id": "640cf4ca3fe268e1f56aa667",
    "username": "Daniel Emidio",
    "total_price": 115,
    "paid": true,
    "form_payment": "VR",
    "created_at": "2023-03-12T16:30:40.283Z",
    "delivery_address_street": "",
    "delivery_address_street_number": "",
    "delivery_address_cep": "",
    "delivery_address_complement": "",
    "products": [
        {
            "_id": "640d360d418b105350a03bf6",
            "name": "Hamburguer Do Infinito",
            "price": 49.5,
            "description": "Pão Fermentação Natural, 180gr de Carne Bovina, Queijo, Picles,Ovo Frito,Cheedar,Mostarda Dijon, Maionese da Casa,Alface,Tomate",
            "image_url": "prod02.png",
            "stock_product": 2,
            "created_at": "2023-03-12T02:16:45.782Z",
            "updated_at": "2023-03-12T16:30:40.747Z",
            "__v": 0
        },
        {
            "_id": "640d466c182eb6c39648964c",
            "name": "Porção de Batata Pequena",
            "price": 8,
            "description": "100gr de batata frita levemente temperada",
            "image_url": "prod03.png",
            "stock_product": 0,
            "created_at": "2023-03-12T03:26:36.150Z",
            "updated_at": "2023-03-12T22:01:48.636Z",
            "__v": 0
        }
    ]
}
```

**-Post Delivery:** Cadastra novo pedido
```bash
location: http://localhost:3003/delivery/

Request:
{
    "idprod": "nº Id do Produto",
    "iduser": "nº Id do usuário/cliente",
    "quantity": 1
}

```

```bash
{
    "message": "Pedido gerado com sucesso!",
    "id": "6414c5a2f047db3a861e1fef"
}
```

**-Post Add Product:** Adiciona produto ao pedido
```bash
location: http://localhost:3003/delivery/:id

Request:
{
    "idprod": "nº Id do Produto",
    "iduser": "nº Id do usuário/cliente",
    "quantity": 1
}

```

```bash
Response:
{
    "message": "Produto inserido com sucesso!"
}
```

**-Put Delivery:** Atualiza itens do pedido, ajustando o estoque do produto.
```bash
location: http://localhost:3003/delivery/:id

Request:
{
    "idprod": "Id do produto",
    "quantity": 1
}

```

```bash
Response:
{
    "message": "Produto atualizado com sucesso!"
}
```

**-Put Finish Delivery:** Finaliza pedido, considerando endereço de entrega. Caso não tenha nenhuma informação, é considerado o endereço informado no cadastro do cliente.
```bash
location: http://localhost:3003/delivery/:id/finish

Request:
{
    "delivery_address_street": "Endereço de Entrega",
    "delivery_address_street_number": "Numero Residencial",
    "delivery_address_cep": "99999999",
    "delivery_address_complement": "Complemento Endereço",
    "form_payment": "Forma de Pagamento"
}

```

```bash
Response:
{
     "message":"Pedido Finalizado com sucesso"
}
```

**-Delete Prod Delivery:** Excluir produto do pedido
```bash
location: http://localhost:3003/delivery/:id/:idprod

Request:

```

```bash
Response:
{
     "message":"Produto excluido do pedido"
}
```

**-Delete Delivery:** Exclui pedido
```bash
location: http://localhost:3003/delivery/:id

Request:

```

```bash
Response:
{
     "message":"Pedido excluido com sucesso"
}
```


--Phase

**-Get Phase:** Analisa fase atual do projeto;
```bash
location: http://localhost:3003/phase/

Request:

```

```bash
Response:
{
    "total_users": 5,
    "phase_project": "Fase 1 - MVP",
    "qtd_min_products_delivery": 3,
    "qtd_max_products_delivery": 6,
    "average_delivery_users": 2
}
```


### Sobre o Projeto

Para análise da fase do projeto, foi elaborado o endpoint `Get Phase`, que retorna o status atual do projeto, considerando o seguinte cenário:

**-Fase 1 - MVP:** Nesta fase o dFood possui apenas poucos usuários (por volta de 100) e cada usuário pede, em média, 5 vezes por mês. Cada pedido possui de 1 a 5 produtos.

**-Fase 2 – early adopters:** Nesta fase o dFood possui mais usuários (por volta de 10.000) e cada usuário compra, em média, 10 vezes ao mês. Cada compra possui de 1 a 15 produtos.

**-Fase 3 – early majority:** Nesta fase o dFood possui ainda mais usuários (por volta de 1.000.000) e cada usuário compra, em média, 25 vezes ao mês. Cada compra possui de 1 a 20 produtos.

**-Fase 4 – late majority:** Nesta fase o dFood é um sucesso e é a principal rede de delivery Brasil (por volta de 50.000.000 de usuários) e cada usuário publica, em média, 30 vezes ao mês. Cada compra possui de 1 a 20 produtos.


## 💻Tecnologias 

![NodeJs](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Git](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)

### Bibliotecas utilizadas
```bash
- cors: biblioteca para liberar acesso externo ao servido;
- express : framework para criar o servidor (API);
- mongoose: para conexão do MongoDB;
- dotenv: biblioteca de variáveis de ambiente;
```

## 💡Programas utilizados:
- Postman API Platform
- VSCode

## 📫 Contato

E-mail: emidio.daniel@hotmail.com

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/danielemidio1988/)
[![Codewars](https://img.shields.io/badge/Codewars-B1361E?style=for-the-badge&logo=Codewars&logoColor=white)](https://www.codewars.com/users/DanielEmidio1988)
