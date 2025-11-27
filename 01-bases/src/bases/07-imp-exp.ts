import heroes, {type owner} from "../data/heroes";
console.log(heroes);

export const getHeroByd = (id: number)=> {
    return heroes.find(hero => hero.id === id);
}
export const getHeroByowner = (owner: owner )=> {
    return heroes.filter( hero => hero.owner === owner);

}
console.log(getHeroByowner("DC"));