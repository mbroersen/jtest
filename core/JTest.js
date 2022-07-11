import TestSuite from './TestSuite.js';
import Test from './Test.js';
import * as assert from "assert";

export default class JTest {

    constructor(testDirectory) {
        this.tests = new Map();
        this.failedTests = new Map();
        this.successFullTests = new Set();
        this.testDirectory = testDirectory;
        this.assertTracker = new assert.CallTracker();
        globalThis.JTest = this;
    }

    static addTest(name, callable)
    {
        globalThis.JTest.addTest(name, callable);
    }

    static get numberOfTests()
    {
        return globalThis.JTest.tests.size;
    }

    addTest(name, callable) {
        this.tests.set(name, callable);
    }

    async register() {
        const testSuite = new TestSuite(this.testDirectory);

        for (const test of testSuite.tests()) {
            await new Test(test).register();
        }
    }

    error(name, error) {
        this.failedTests.set(name, error);
        process.stderr.write('\x1b[41m');
        process.stderr.write('F');
    }

    success(name) {
        this.successFullTests.add(name);
        process.stdout.write('\x1b[42m');
        process.stdout.write('.');
    }

    run() {
        process.stdout.write('🪳 Starting testsuite\n');

        for (const [name, test] of this.tests) {
           try {
                test();
                this.success(name);
            } catch (error) {
                this.error(name, error);
            }
        }

        this.info();

        if (this.failedTests.size > 0) {
            for (const [name, test] of this.failedTests) {
                process.stderr.write(`Failed test: ${name}\n`);
                process.stderr.write(test.toString());
            }
            process.exit(1);
        }

    }

    info() {
        process.stderr.write('\n');
        process.stderr.write(`💼 tests: ${this.tests.size}\n`);
        process.stderr.write(`⏱  time: ${process.uptime()}ms\n`);
        process.stderr.write(`💻 mem: ${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(1)}mb\n`);
        process.stderr.write('\x1b[0m\n');

        console.log(this.assertTracker.verify());
    }

}