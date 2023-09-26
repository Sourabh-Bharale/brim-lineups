
import { db } from "@/lib/db"
import { lineups } from "@/lib/db/schema"
import { and, eq } from "drizzle-orm"
import { z } from "zod"

export async function GET(req: Request, res: Response) {
    try {

        const { searchParams } = new URL(req.url)
        const map = searchParams.get("map")!
        const site = searchParams.get("site")!

        const response = await db.select().
            from(lineups)
            .where(
                and(
                    eq(lineups.mapName, map),
                    eq(lineups.siteName, site)
                )
            )

        console.log(response)
        return new Response(JSON.stringify(response), { status: 200 })
    } catch (error) {
        if (error instanceof z.ZodError)
            return new Response(error.message, { status: 422 })

        return new Response('Could not create Lineups', { status: 500 })
    }
}