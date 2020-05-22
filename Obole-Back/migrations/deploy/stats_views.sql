-- Deploy obole:stats_views to pg

BEGIN;

-- affiche le total de l'occupation sur chaque mois -- OK
CREATE VIEW month_occupation AS
WITH month_on_year AS (
	SELECT * FROM generate_series(date_trunc('year', current_date), date_trunc('year', (current_date + '1 year'::interval)), '1 month') month_on_year
)
SELECT month_on_year.month_on_year,
	COUNT(deceased.*) AS occupation
FROM deceased
RIGHT JOIN month_on_year 
ON date_trunc('month', month_on_year.month_on_year) BETWEEN date_trunc('month', deceased.entry_date) AND date_trunc('month', COALESCE(deceased.exit_date, now()))
GROUP BY month_on_year.month_on_year
ORDER BY month_on_year.month_on_year;

-- la même chose que précédemment mais avec le détail par chambre -- OK
CREATE VIEW month_occupation_per_room AS
WITH month_on_year AS (
	SELECT * FROM generate_series(date_trunc('year', current_date), date_trunc('year', (current_date + '1 year'::interval)), '1 month') month_on_year
)
SELECT month_on_year.month_on_year,
	room.name AS room_name,
	COUNT(deceased.*) AS occupation_per_room
FROM deceased
JOIN room ON deceased.room_id = room.id
RIGHT JOIN month_on_year 
ON date_trunc('month', month_on_year.month_on_year) BETWEEN date_trunc('month', deceased.entry_date) AND date_trunc('month', COALESCE(deceased.exit_date, now()))
GROUP BY month_on_year.month_on_year, room.name
ORDER BY month_on_year.month_on_year;

-- le total d'occupation sur chaque semaine de l'année -- OK
CREATE VIEW weekly_occupation AS
WITH weeks_on_year AS (
	SELECT * FROM generate_series(date_trunc('year', current_date), date_trunc('year', (current_date + '1 year'::interval)), '1 week') week_on_year
)
SELECT weeks_on_year.week_on_year,
	COUNT(deceased.*) AS occupation
FROM deceased
RIGHT JOIN weeks_on_year 
ON date_trunc('week', weeks_on_year.week_on_year) BETWEEN date_trunc('week', deceased.entry_date) AND date_trunc('week', COALESCE(deceased.exit_date, now()))
GROUP BY weeks_on_year.week_on_year
ORDER BY weeks_on_year.week_on_year;

-- la même chose par chambre -- OK
CREATE VIEW weekly_occupation_per_room AS
WITH weeks_on_year AS (
	SELECT * FROM generate_series(date_trunc('year', current_date), date_trunc('year', (current_date + '1 year'::interval)), '1 week') week_on_year
)
SELECT weeks_on_year.week_on_year,
	room.name AS room_name,
	COUNT(deceased.*) AS occupation
FROM deceased
JOIN room ON deceased.room_id = room.id
RIGHT JOIN weeks_on_year 
ON date_trunc('week', weeks_on_year.week_on_year) BETWEEN date_trunc('week', deceased.entry_date) AND date_trunc('week', COALESCE(deceased.exit_date, now()))
GROUP BY weeks_on_year.week_on_year, room.name
ORDER BY weeks_on_year.week_on_year;

COMMIT;
