import axios  from "axios";

export const _ = axios.create({
    baseURL: process.env.NEXT_PUBLIC_api_base_url as string, 
    withCredentials: true, 
})


_.interceptors.request.use()


