function getChai(kind: string | number) {
    if (typeof kind === 'string') {
        return `Making ${kind} chai...`
    }
    return `Chai order: ${kind}`;
}

function serveChai(msg?:string) {
    if (msg) {
        return `Serving ${msg}`;
    }  
    return `Serving default masala chai`;
}

function orderchai(size: "small" | "medium" | "large" | number) {
    if (size === 'small') {
        return `Making small chai`;
    }
    if (size === 'medium' || size === 'large') {
        return `Making extra chai`;
    }
    return `Chai order number ${size}`;
}

class khulhadChai {
    serve() {
        return `Serving khulhad chai`;
    }
}

class cuttingChai {
    serve() {
        return `Serving cutting chai`;
    }
}

function serve(chai: khulhadChai | cuttingChai) {
    if (chai instanceof khulhadChai) {
        return chai.serve;
    }
    return chai.serve;
}

type chaiOrder = {
    type : string;
    sugar : number;
}

function isChaiOrder(obj:any):obj is chaiOrder {
    return(
        typeof obj  === 'object' &&
        obj != null &&
        typeof obj.type === 'string' &&
        typeof obj.sugar === 'number' 
    )
}

function serveOrder(item:chaiOrder | string) {
    if (isChaiOrder(item)) {
        return `Serving ${item.type} chai with ${item.sugar}`;
    }
    return `Serving custom cahi ${item}`;
}

type masalaChai = {
    type : "masala";
    spiceLevel : number;
}
type gingerChai = {
    type : "ginger";
    amount : number;
}
type elaichiChai = {
    type : "elaichi";
    aroma : number;
}

type chai = masalaChai | gingerChai | elaichiChai ;

function makeChai(order:chai) {
    switch (order.type) {
        case "masala":
            return `Masala chai`;
            break;
        case "ginger":
            return `Ginger chai`;
            break;
        case "elaichi":
            return `Elaichi chai`
            break;
        default:
            break;
    }
    
}

function bew(order:masalaChai | gingerChai) {
    if ("spiceLevel" in order) {
        //
    }  
}

// function stringArray(arr: unknown):arr is string[] {
    
// }