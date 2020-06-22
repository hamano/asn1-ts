"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors = tslib_1.__importStar(require("../errors"));
const values_1 = require("../values");
function encodeUnsignedBigEndianInteger(value) {
    if (value < values_1.MIN_UINT_32) {
        throw new errors.ASN1OverflowError(`Number ${value} too small to be encoded as a big-endian unsigned integer.`);
    }
    if (value > values_1.MAX_UINT_32) {
        throw new errors.ASN1OverflowError(`Number ${value} too big to be encoded as a big-endian unsigned integer.`);
    }
    const bytes = (new Uint8Array((new Uint32Array([value]).buffer))).reverse();
    let startOfNonPadding = 0;
    for (let i = 0; i < bytes.length - 1; i++) {
        if (bytes[i] === 0x00) {
            startOfNonPadding++;
        }
        else {
            break;
        }
    }
    return bytes.slice(startOfNonPadding);
}
exports.default = encodeUnsignedBigEndianInteger;
//# sourceMappingURL=encodeUnsignedBigEndianInteger.js.map