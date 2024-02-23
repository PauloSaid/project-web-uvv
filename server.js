import { build } from "./app.js";

const options = {   logger: true    };

const app = await build(options);
const port = 3000;


await app.listen({port: port});