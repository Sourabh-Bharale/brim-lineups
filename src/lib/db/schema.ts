import {pgTable,serial,text, timestamp, varchar} from 'drizzle-orm/pg-core'

export const lineups = pgTable('lineups',{
    id:serial('id').primaryKey(),
    mapName:varchar('map_name').notNull(),
    siteName:varchar('site_name').notNull(),
    createdAt:timestamp('created_at').notNull(),
    images:text('images').array().notNull()
})

export type DrizzleLineups = typeof lineups.$inferSelect
