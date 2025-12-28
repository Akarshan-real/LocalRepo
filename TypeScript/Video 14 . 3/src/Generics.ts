function wrapInArray<T>(item: T): T[] {
    return [item];
};

wrapInArray("hi");
wrapInArray(1);
wrapInArray({ flavour: "Masala" });

function pair<lol, lmao>(a: lol, b: lmao): [lol, lmao] {
    return [a, b];
}

pair("masala", "chai");
pair("masala", 20);
pair("chai", { flavour: "Ginger" });

interface Box<T> {
    content: T
}

const numberBoxStr: Box<string> = { content: "lOl" };
const numberBoxNum: Box<number> = { content: 10 };

interface ApiPromise<T> {
    status: number,
    data: T
}

const res: ApiPromise<{ flavour: string }> = {
    status: 200,
    data: { flavour: "masala" }
}