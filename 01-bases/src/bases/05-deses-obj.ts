interface hero{
    name: String;
    age: number;
    codeName: String;
    power?: String;
}
export const person: hero ={
    name: "jair",
    age: 45,
    codeName: "iroman",
    power: "money", 
}
//const fullPerson = person;
//console.log(fullPerson);

const {age, name, power = "no tiene"} = person;
console.log({age, name, power});



interface creatHeroArgs {
    name: String,
    age: number,
    codeName: String,
    power?: String,

}
const creatHero = ({name, age, codeName, power}:creatHeroArgs)=> ({
id: 12345,
name: name,
age: age,
codeName: codeName,
power: power ?? "no tiene",
})

console.log(creatHero(person ));