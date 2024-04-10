import {
    make_singleton,
    make_pool,
    make_factory,
} from "./patterns";
import { createInterface } from "readline";

const _q_int    = createInterface(process.stdin, process.stdout);
const question = (q: string)=> new Promise<string>(resolve => _q_int.question(q, resolve));


async function get_singleton() {
    const name = await question("Enter class name: ");
    return make_singleton(name);
}
async function get_pool() {
    const name   = await question("Enter pool class name: ");
    const object = await question("Enter object class name: ");
    return make_pool(name, object);
}
async function get_factory() {
    const name   = await question("Enter factory class name: ");
    const object = await question("Enter object class name: ");
    return make_factory(name, object);
}

async function main() {
    const type = await question("Enter type:\n1 - singleton\n2 - pool\n3 - factory\n>> ");
    switch (type) {
        case "1":
            console.log(await get_singleton());
            break;
        case "2":
            console.log(await get_pool());
            break;
        case "3":
            console.log(await get_factory());
            break;
        default:
            console.log("Invalid type");
    }
}
main().catch(e => console.error(e.message)).then(() => _q_int.close());