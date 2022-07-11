export default class Test {

    constructor(testFile) {
        this.testFile = testFile;
    }

    async register()
    {
        const test = await import(this.testFile)
        test.default();
    }
}