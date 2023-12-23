"use client"
export default function error({error}:{error: any}){
    return <h1>{error?.message}</h1>
}