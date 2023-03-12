//Daniel: enum para o perfil de usuário
export enum ROLE_USER{
    ADMIN = 'ADMIN',
    NORMAL = 'NORMAL'
}

//Daniel: enum para os estados do território nacional
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

//Daniel: enum para os tipos de pagamento
export enum FORM_PAYMENT{
    AVISTA = 'A Vista',
    DEBITO = 'Débito',
    CREDITO = 'Crédito',
    VA = 'Vale Alimentação',
    VR = 'Vale Refeição'
}

//Daniel: interface para dados de Token
export interface TokenPayload {
    id: string,
		username: string,
    role: ROLE_USER
}