-- Verify obole:view_one_deceased on pg

BEGIN;

SELECT * FROM deceased_infos WHERE false;

ROLLBACK;
