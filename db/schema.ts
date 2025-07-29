import { pgTable, varchar, serial } from 'drizzle-orm/pg-core';

export const likes = pgTable('like', {
  id: serial('id').primaryKey(),
  nama: varchar('nama', { length: 100 }).notNull(),
});
