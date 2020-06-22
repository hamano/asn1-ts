"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const base256Length_1 = tslib_1.__importDefault(require("./base256Length"));
const getBitFromBase128_1 = tslib_1.__importDefault(require("./getBitFromBase128"));
const setBitInBase256_1 = tslib_1.__importDefault(require("./setBitInBase256"));
function decodeBase128(value) {
    if (value.length === 1 && value[0] < 128) {
        return new Uint8Array([value[0]]);
    }
    const decodedBytes = new Uint8Array(base256Length_1.default(value.length));
    for (let byte = 0; byte < value.length; byte++) {
        for (let bit = 0; bit < 8; bit++) {
            const bitIndex = ((byte << 3) + bit);
            const bitValue = getBitFromBase128_1.default(value, bitIndex);
            if (bitValue) {
                setBitInBase256_1.default(decodedBytes, bitIndex, true);
            }
        }
    }
    return new Uint8Array(decodedBytes);
}
exports.default = decodeBase128;
//# sourceMappingURL=decodeBase128.js.map