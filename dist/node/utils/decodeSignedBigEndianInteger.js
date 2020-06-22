"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors = tslib_1.__importStar(require("../errors"));
function decodeSignedBigEndianInteger(value) {
    if (value.length === 0) {
        return 0;
    }
    if (value.length > 4) {
        throw new errors.ASN1OverflowError("Number too long to decode.");
    }
    const u8 = new Uint8Array(4);
    if (value[0] >= 0b10000000) {
        u8.fill(0xFF);
    }
    u8.set(value, (4 - value.length));
    return new Int32Array(u8.reverse().buffer)[0];
}
exports.default = decodeSignedBigEndianInteger;
//# sourceMappingURL=decodeSignedBigEndianInteger.js.map