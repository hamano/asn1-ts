"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors = tslib_1.__importStar(require("../../../errors"));
const decodeSignedBigEndianInteger_1 = tslib_1.__importDefault(require("../../../utils/decodeSignedBigEndianInteger"));
function decodeInteger(value) {
    if (value.length === 0) {
        throw new errors.ASN1SizeError("INTEGER encoded on zero bytes!");
    }
    if (value.length > 4) {
        throw new errors.ASN1OverflowError("INTEGER too long to decode.");
    }
    if (value.length > 2
        && ((value[0] === 0xFF && value[1] >= 0b10000000)
            || (value[0] === 0x00 && value[1] < 0b10000000))) {
        throw new errors.ASN1PaddingError("Unnecessary padding bytes on INTEGER or ENUMERATED.");
    }
    return decodeSignedBigEndianInteger_1.default(value.subarray(0));
}
exports.default = decodeInteger;
//# sourceMappingURL=decodeInteger.js.map