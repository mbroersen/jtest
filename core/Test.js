export default class Test {
    /**
     * @description will load the tests of 1 file
     *
     * @param string testFile
     */
    constructor(testFile) {
        this.testFile = testFile;
    }

    /**
     * Will register all a test to JustTest
     * @returns {Promise<void>}
     */
    async register()
    {
        const test = await import(this.testFile)
        test.default();
    }
}