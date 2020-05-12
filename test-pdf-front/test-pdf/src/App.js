import React,{useState,useEffect} from 'react';
import axios from 'axios';
import logo from './logo.svg';
import FileSaver, {saveAs} from 'file-saver';
import './App.css';
import jsPDF from 'jspdf'
import moment from 'moment';



function App() {
  const token="Xn1XLxeLEUSFWXVDhTVHgXIn3SePtdiFRKbf7BKChrhKQ11lrzpxESqL1wGFSV4i"
  const [embalmers,setEmbalmers]=useState(null)
  const [isLoading,setIsLoading]=useState(true)
  const [month,setMonth]=useState(null)
  const [deceased,setDeceased]=useState(null);
  const [conservations,setConservations]=useState(null);
  const getData=async()=>{
    const data=await axios.get('http://localhost:3003/embalmer/list',{headers:{authorization:'Bearer '+token}});
    const dataDeceased=await axios.get('http://localhost:3003/deceased/list',{headers:{authorization:'Bearer '+token}});
    setDeceased(dataDeceased.data);
    setEmbalmers(data.data);
    setIsLoading(false);
  }
  
  useEffect(()=>{
    getData();
    
   
  },[])

  const getActualMonth=(month)=>{
    switch(month){
      case '01':
      month='Janvier';
      break;
      case '02':
      month='Fevrier'
      break;
      case '03':
      month='Mars'
      break;
      case '04':
      month='Avril'
      break;
      case '05':
      month='Mai'
      break;
      case '06':
      month='Juin'
      break;
      case'07':
      month='Juillet'
      break;
      case '08':
      month='August'
      break;
      case '09':
      month='September'
      break;
      case '10':
      month='October'
      break;
      case '11':
      month='November'
      break;
      case '12':
      month='December'
      break;
      default:
      month='vieullez choisir un mois'


      
    }

    return month

  }

  const getPdf=(data,month)=>{
    
    let str=[];
    var doc = new jsPDF();
    let strHTML='<h2 style="margin-left:350px"> Etat De Situation </h2> <div style="display:flex;justify-content:space-between">  <div> <div style="margin-top:20px"> Nom Et Prenom:'+data[0].firstname+' '+data[0].lastname+' </div> <div style="margin-top:20px"> Adresse: '+data[0].address+' </div> <div style="margin-top:20px"> email: '+data[0].email+'</div> <div> </div> <div style="margin-top:20px"> Mois Et Anée: '+month+' ' +data[0].date.substring(0,4)+' </div></div> </div> <table style="border:1px solid-blue"> <th> date de soin </th> <th> Defunt </th> ';
    for(let i=0;i<data.length;i++){

      //strHTML+='<table><tr> <th> Date De Soin<tr> </th> <th> Nom du Thanatopracteuer </th> <th> Nom Du Defunt </th> <th> Date De Deces </th> </tr> <tr> <td> '+data[i].date+' </td> <td> '+data[i].embalmer_firstname+' </td> <td> '+data[i].deceased_firstname+' <td> '+data[i].deceased_date+' </td> </tr>  </table>'
      strHTML+='<tr> <td>'+data[i].date+' </td> <td>'+data[i].deceased_firstname+' '+data[i].deceased_lastname+'</td>  </tr>'
      
       
        
        
   
    }
    strHTML+='</table>'

    strHTML+='<div> Nombre Total De Soins: '+data.length;
    doc.fromHTML(strHTML,20,20);
    doc.save()

   
    
  } 

  const getPDFDeceased=(data)=>{
    if(!data.permit_date){
      const days=data.days.days;
      const date=moment().format();
      const doc=new jsPDF();
      const htmlString='<h2 style="margin-left:400px"> Etat de Situation </h2>'+
      '<h4 style="margin-left:500px"> Defunt </h4>'+
      '<div style="margin-top:100px"> </div>'+
      '<div style="margin-left:200px">'+
      '<div> Nom/Prenom: '+data.deceased_firstname+' '+data.deceased_lastname+'</div>'+
      '<div> Date de Naissance: '+data.deceased_bd+'</div>'+
      '<div> Date de deces: '+data.deceased_dd+'</div>'+
      '<div> Date de d\'entree' +data.entry_date+'</div>'+
      '<div> Date de sorite:'+data.exit_date+'</div>'+ 
      '<h4 style="margin-top:100px;margin-left:350px"> Personnes Prenant En Chanrges les Obesques </h4>'+
      '<div style="margin-top:100px"> </div>'+
      '<div> Nom/Prenom:' +data.firstname+' '+data.lastname+'</div>'+
      '<div> Adresse:' +data.address+'</div>'+
      '<div> Email:' +data.email+'</div>'+
      '<div> Telephone' +data.tel+'</div>'+
      '</div>'+

      '<div stlye="marin-top:100px"> </div>'+

      '<div> Nombre De Jours de frais de conservation: '+(days-1)+ '</div>'+
      '<div> Nombre de jours pris en charge par l\institut' +days+ '</div>'+

      '<div> Fait Le:' +date +'</div>'+

      '<div> Signature: </div>' 

      doc.fromHTML(htmlString);
      doc.save();

      
    }

    else{

    }
  }


  
 console.log(deceased);
  
  if(isLoading===false){
  return (

    <div className="App">
       <h1>Hello World</h1> 
      

       
       
       {embalmers.map(function(element){
        
         return (<form method="post" onSubmit={async(event)=>{
           event.preventDefault();
           
           
           const conservationsByMonth=await axios.post('http://localhost:3003/embalmer_summary/create/'+element.id,{month:month},{headers:{authorization:'Bearer '+token}}) 
            console.log(conservationsByMonth);

           

            getPdf(conservationsByMonth.data,month);
           

         }}> 
         <label> Choisir Le Mois Pour Le Thanato Practeur</label> 
       <label name="thanato"> {element.firstname+' '+element.lastname}</label>
          <select id={element.id} onChange={(event)=>{
            setMonth(event.target.value)
          }}>
            <option value="01"> 01</option>
            <option value="02"> 02</option>
            <option value="03"> 03</option>
            <option value="04"> 04</option>
            <option value="05"> 05</option>
            <option value="06"> 06</option>
            <option value="07"> 07</option>
            <option value="08"> 08</option>
            <option value="09"> 09</option>
            <option value="10"> 10</option>
            <option value="11"> 11</option>
            <option value="12"> 12</option>
            
          </select>
          <button type="submit"> Generer et Consulter le PDF </button>
         
         </form>)
       })}

       <div style={{marginTop:'20px'}}> </div>

       {deceased.map((element)=>{
         return <>
          <div style={{display:'flex'}}>
             <div> {element.firstname} {element.lastname} </div>
             <div style={{marginLeft:'20px'}}onClick={async()=>{
               const deceasedFamilyData=await axios.get('http://localhost:3003/deceased_ref_summary/'+element.id,{headers:{authorization:'Bearer '+token}})
               console.log(deceasedFamilyData.data)
               getPDFDeceased(deceasedFamilyData.data);
             }}> <a href="#"> Generation Etat De Situation </a> </div>
          </div>

         </>
       })}


      
      
    </div>
  
  );
  }

  else{
    return <div> Data Loading</div>
  }
}

export default App;
