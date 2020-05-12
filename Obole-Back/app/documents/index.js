const buildPDFDocuments=(data)=>{
    let htmlString;
   htmlString+=`<!doctype html> 
    <html>

        <head>
            <meta charset="utf-8">
            <style> 
                .red{
                    color:red
                },
                .orange{
                    color:orange
                }
            </style>
        </head>
        <body>
          ${data.map(function(element){
              return`<table> <tr><th> date de soin </th> <th> nom du thanato </th> <th> nom du defunt </th> <th> date de deces </th> </tr>
              
             <tr> <td> ${element.date} </td> <td>${element.embalmer_firstname+element.embalmer_lastname}</td> <td> ${element.deceased_firstname+element.deceased_lastname} <td> ${element.deceased_date} </td>  </tr> 
             </table>`
          })}
          
     </body>

    </html>`
    
    return htmlString;
  
}

module.exports=buildPDFDocuments;