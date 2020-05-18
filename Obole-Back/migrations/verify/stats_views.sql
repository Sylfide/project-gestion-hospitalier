-- Verify obole:stats_views on pg

BEGIN;

SELECT * FROM month_occupation WHERE false;
SELECT * FROM month_occupation_per_room WHERE false;
SELECT * FROM weekly_occupation WHERE false;
SELECT * FROM weekly_occupation_per_room WHERE false;

ROLLBACK;
