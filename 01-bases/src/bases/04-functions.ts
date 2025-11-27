/*function greetPerson(name : any ){
    return "hello " + name;
}
console.log(greetPerson("jair"));*/

/*const greetPerson = (name : string) => {
    return "hello " + name;

}*/

export const greetPerson = (name: string) => `hola, ${name}`;
export const getUser = (uid: string) => ({
    uid: uid,
    username: "jaircobos"   
    });

    const heroes =[
        {
            id: 1,
            name: "batman",
        },
        {
            id: 2,
            name: "superman",
            power: "super fuerza", 
        },
    ];

    const hero = heroes.find((h) => h.id === 1)
    console.log(hero?. name);



