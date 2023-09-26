import { z } from 'zod'

export const LineUpDeletionValidator = z.object({
    id:z.number(),
})

export type DeletionRequest = z.infer<typeof LineUpDeletionValidator>
