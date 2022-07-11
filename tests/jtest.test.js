import * as assert from "assert";
import JTest from "../core/JTest.js";

export default () => {
    JTest.addTest('Jtest has 1 tests', () => {
        assert.strictEqual(JTest.numberOfTests, 1);
    });

    JTest.addTest('Jtest has 2 tests', () => {
        assert.strictEqual(JTest.numberOfTests, 2);
    });
}
