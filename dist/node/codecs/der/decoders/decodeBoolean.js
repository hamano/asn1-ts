"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors = tslib_1.__importStar(require("../../../errors"));
function decodeBoolean(value) {
    if (value.length !== 1) {
        throw new errors.ASN1SizeError("BOOLEAN not one byte");
    }
    if ((value[0] !== 0x00) && (value[0] !== 0xFF)) {
        throw new errors.ASN1Error("BOOLEAN must be encoded as 0xFF or 0x00.");
    }
    return (value[0] !== 0);
}
exports.default = decodeBoolean;
//# sourceMappingURL=decodeBoolean.js.map