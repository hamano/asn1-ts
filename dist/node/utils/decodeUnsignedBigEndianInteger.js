"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors = tslib_1.__importStar(require("../errors"));
function decodeUnsignedBigEndianInteger(value) {
    if (value.length === 0) {
        return 0;
    }
    if (value.length > 4) {
        throw new errors.ASN1OverflowError(`Number on ${value.length} bytes is too long to decode.`);
    }
    const u8 = new Uint8Array(4);
    u8.set(value, (4 - value.length));
    return new Uint32Array(u8.reverse().buffer)[0];
}
exports.default = decodeUnsignedBigEndianInteger;
//# sourceMappingURL=decodeUnsignedBigEndianInteger.js.map