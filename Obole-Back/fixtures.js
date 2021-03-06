const moment=require('moment');
const pg=require('pg');
const connectionString= "postgres://obole:obole@obole.c5dairitzweb.us-east-1.rds.amazonaws.com/obole";

const client = new pg.Client(connectionString);

client.connect();

const sqlFixtures = require('sql-fixtures');
const SHA256 = require('crypto-js/sha256');
const encBase64 = require('crypto-js/enc-base64');
const uid2 = require('uid2');

let token=uid2(64);
const password="password";
const salt=password.substring(0,3);
const hashedPassword= SHA256(password+ salt).toString(encBase64);
const loadFixtures=async()=>{
const dbConfig = {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: 'js4life',
      database: 'obole',
      port: 5432
    }
  };
  await client.query('TRUNCATE TABLE deceased CASCADE');
  await client.query('TRUNCATE TABLE "user"');
  await client.query('TRUNCATE TABLE embalmer CASCADE');
  const fixtures1={
    user:[{
        firstname:"admin",
        lastname:"admin",
        role:"admin",
        password:hashedPassword,
        email:'mofofb@gmail.com(s’ouvre dans un nouvel onglet)',
        token:token
      }],
      room:[],
      deceased_ref:[]
  }
  for(let i=0;i<10;i++){
    if(i==0){
        let roomName="first room";
        let capacity=30;
        fixtures1.room.push({name:roomName,capacity:capacity})
    }
       let deceasedRefFirstName="deceasedRefFirstName"+i;
       let deceasedRefLastName="deceasedReLastName"+i;
       let deceasedRefAdress="adress"+i;
       let deceasedRefZipCode="zip_code"+i;
       let deceasedRefCity="city"+i;
       let deceasedRefEmail="deceasedRef"+i+"@deceasedRef.com";
    fixtures1.deceased_ref.push({firstname:deceasedRefFirstName,lastname:deceasedRefLastName,address:deceasedRefAdress,zip_code:deceasedRefZipCode,city:deceasedRefCity,email:deceasedRefEmail});
    token=uid2(64)
    let userFirstname="userFirstName"+i;
    let userLastName="userLastName"+i;
    let userPassword=hashedPassword;
    let userEmail="user"+i+'@user.com(s’ouvre dans un nouvel onglet)';
    let userToken=token;
    let role="user"
    fixtures1.user.push({firstname:userFirstname,lastname:userLastName,password:userPassword,email:userEmail,token:userToken,role:role})
  }
  sqlFixtures.create(dbConfig,fixtures1).then(function(result){
      console.log('fixtures 1 loaded!')
      console.log(result);
  })
  const getRoom=await client.query('SELECT * FROM room');
  const getDeceasedRef=await client.query('SELECT * FROM deceased_ref');
  console.log(getRoom.rows[0]);
  console.log(getDeceasedRef.rows[0]);
  const fixtures2={
      embalmer:[],
      deceased:[],
  }
  for(let i=0;i<10;i++){
      let embalmerFirstName="embalmer"+i;
      let embalmerLastName="embalmer"+i;
      let embalmerAdress="adress"+i;
      let embalmerZipCode="zip_code"+i;
      let embalmerCity="city"+i;
      let embalmerEmail="embalmerEmail"+i+"@embalmer.com"
      fixtures2.embalmer.push({firstname:embalmerFirstName,lastname:embalmerLastName,address:embalmerAdress,zip_code:embalmerZipCode,city:embalmerCity,email:embalmerEmail})
      let deceasedFirstName="deceasedFirstName"+i;
      let deceasedLastName="deceasedLastName"+i;
      let deceasedBirthDate="2000-01-01";
      let deceasedEntryDate=new Date()
      let deceasedDate=new Date()
      let deceasedProvenance="provenance";
      fixtures2.deceased.push({firstname:deceasedFirstName,lastname:deceasedLastName,birth_date:deceasedBirthDate,deceased_date:deceasedDate,entry_date:deceasedEntryDate,provenance:deceasedProvenance,room_id:getRoom.rows[0].id,deceased_ref_id:getDeceasedRef.rows[i].id})
  }
  sqlFixtures.create(dbConfig,fixtures2).then(function(result){
      console.log('fixtures 2 loaded!')
      console.log(result);
  })
  const getEmbalmers=await client.query("SELECT * FROM embalmer")
  const getDeceased=await client.query("SELECT * FROM deceased")
  console.log(getEmbalmers.rows);
  console.log(getDeceased.rows);
  let fixtures3={
      conservation:[]
  }
  for(let i=0;i<10;i++){
    let conservationDate=new Date()
    fixtures3.conservation.push({date:conservationDate,deceased_id:getDeceased.rows[i].id,embalmer_id:getEmbalmers.rows[i].id})
  }
  sqlFixtures.create(dbConfig,fixtures3).then(function(result){
      console.log('fixtures3 loaded!')
      console.log(result);
  })
}

loadFixtures();




