let subs: number | string = '1M';

let apiReqStatus: "pending" | "success" | "error" = "pending";

apiReqStatus = "success";

let airlineSeat: "aisle" | "window" | "middle" = "middle";

airlineSeat = "window";

const orders = ['12', '34', '52', '76'];

let currentOrder: string | undefined;

for (let order of orders) {
    if (order === '52') {
        currentOrder = order;
    }
    currentOrder = "11" ;
}
console.log(currentOrder);