#!/usr/bin/env node
import * as path from "path";
import JustTest from "./core/JustTests.js";
const myArgs = process.argv.slice(2);

if (myArgs.includes('--help')) {
    console.info('JustTests');
    console.info('');
    console.info('usage : ./justtests');
    process.exit(0);
}

const testDirectory = path.join(process.cwd(), 'tests');
const justTests = new JustTest(testDirectory);
justTests.register().then(() => {
    justTests.run();
});
