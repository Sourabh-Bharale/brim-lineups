import { z } from 'zod'

export const LineupValidator = z.object({
    mapName:z.string().toLowerCase().trim(),
    siteName:z.string().toLowerCase().trim(),
    images:z.array(z.string())
})

export type LineupRequest = z.infer<typeof LineupValidator>
