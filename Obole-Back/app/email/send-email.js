

  const domain=process.env.DOMAIN;
  const apiKey=process.env.PRIVATE_MG_KEY;
// const mailgun=require('mailgun-js')({apiKey:apiKey,domain:domain});

const sendRoomCapacityAlert=(adminList,roomName)=>{
    console.log(domain);
    console.log(apiKey);
    //console.log('hello world');
    for(let i=0;i<adminList.length;i++){
        console.log('hello world');
        console.log('admin email=====>'+adminList[i].email);
        const data={
            from: "Mailgun Sandbox <postmaster@" + domain + ">",
            subject:'room capacity reached',
            to:adminList[i].email,
            text:'la chambre'+' '+roomName+' '+'vient d\'attiendre son sieul de capacité'
        }
    
        mailgun.messages().send(data,(error,body)=>{ 
            console.log(error);
            console.log('email sent or not');
            console.log(">> Email success/sent", body);
        })
    }
  
  
}

module.exports=sendRoomCapacityAlert;






