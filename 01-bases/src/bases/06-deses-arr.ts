

const character = ["goku", "vegeta", "trunks", "goten"];
const [g, v, t, g2] = character;
console.log( {g, v, t, g2} );
const returnArray = ()=> {
    return [123, "jair"] as const;
}
const [numbers, letters] = returnArray();
console.log(numbers * 2, letters.toLowerCase());

