const chaiFlavour: string[] = ["masala", "adrak"];
const chaiPrice: number[] = [10, 15, 20];

const rating: Array<number> = [4.5, 5.0];

type chai = {
    name: string,
    price : number
}

const menu: chai[] = [
    {name : "Masala" , price : 15},
    {name : "Adrak" , price : 10}
]

const cities : readonly string [] = ['Delhi','Jaipur','Kolkata'];

const table :number[][] = [
    [1,3,4],
    [3,5,1],
    [6,1,7],
]

let chaiTuple : [string,number];
chaiTuple = ["Masala",20];


let userinfo:[string,number,boolean?];
userinfo= ["Hi",1];
userinfo= ["Hi",1,true];

const location : readonly [number,number] = [2824.524,5325.3424];

const chaiItems : [name : string , price : number] = ["Masala",25];

enum CupSize {
    SMALL,
    MEDIUM,
    LARGE
}

const size = CupSize.MEDIUM;

enum status {
    PENDING = 100,
    SERVED, // 101
    CANCELLED // 102
}

enum chaiType {
    MASALA = "masala",
    GINGER = 'ginger'
}

function makeChai(type: chaiType) {
    console.log(`Making ${type}`);
}

makeChai(chaiType.GINGER)

enum RandomEnum {
    ID = 1,
    NAME = "chai"
}

const enum Sugars {
    LOW = 1,
    MEDIUM = 2,
    HIGH = 3
}

let t: [string,number] = ["chai",10];
t.push("yo");
