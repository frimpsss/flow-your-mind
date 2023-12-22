"use server"
import  Message from "@/components/messages/Message";
import { _ } from "@/utils"
import axios from "axios";

const Page = async ({params}: {params: {id: string}}) => {
 try {
  // await _.get(`/message/${params.id}`)
  const res = await axios.get('https://rickandmortyapi.com/api/character')

  console.log(res.data?.results?.map((e: any) => (e?.origin)));
  

  return <Message message="Wow" time="wow"/>
 } catch (error: any) {
  console.log(error);
  
  return <p>{error?.message}</p>
 }

}

export default Page