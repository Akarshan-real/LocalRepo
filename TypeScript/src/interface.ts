interface Chai {
    flavour: string;
    price: number;
    milk?: boolean;
};

const masalaChai: Chai = {
    flavour: "masala",
    price: 30
};

interface Shop {
    readonly id: number;
    name: string;
};

const s: Shop = {
    id: 1,
    name: "ChaiCode Cafe"
};
// s.id = 2 ; not allowed

interface DiscountCalculator {
    (price: number): number;
};

const apply50: DiscountCalculator = (p) => p * 1 / 2;

interface TeaMachine {
    start(): void;
    stop(): void;
}

const machine: TeaMachine = {
    start() {
        console.log("Start");
    },
    stop() {
        console.log("Stop");
    }
}

interface ChaiRatings {
    [flavour: string]: number;
}

const ratings: ChaiRatings = {
    masala: 4.5,
    ginger: 4.5
}

interface User {
    name: string;
}

interface User {
    age: number;
}

const u: User = {
    name: "Akarshan",
    age: 18
}

interface A { a: string };
interface B { b: string };

interface C extends A, B { };