-- Verify obole:user_connected on pg

BEGIN;

SELECT user_connected FROM "user" WHERE false;

ROLLBACK;
