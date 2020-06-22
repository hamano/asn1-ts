"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const splitBytesByContinuationBit_1 = tslib_1.__importDefault(require("../../../utils/splitBytesByContinuationBit"));
const errors = tslib_1.__importStar(require("../../../errors"));
const utils_1 = require("../../../utils");
function decodeRelativeObjectIdentifier(value) {
    if (value.length === 0) {
        return [];
    }
    if (value.length > 1 && value[value.length - 1] & 0b10000000) {
        throw new errors.ASN1TruncationError("Relative OID was truncated.");
    }
    return Array
        .from(splitBytesByContinuationBit_1.default(value))
        .map((b) => {
        if (b.length > 1 && b[0] === 0x80) {
            throw new errors.ASN1PaddingError("Prohibited padding on RELATIVE-OID node.");
        }
        return b;
    })
        .map(utils_1.decodeBase128)
        .map((b) => ((b[0] === 0) ? b.slice(1) : b))
        .map(utils_1.decodeUnsignedBigEndianInteger);
}
exports.default = decodeRelativeObjectIdentifier;
//# sourceMappingURL=decodeRelativeObjectIdentifier.js.map