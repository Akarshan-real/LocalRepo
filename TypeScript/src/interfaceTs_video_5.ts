type chaiOrder = {
    type: string;
    sugar: number;
    strong: boolean;
}

function makeChai(order: chaiOrder) {
    console.log(order);
}

function serveChai(order: chaiOrder) {
    console.log(order);
}

type teaRecipe = {
    water: number;
    milk: number;
}

// interface teaRecipe  {
//     water: number;
//     milk: number;
// }

// class masalaChai implements teaRecipe {
//     water = 100;
//     milk = 50;
// }

interface cupSize {
    size: "small" | "large";
}

class Chai implements cupSize {
    size: "small" | "large" = "large";
}

// type response = { ok: true } | { ok: false };
// class myRes implements response {
//     ok :boolean = true ;
// }

type teaType = "masala" | "ginger" | "green";

function orderChai(t: teaType) {
    console.log(t);
}

type baseChai = { teaLeaves: number };
type extraIndgredients = { masala: boolean };

type masalaChai = baseChai & extraIndgredients;

const cup:masalaChai = {
    teaLeaves : 2,
    masala: true
}

type user = {
    userName : string ,
    bio?: string
}

const user1:user = {userName: "Akarshan"};   
const user2:user = {userName: "Akarshan",bio : "Meow"};   

type Config = {
    readonly appName : string,
    version : number 
}

const cnf : Config = {
    appName : "Masterji",
    version: 1
}

// cnf.appName = "chaiCode" ;
