"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getChai(kind) {
    if (typeof kind === 'string') {
        return `Making ${kind} chai...`;
    }
    return `Chai order: ${kind}`;
}
function serveChai(msg) {
    if (msg) {
        return `Serving ${msg}`;
    }
    return `Serving default masala chai`;
}
function orderchai(size) {
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
function serve(chai) {
    if (chai instanceof khulhadChai) {
        return chai.serve;
    }
    return chai.serve;
}
function isChaiOrder(obj) {
    return (typeof obj === 'object' &&
        obj != null &&
        typeof obj.type === 'string' &&
        typeof obj.sugar === 'number');
}
function serveOrder(item) {
    if (isChaiOrder(item)) {
        return `Serving ${item.type} chai with ${item.sugar}`;
    }
    return `Serving custom cahi ${item}`;
}
function makeChai(order) {
    switch (order.type) {
        case "masala":
            return `Masala chai`;
            break;
        case "ginger":
            return `Ginger chai`;
            break;
        case "elaichi":
            return `Elaichi chai`;
            break;
        default:
            break;
    }
}
function bew(order) {
    if ("spiceLevel" in order) {
        //
    }
}
// function stringArray(arr: unknown):arr is string[] {
// }
//# sourceMappingURL=typeNarrowing.js.map