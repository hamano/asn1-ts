"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const concatenateBytes_1 = tslib_1.__importDefault(require("../../../utils/concatenateBytes"));
const encodeUnsignedBigEndianInteger_1 = tslib_1.__importDefault(require("../../../utils/encodeUnsignedBigEndianInteger"));
const encodeBase128_1 = tslib_1.__importDefault(require("../../../utils/encodeBase128"));
function encodeObjectIdentifier(value) {
    const numbers = value.nodes;
    const pre = new Uint8Array([((numbers[0] * 40) + numbers[1])]);
    const post = numbers
        .slice(2)
        .map(encodeUnsignedBigEndianInteger_1.default)
        .map(encodeBase128_1.default)
        .map((arc) => ((arc[0] === 0x80) ? arc.slice(1) : arc));
    return concatenateBytes_1.default([pre].concat(post));
}
exports.default = encodeObjectIdentifier;
//# sourceMappingURL=encodeObjectIdentifier.js.map