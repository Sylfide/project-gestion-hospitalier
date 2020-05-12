-- Deploy obole:user_connected to pg

BEGIN;

ALTER TABLE "user" ADD COLUMN user_connected boolean DEFAULT false;

COMMIT;
