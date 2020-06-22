"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const der_1 = tslib_1.__importDefault(require("../../der"));
function decodeSequence(value) {
    if (value.length === 0) {
        return [];
    }
    const encodedElements = [];
    let i = 0;
    while (i < value.length) {
        const next = new der_1.default();
        i += next.fromBytes(value.slice(i));
        encodedElements.push(next);
    }
    return encodedElements;
}
exports.default = decodeSequence;
//# sourceMappingURL=decodeSequence.js.map