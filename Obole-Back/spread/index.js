const name=['Chris','Laura','Vincnent','Reuben'];
const names=[...name].join(',')
//console.log(names);

const object={person1:"Laura",person2:"Reuben",person3:"Chris"}
//console.log(object);

const emptyObj={};

const objectEntries=Object.entries(object);
for(let [keyInfo,keyValue] of objectEntries){
    emptyObj[keyInfo]=keyValue
   
}

//console.log(objectEntries);
console.log(emptyObj);
