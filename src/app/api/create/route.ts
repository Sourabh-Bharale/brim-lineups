import { db } from "@/lib/db"
import { lineups } from "@/lib/db/schema"
import { LineupValidator } from "@/lib/validators/lineups"
import { z } from "zod"
export async function POST(req:Request,res:Response){
    try{
        const body = await req.json()
        const {images,mapName,siteName} = LineupValidator.parse(body)

        const response = await db.insert(lineups).values({
            createdAt: new Date(),
            images,
            mapName,
            siteName,
        })
        return new Response(JSON.stringify(response),{status:200})
    }catch(error){
        if(error instanceof z.ZodError)
            return new Response(error.message,{status:422})

    return new Response('Could not create Lineups', { status: 500 })
    }
}