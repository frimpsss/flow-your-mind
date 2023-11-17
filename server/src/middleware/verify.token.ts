import { Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { HttpStatusCode } from "../utils";
import { IRequest } from "../utils/globalTypes";
export async function verifyToken(req:IRequest, res:Response, next: NextFunction) {
    try {
        const token = req.headers?.['authorization']?.split(' ')[1] 
        if(!token){
            return res.status(HttpStatusCode.Forbidden).send({
                status: false, 
                message: "no auth header"
            })
        }

        const decodedPayload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as {userId: string}
        req.userId = decodedPayload.userId
        next()
    } catch (error: any) {
        return res.send(new Buffer('wmt',))
    }
}

