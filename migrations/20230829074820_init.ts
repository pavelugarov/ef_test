import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`

    CREATE TYPE public.roles AS ENUM ('USER', 'ADMIN');

    CREATE TABLE IF NOT EXISTS public.users (
      id BIGSERIAL PRIMARY KEY,
      name TEXT,
      birthday DATE,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role roles NOT NULL DEFAULT 'USER',
      active BOOLEAN NOT NULL DEFAULT true,
      "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    INSERT INTO public.users (name, email, password, role) VALUES('admin', 'admin@mail.ru', '$2b$12$gXdlcQWD6nO15Jceek5NcumjI4bIO0nIjQOYpD.IRFcABqAiqnyau', 'ADMIN'); --for test

   
  `);
  
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(`
    
  `);
}

