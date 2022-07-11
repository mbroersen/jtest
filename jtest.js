#!/usr/bin/env node
import * as path from "path";
import JTest from "./core/JTest.js";
const myArgs = process.argv.slice(2);

if (myArgs.includes('--help')) {
    console.info('jtest.js');
    console.info('');
    console.info('usage : jtest.js');
    process.exit(0);
}

const testDirectory = path.join(process.cwd(), 'tests');
const jTest = new JTest(testDirectory);
jTest.register().then(() => {
    jTest.run();
});
