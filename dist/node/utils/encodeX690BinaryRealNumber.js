"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const dissectFloat_1 = tslib_1.__importDefault(require("./dissectFloat"));
const encodeUnsignedBigEndianInteger_1 = tslib_1.__importDefault(require("./encodeUnsignedBigEndianInteger"));
const encodeSignedBigEndianInteger_1 = tslib_1.__importDefault(require("./encodeSignedBigEndianInteger"));
const values_1 = require("../values");
const errors = tslib_1.__importStar(require("../errors"));
function encodeX690BinaryRealNumber(value) {
    if (value === 0.0) {
        return new Uint8Array(0);
    }
    else if (Number.isNaN(value)) {
        return new Uint8Array([values_1.ASN1SpecialRealValue.notANumber]);
    }
    else if (value === -0.0) {
        return new Uint8Array([values_1.ASN1SpecialRealValue.minusZero]);
    }
    else if (value === Infinity) {
        return new Uint8Array([values_1.ASN1SpecialRealValue.plusInfinity]);
    }
    else if (value === -Infinity) {
        return new Uint8Array([values_1.ASN1SpecialRealValue.minusInfinity]);
    }
    const floatComponents = dissectFloat_1.default(value);
    while (floatComponents.mantissa !== 0 && (floatComponents.mantissa % 2) === 0) {
        floatComponents.mantissa = floatComponents.mantissa >>> 1;
        floatComponents.exponent++;
    }
    if (floatComponents.exponent <= -1020) {
        throw new errors.ASN1OverflowError(`REAL number ${value} (having exponent ${floatComponents.exponent}) `
            + "is too precise to encode.");
    }
    const singleByteExponent = ((floatComponents.exponent <= 127)
        && (floatComponents.exponent >= -128));
    const firstByte = (128
        | (value >= 0 ? 0 : 64)
        | (singleByteExponent ? 0 : 1));
    const exponentBytes = encodeSignedBigEndianInteger_1.default(floatComponents.exponent);
    const mantissaBytes = encodeUnsignedBigEndianInteger_1.default(floatComponents.mantissa);
    const ret = new Uint8Array(1 + exponentBytes.length + mantissaBytes.length);
    ret[0] = firstByte;
    ret.set(exponentBytes, 1);
    ret.set(mantissaBytes, (1 + exponentBytes.length));
    return ret;
}
exports.default = encodeX690BinaryRealNumber;
//# sourceMappingURL=encodeX690BinaryRealNumber.js.map