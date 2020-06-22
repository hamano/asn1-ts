"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ObjectIdentifier_1 = tslib_1.__importDefault(require("../../../types/ObjectIdentifier"));
const errors = tslib_1.__importStar(require("../../../errors"));
const splitBytesByContinuationBit_1 = tslib_1.__importDefault(require("../../../utils/splitBytesByContinuationBit"));
const utils_1 = require("../../../utils");
function decodeObjectIdentifier(value) {
    if (value.length === 0) {
        throw new errors.ASN1TruncationError("Encoded value was too short to be an OBJECT IDENTIFIER!");
    }
    if (value.length > 1 && value[value.length - 1] & 0b10000000) {
        throw new errors.ASN1TruncationError("OID was truncated.");
    }
    const firstTwoNodes = [0, 0];
    if (value[0] >= 0x50) {
        firstTwoNodes[0] = 2;
        firstTwoNodes[1] = (value[0] - 0x50);
    }
    else if (value[0] >= 0x28) {
        firstTwoNodes[0] = 1;
        firstTwoNodes[1] = (value[0] - 0x28);
    }
    else {
        firstTwoNodes[0] = 0;
        firstTwoNodes[1] = value[0];
    }
    if (value.length === 1) {
        return new ObjectIdentifier_1.default(firstTwoNodes);
    }
    const additionalNodes = Array
        .from(splitBytesByContinuationBit_1.default(value.slice(1)))
        .map((b) => {
        if (b.length > 1 && b[0] === 0x80) {
            throw new errors.ASN1PaddingError("Prohibited padding on OBJECT IDENTIFIER node.");
        }
        return b;
    })
        .map(utils_1.decodeBase128)
        .map((b) => ((b[0] === 0) ? b.slice(1) : b))
        .map(utils_1.decodeUnsignedBigEndianInteger);
    return new ObjectIdentifier_1.default(firstTwoNodes.concat(additionalNodes));
}
exports.default = decodeObjectIdentifier;
//# sourceMappingURL=decodeObjectIdentifier.js.map