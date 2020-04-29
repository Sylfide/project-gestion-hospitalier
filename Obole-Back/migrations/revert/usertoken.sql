-- Revert obole:usertoken from pg

BEGIN;

ALTER TABLE "user" DROP COLUMN token 

COMMIT;
