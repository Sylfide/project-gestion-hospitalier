-- Deploy obole:init to pg

BEGIN;

CREATE TABLE "user" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    firstname text NOT NULL,
    lastname text NOT NULL,
    "role" text NOT NULL,
    email text NOT NULL,
    "password" text NOT NULL
);

CREATE TABLE room (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" text NOT NULL UNIQUE,
    capacity int NOT NULL
);

CREATE TABLE deceased_ref (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    firstname text NOT NULL,
    lastname text NOT NULL,
    "address" text NOT NULL,
    zip_code text NOT NULL,
    city text NOT NULL,
    email text,
    tel text
);

CREATE TABLE embalmer (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    firstname text NOT NULL,
    lastname text NOT NULL,
    "address" text NOT NULL,
    zip_code text NOT NULL,
    city text NOT NULL,
    email text NOT NULL,
    tel text
);

CREATE TABLE deceased (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    firstname text NOT NULL,
    lastname text NOT NULL,
    birth_date date NOT NULL,
    deceased_date date NOT NULL,
    entry_date timestamptz NOT NULL,
    burial_permit_date date,
    provenance text,
    exit_date timestamptz,
    ritual boolean,
    room_id int REFERENCES room(id) NOT NULL,
    deceased_ref_id int REFERENCES deceased_ref(id)
);

CREATE TABLE conservation (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "date" date NOT NULL,
    deceased_id int REFERENCES deceased(id) NOT NULL,
    embalmer_id int REFERENCES embalmer(id) NOT NULL
);

COMMIT;
