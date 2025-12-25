"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let response = "42";
let numericLength = response.length;
let bookString = '{"name":"The Art Of Being Alone"}';
let bookObject = JSON.parse(bookString);
// console.log(bookObject);
// console.log(bookObject.name);
// const inputElement = document.getElementById("username") as HTMLInputElement
let value;
value = "chai";
value = [1, 2, 3];
value = 2.5;
// value.toUpperCase();
//----------------------------
let newValue;
newValue = "chai";
newValue = [1, 2, 3];
newValue = 2.5;
if (typeof newValue === 'string') {
    console.log(newValue);
    newValue.toUpperCase();
}
try {
}
catch (error) {
    if (error instanceof Error) {
        console.log(error.message);
    }
    console.log(error);
}
const data = "chai aur code";
// const strData : string = String(data);
const strData = data;
function redirectBasedOnRole(role) {
    if (role === "admin") {
        console.log("Redirecting to admin dashboard");
        return;
    }
    if (role === 'user') {
        console.log("Redirecting to user dashboard");
        return;
    }
    role;
}
function neverReturn() {
    while (true) {
        setTimeout(() => {
            console.log("Hey");
        }, 1000);
    }
}
//# sourceMappingURL=moreTypes.js.map