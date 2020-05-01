-- Verify obole:room_occupation on pg

BEGIN;

SELECT occupation FROM room;

ROLLBACK;
