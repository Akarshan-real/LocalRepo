const chai = {
    name: "Masala Chai",
    price: 20,
    isHot: true
}

let tea: {
    name: string;
    price: number;
    isHot: boolean;
}

tea = {
    name: "Ginger Tea",
    price: 50,
    isHot: true
}

type Tea = {
    name: string;
    price: number;
    ingredients: string[];
}

const adrakWaliChai: Tea = {
    name: "Adrak Chai",
    price: 25,
    ingredients: ["adrak", "milk", "sugar"]
}

type cup = {
    size: string
}
let smallCup: cup = { size: "200ml" };

let bigCup = { size: "500ml", material: "Steel" }

smallCup = bigCup;

type Brew = { brewTime: number }
const coffee = { brewTime: 5, beans: "Arabica" }
const chaiBrew: Brew = coffee;

type User = {
    userName: string,
    password: string
}

const u: User = {
    userName: "ChaiCode",
    password: "123"
}

type Item = {
    name: string,
    quantity: number
}
type Address = {
    street: string,
    pin: number
}

type Order = {
    id: string;
    items: Item[];
    address: Address;
}

type chai = {
    name: string;
    price: number;
    isHot: boolean;
}

const updateChai = (updates: Partial<chai>) => {
    console.log("Updating chai with ", updates);
};

updateChai({ price: 25 })
updateChai({ isHot: false })
updateChai({});

type chaiOrder = {
    name?: string;
    quanity?: number;
}

const placeOrder = (order: Required<chaiOrder>) => {
    console.log(order);
}

placeOrder({
    name: "Milk Chai",
    quanity: 250
});

type Chai = {
    name: string;
    price: number;
    isHot: boolean;
    ingredients: string[];
}

type BasicChaiInfo = Pick<Chai, "name" | "price">


const chaiInfo:BasicChaiInfo = {
    name : "Masala Chai",
    price : 250
} 

type ChaiNew = {
    name: string;
    price: number;
    isHot: boolean;
    secretIngredients: string;
};

type publicChai = Omit<ChaiNew , "secretIngredients">

