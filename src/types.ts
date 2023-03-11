export enum ROLE_USER{
    ADMIN = 'ADMIN',
    NORMAL = 'NORMAL'
}

export enum UF{
    AC = 'AC',
    AL = 'AL',
    AP = 'AP',
    AM = 'AM',
    BA = 'BA',
    CE = 'CE',
    DF = 'DF',
    ES = 'ES',
    GO = 'GO',
    MA = 'MA',
    MT = 'MT',
    MS = 'MS',
    MG = 'MG',
    PA = 'PA',
    PB = 'PB',
    PR = 'PR',
    PE = 'PE',
    PI = 'PI',
    RJ = 'RJ',
    RN = 'RN',
    RS = 'RS',
    RO = 'RO',
    RR = 'RR',
    SC = 'SC',
    SP = 'SP',
    SE = 'SE',
    TO = 'TO',
}

export enum FORM_PAYMENT{
    AVISTA = 'A Vista',
    DEBITO = 'Débito',
    CREDITO = 'Crédito',
    VA = 'Vale Alimentação',
    VR = 'Vale Refeição'
}

export interface PurchaseDB{
    id:string
    user_id: string
    total_price: number
    paid:number    
    form_payment: FORM_PAYMENT
    created_at: string
    delivered_at: string
}

export interface PurchasesProductsDB{
    purchase_id: string, 
    product_id: string,
    quantity:number,
}

//Daniel: interface para dados de Token
export interface TokenPayload {
    id: string,
		username: string,
    role: ROLE_USER
}