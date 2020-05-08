-- Deploy obole:view_one_deceased to pg

BEGIN;

CREATE VIEW deceased_infos AS
	SELECT deceased.*, 
		conservation.id AS conservation_id,
		conservation.date AS conservation_date,
		conservation.embalmer_id,
		embalmer.lastname AS embalmer_lastname,
		embalmer.firstname AS embalmer_firstname,
		deceased_ref.firstname AS deceased_ref_firstname,
		deceased_ref.lastname AS deceased_ref_lastname,
		deceased_ref.address AS deceased_ref_address,
		deceased_ref.zip_code AS deceased_ref_zip_code,
		deceased_ref.city AS deceased_ref_city,
		deceased_ref.email AS deceased_ref_email,
		deceased_ref.tel AS deceased_ref_tel
	FROM deceased
	LEFT JOIN conservation 
	ON deceased.id = conservation.deceased_id
	LEFT JOIN deceased_ref
	ON deceased.deceased_ref_id = deceased_ref.id
	LEFT JOIN embalmer
	ON conservation.embalmer_id = embalmer.id;

COMMIT;
