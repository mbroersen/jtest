import * as assert from "assert";
import JustTests from "../core/JustTests.js";

export default () => {
    JustTests.addTest('Jtest has 1 tests', () => {
        assert.strictEqual(JustTests.numberOfTests, 1);
    });

    JustTests.addTest('Jtest has 2 tests', () => {
        assert.strictEqual(JustTests.numberOfTests, 2);
    });
}
