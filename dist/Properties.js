"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// https://rxapis.com/
class Properties {
    constructor() {
        this.isLocal = true;
    }
    getState() { return this.isLocal; }
}
exports.default = new Properties();
