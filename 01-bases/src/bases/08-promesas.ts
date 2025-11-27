import  type { hero} from "../data/heroes";
import { getHeroByd } from "../bases/07-imp-exp"

/*console.log("inicio");

new Promise((resolve, reject) =>{
    //console.log("cuerpo de la promesa");
    setTimeout(() => {
        //resolve("mi amigo cumplio")
        

        reject("mi amigo no cumplio")
        



    }, 1000);




}   ).then((mensaje)=> console.log(mensaje))
.catch(errorMensaje => console.log(errorMensaje))
.finally(() => console.log("fin de la promesa"));


console.log("final");*/

const getHeroByIdAsync = (id: number): Promise< hero> => {
    return new Promise ((resolve, reject) =>{

        setTimeout(()=>{
            const hero = getHeroByd(id);
            hero ? resolve(hero) : reject(`heroe no encontrado #${id}`);

        if( hero ){
            resolve(hero);
            return;
        } 
        

        }
        , 1500);
    })
}
getHeroByIdAsync(100)
.then(hero => console.log('el nombre es ', hero.name))
.catch( message => alert (message));