-- Revert obole:room_occupation from pg

BEGIN;

ALTER TABLE room DROP COLUMN occupation;

COMMIT;
