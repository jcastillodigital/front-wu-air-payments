export interface AuthResponse {
    access_token?:string,
    token_type?:string,
    url_decrypted?:string, 
    error?:string, 
    error_description?:string, 
    metadata?: MetaData
}

export interface MetaData {
    agencia:string,
    usuario: string, 
    caja: string, 
    param2:string,
}