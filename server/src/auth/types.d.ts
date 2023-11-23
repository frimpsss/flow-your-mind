export interface authRequestBody{
    username: string
    password: string
    token?: string
}

export interface loginResponse{
    username: string
    access_token: string
    refresh_token: string
}