-- Revert obole:init from pg

BEGIN;

DROP TABLE conservation;
DROP TABLE deceased;
DROP TABLE embalmer;
DROP TABLE deceased_ref;
DROP TABLE room;
DROP TABLE "user";

COMMIT;
