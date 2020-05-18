-- Revert obole:stats_views from pg

BEGIN;

DROP VIEW month_occupation;
DROP VIEW month_occupation_per_room;
DROP VIEW weekly_occupation;
DROP VIEW weekly_occupation_per_room;

COMMIT;
