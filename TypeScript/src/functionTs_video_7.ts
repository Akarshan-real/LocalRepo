function makeChai(type: string, cups: number) {
    console.log(`Making ${cups} ${type} chai`);
}

makeChai("Masala", 25);

function getChaiPrice(): number {
    return 69;
}

function makeOrder(order: string) {
    if (!order) {
        return null;
    }
    return order;
}

function logChai():void {
    console.log("Chai is ready");
}

// function orderChai(type?: string ) {
    
// }

function orderChai(type: string = 'Masala') {
    
}

function createChai(order:{type : string , sugar : number , size : "small" | "large"}) : number{
    return 67 ;
}