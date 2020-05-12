-- Revert obole:user_connected from pg

BEGIN;

ALTER TABLE "user" DROP COLUMN user_connected;

COMMIT;
