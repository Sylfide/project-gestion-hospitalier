const dataMapper = require('../dataMapper');
const moment=require('moment');
const htmlPDF=require('html-pdf');
const pdfTemplate=require('../documents/index.js');




const conservationController={

  

    embalmerMonthlySummary:async(req,res)=>{
     
        
        const monthlySummary=await dataMapper.embalmerMonthlySummary(req.params.embalmerId,req.body.month);
        res.json(monthlySummary);
        const embalmerFirstName=monthlySummary[0].embalmer_firstname;
        const currentYear=moment().format().substring(0,4);
        
        //const view=pdfTemplate(monthlySummary);
        //console.log(view);
        
        
         //res.json(monthlySummary);
         /*
         htmlPDF.create(pdfTemplate(monthlySummary),{}).toFile(embalmerFirstName+currentYear+req.body.month+'.pdf',(err,data)=>{
             if(err){
                 console.log('an error has been created')
                 res.send (Promise.reject());
             }
             console.log(data);
            res.send(Promise.resolve());
            
            
         });
         */
         
         
    },

    getMonthlySummary:async(req,res)=>{
        const monthlySummary=await dataMapper.embalmerMonthlySummary(req.params.embalmerId,req.params.month);
        console.log(monthlySummary);
        const embalmerFirstName=monthlySummary[0].embalmer_firstname;
        const currentYear=moment().format().substring(0,4);
         res.sendFile("/var/www/html/obole_new/project-gestion-hospitalier/Obole-Back/"+embalmerFirstName+currentYear+req.params.month+".pdf");
        
    },

    createDeceasedFamilyRecap:async(req,res)=>{
        
        const recapDeceasedRefInfo=await dataMapper.deceasedFamilySummary(req.params.deceasedId);
        //console.log(recapDeceasedRefInfo);
        res.json(recapDeceasedRefInfo);
    }
}

module.exports=conservationController;