let response:any = "42";

let numericLength:number = (response as string).length;

type book = {
    name : string ,

}

let bookString = '{"name":"The Art Of Being Alone"}';
let bookObject = JSON.parse(bookString) as book; 

// console.log(bookObject);
// console.log(bookObject.name);


// const inputElement = document.getElementById("username") as HTMLInputElement

let value:any;

value = "chai";
value = [1,2,3];
value = 2.5;
// value.toUpperCase();
//----------------------------
let newValue:unknown;

newValue = "chai";
newValue = [1,2,3];
newValue = 2.5;
if (typeof newValue === 'string')  {
    console.log(newValue);
    newValue.toUpperCase();
}

try {
    
} catch (error) {
    if (error instanceof Error) {
        console.log(error.message);
    }    
    console.log(error);
}


const data:unknown = "chai aur code";
// const strData : string = String(data);
const strData : string = data as string;

type Role = "admin" | "user" | "moderator";

function redirectBasedOnRole(role:Role):void {
    if (role === "admin") {
        console.log("Redirecting to admin dashboard");
        return;
    }
    if (role === 'user'){
        console.log("Redirecting to user dashboard");
        return;
    }    
    role;
}

function neverReturn():never {
    while (true) {
        setTimeout(() => {
            console.log("Hey");
        }, 1000);
    }
}