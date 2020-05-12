-- Revert obole:view_one_deceased from pg

BEGIN;

DROP VIEW deceased_infos;

COMMIT;
