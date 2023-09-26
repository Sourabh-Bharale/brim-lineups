import { db } from "@/lib/db"
import { lineups } from "@/lib/db/schema"
import { LineUpDeletionValidator } from "@/lib/validators/delete"
import { eq } from "drizzle-orm"
import { z } from "zod"

export async function POST(req:Request,res:Response){
    try{
        const body = await req.json()
        const {id} = LineUpDeletionValidator.parse(body)

        const response = await db.delete(lineups).where(eq(lineups.id,id))
        return new Response(JSON.stringify(response),{status:200})

    }catch(error){
        if(error instanceof z.ZodError)
        return new Response(error.message,{status:422})

return new Response('Could not Delete Lineups', { status: 500 })
    }
}