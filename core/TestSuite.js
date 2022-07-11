import * as fs from "fs";
import * as path from "path";

export default class TestSuite {
    /**
     * @description will read the directory to load all tests of test suite
     *
     * @param string path
     */
    constructor(path) {
        this.path = path;
    }

    /**
     * @description will output list of path names for each file in directory or subdirectory
     *
     * @return {Generator<string|any, void, any>}
     */
    * tests() {
        const files = fs.readdirSync(this.path);
        for (const file of files) {
            const filePath = `${this.path}${path.sep}${file}`;
            const fileStats = fs.lstatSync(filePath)
            if (fileStats.isDirectory()) {
                for (const dirFile of this.scanDirectory(filePath)) {
                    yield dirFile;
                }
            }

            if (fileStats.isFile && file.match(/\.(test)\.(js)$/)) {
                yield filePath;
            }
        }
    }
}