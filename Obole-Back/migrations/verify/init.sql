-- Verify obole:init on pg

BEGIN;

SELECT * FROM room;

SELECT * FROM deceased;

ROLLBACK;
