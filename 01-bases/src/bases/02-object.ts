
 export const person = {
    lastname: "cobos",
    age : 45,
    address :{
        city: "new york",
        zip: 12345,
        lat: 14.3232,
        lng: 34.92342
        
    }

} //as const;


const person2 = person;
person2.lastname ="isaac";

console.log({person});
console.log({person2});

