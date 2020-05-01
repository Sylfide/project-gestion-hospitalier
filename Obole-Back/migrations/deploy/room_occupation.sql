-- Deploy obole:room_occupation to pg

BEGIN;

ALTER TABLE room ADD COLUMN occupation int;

COMMIT;
