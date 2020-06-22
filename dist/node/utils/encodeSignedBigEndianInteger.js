"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors = tslib_1.__importStar(require("../errors"));
const values_1 = require("../values");
function encodeBigEndianSignedInteger(value) {
    if (value < values_1.MIN_SINT_32) {
        throw new errors.ASN1OverflowError(`Number ${value} too small to be encoded as a big-endian signed integer.`);
    }
    if (value > values_1.MAX_SINT_32) {
        throw new errors.ASN1OverflowError(`Number ${value} too big to be encoded as a big-endian signed integer.`);
    }
    if (value <= 127 && value >= -128) {
        return new Uint8Array([
            (value & 255),
        ]);
    }
    else if (value <= 32767 && value >= -32768) {
        return new Uint8Array([
            ((value >> 8) & 255),
            (value & 255),
        ]);
    }
    else if (value <= 8388607 && value >= -8388608) {
        return new Uint8Array([
            ((value >> 16) & 255),
            ((value >> 8) & 255),
            (value & 255),
        ]);
    }
    else {
        return new Uint8Array([
            ((value >> 24) & 255),
            ((value >> 16) & 255),
            ((value >> 8) & 255),
            (value & 255),
        ]);
    }
}
exports.default = encodeBigEndianSignedInteger;
//# sourceMappingURL=encodeSignedBigEndianInteger.js.map