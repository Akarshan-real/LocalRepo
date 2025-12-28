// class Chai {
//     flavour:string ;
//     price:number; 

//     // constructor(flavour:string,price:number) {
//     //     this.flavour = flavour;
//     //     this.price = price;
//     // }
//     constructor(flavour:string) {
//         this.flavour = flavour;
//         console.log(this);
//     }
// }

// const masalaChai = new Chai("Ginger");  
// masalaChai.flavour = "masala";


class Chai {
    public flavour : string = "Masala";

    private secretIngredients = "Sugar";

    reveal() {
        return this.secretIngredients; // ok
    }

}

class Shop {
    protected shopName = "Chai Corner";
}

class Branch extends Shop {
    getName() {
        return this.shopName; // ok
    }
}

class Wallet {
    #balance = 100; // same as private
}

const w = new Wallet();

class Cup {
    readonly capacity : number = 250;

    constructor(capacity:number) {
        this.capacity = capacity;
    }
}

class ModernChai {
    private _sugar = 2 ;

    get sugar() {
        return this._sugar;
    }

    
    set sugar(value:number) {
        if (value > 5) {
            throw new Error("Too Sweat");
        }
        else {
            this._sugar = value;
        }
    }
}


const mc = new ModernChai();
mc.sugar = 3 ;

class EkChai {
    static shopName = "ChaiCode Cafe" ;
    constructor(public flavour:string) {

    }
}

console.log(EkChai.shopName);

abstract class Drink {
    abstract make(): void
}

class MyChai extends Drink {
    make(){
        console.log("Brewing Chai");
    }
}

class Heater {
    heat(){}
}

class ChaiMaker {
    constructor(private heater:Heater){

    }

    make(){
        this.heater.heat
    }
}