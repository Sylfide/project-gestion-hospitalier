-- Deploy obole:usertoken to pg
BEGIN;

ALTER TABLE "user" ADD COLUMN token text; 

COMMIT;
