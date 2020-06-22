"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const base128Length_1 = tslib_1.__importDefault(require("./base128Length"));
const getBitFromBase256_1 = tslib_1.__importDefault(require("./getBitFromBase256"));
const setBitInBase128_1 = tslib_1.__importDefault(require("./setBitInBase128"));
function encodeBase128(value) {
    if (value.length === 1 && value[0] < 128) {
        return new Uint8Array([value[0]]);
    }
    const encodedBytes = new Uint8Array(base128Length_1.default(value.length));
    for (let byte = 0; byte < value.length; byte++) {
        for (let bit = 0; bit < 8; bit++) {
            const bitIndex = ((byte << 3) + bit);
            const bitValue = getBitFromBase256_1.default(value, bitIndex);
            if (bitValue) {
                setBitInBase128_1.default(encodedBytes, bitIndex, true);
            }
        }
    }
    for (let byte = 0; byte < (encodedBytes.length - 1); byte++) {
        encodedBytes[byte] |= 0x80;
    }
    return new Uint8Array(encodedBytes);
}
exports.default = encodeBase128;
//# sourceMappingURL=encodeBase128.js.map