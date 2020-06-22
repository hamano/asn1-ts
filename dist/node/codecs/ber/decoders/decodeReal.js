"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors = tslib_1.__importStar(require("../../../errors"));
const values_1 = require("../../../values");
const convertBytesToText_1 = tslib_1.__importDefault(require("../../../utils/convertBytesToText"));
const decodeUnsignedBigEndianInteger_1 = tslib_1.__importDefault(require("../../../utils/decodeUnsignedBigEndianInteger"));
const decodeSignedBigEndianInteger_1 = tslib_1.__importDefault(require("../../../utils/decodeSignedBigEndianInteger"));
function decodeReal(value) {
    if (value.length === 0)
        return 0.0;
    switch (value[0] & 0b11000000) {
        case (0b01000000): {
            if (value[0] === values_1.ASN1SpecialRealValue.notANumber)
                return NaN;
            if (value[0] === values_1.ASN1SpecialRealValue.minusZero)
                return -0.0;
            if (value[0] === values_1.ASN1SpecialRealValue.plusInfinity)
                return Infinity;
            if (value[0] === values_1.ASN1SpecialRealValue.minusInfinity)
                return -Infinity;
            throw new errors.ASN1UndefinedError("Unrecognized special REAL value!");
        }
        case (0b00000000): {
            const realString = convertBytesToText_1.default(value.slice(1));
            switch (value[0] & 0b00111111) {
                case 1: {
                    if (!values_1.nr1Regex.test(realString))
                        throw new errors.ASN1Error("Malformed NR1 Base-10 REAL");
                    return Number.parseFloat(realString);
                }
                case 2: {
                    if (!values_1.nr2Regex.test(realString))
                        throw new errors.ASN1Error("Malformed NR2 Base-10 REAL");
                    return Number.parseFloat(realString.replace(",", "."));
                }
                case 3: {
                    if (!values_1.nr3Regex.test(realString))
                        throw new errors.ASN1Error("Malformed NR3 Base-10 REAL");
                    return Number.parseFloat(realString.replace(",", "."));
                }
                default:
                    throw new errors.ASN1UndefinedError("Undefined Base-10 REAL encoding.");
            }
        }
        case (0b10000000):
        case (0b11000000): {
            const sign = ((value[0] & 0b01000000) ? -1 : 1);
            const base = ((flag) => {
                switch (flag) {
                    case (values_1.ASN1RealEncodingBase.base2): return 2;
                    case (values_1.ASN1RealEncodingBase.base8): return 8;
                    case (values_1.ASN1RealEncodingBase.base16): return 16;
                    default:
                        throw new errors.ASN1Error("Impossible REAL encoding base encountered.");
                }
            })(value[0] & 0b00110000);
            const scale = ((flag) => {
                switch (flag) {
                    case (values_1.ASN1RealEncodingScale.scale0): return 0;
                    case (values_1.ASN1RealEncodingScale.scale1): return 1;
                    case (values_1.ASN1RealEncodingScale.scale2): return 2;
                    case (values_1.ASN1RealEncodingScale.scale3): return 3;
                    default:
                        throw new errors.ASN1Error("Impossible REAL encoding scale encountered.");
                }
            })(value[0] & 0b00001100);
            let exponent;
            let mantissa;
            switch (value[0] & 0b00000011) {
                case (0b00000000): {
                    if (value.length < 3)
                        throw new errors.ASN1TruncationError("Binary-encoded REAL truncated.");
                    exponent = decodeSignedBigEndianInteger_1.default(value.subarray(1, 2));
                    mantissa = decodeUnsignedBigEndianInteger_1.default(value.subarray(2));
                    break;
                }
                case (0b00000001): {
                    if (value.length < 4)
                        throw new errors.ASN1TruncationError("Binary-encoded REAL truncated.");
                    exponent = decodeSignedBigEndianInteger_1.default(value.subarray(1, 3));
                    mantissa = decodeUnsignedBigEndianInteger_1.default(value.subarray(3));
                    break;
                }
                case (0b00000010): {
                    if (value.length < 5)
                        throw new errors.ASN1TruncationError("Binary-encoded REAL truncated.");
                    exponent = decodeSignedBigEndianInteger_1.default(value.subarray(1, 4));
                    mantissa = decodeUnsignedBigEndianInteger_1.default(value.subarray(4));
                    break;
                }
                case (0b00000011): {
                    if (value.length < 3)
                        throw new errors.ASN1TruncationError("Binary-encoded REAL truncated.");
                    const exponentLength = value[1];
                    if (value.length < (3 + exponentLength)) {
                        throw new errors.ASN1TruncationError("Binary-encoded REAL truncated.");
                    }
                    exponent = decodeSignedBigEndianInteger_1.default(value.subarray(2, (2 + exponentLength)));
                    mantissa = decodeUnsignedBigEndianInteger_1.default(value.subarray((2 + exponentLength)));
                    break;
                }
                default:
                    throw new errors.ASN1Error("Impossible binary REAL exponent encoding encountered.");
            }
            return (sign * mantissa * Math.pow(2, scale) * Math.pow(base, exponent));
        }
        default:
            throw new errors.ASN1Error("Impossible REAL format encountered.");
    }
}
exports.default = decodeReal;
//# sourceMappingURL=decodeReal.js.map