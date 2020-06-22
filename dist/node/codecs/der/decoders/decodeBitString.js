"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors = tslib_1.__importStar(require("../../../errors"));
const macros_1 = require("../../../macros");
function decodeBitString(value) {
    if (value.length === 0) {
        throw new errors.ASN1Error("ASN.1 BIT STRING cannot be encoded on zero bytes!");
    }
    if (value.length === 1 && value[0] !== 0) {
        throw new errors.ASN1Error("ASN.1 BIT STRING encoded with deceptive first byte!");
    }
    if (value[0] > 7) {
        throw new errors.ASN1Error("First byte of an ASN.1 BIT STRING must be <= 7!");
    }
    let ret = [];
    for (let i = 1; i < value.length; i++) {
        ret = ret.concat([
            ((value[i] & 0b10000000) ? macros_1.TRUE_BIT : macros_1.FALSE_BIT),
            ((value[i] & 0b01000000) ? macros_1.TRUE_BIT : macros_1.FALSE_BIT),
            ((value[i] & 0b00100000) ? macros_1.TRUE_BIT : macros_1.FALSE_BIT),
            ((value[i] & 0b00010000) ? macros_1.TRUE_BIT : macros_1.FALSE_BIT),
            ((value[i] & 0b00001000) ? macros_1.TRUE_BIT : macros_1.FALSE_BIT),
            ((value[i] & 0b00000100) ? macros_1.TRUE_BIT : macros_1.FALSE_BIT),
            ((value[i] & 0b00000010) ? macros_1.TRUE_BIT : macros_1.FALSE_BIT),
            ((value[i] & 0b00000001) ? macros_1.TRUE_BIT : macros_1.FALSE_BIT),
        ]);
    }
    ret.slice((ret.length - value[0])).forEach((bit) => {
        if (bit)
            throw new errors.ASN1Error("BIT STRING had a trailing set bit.");
    });
    ret.length -= value[0];
    return new Uint8ClampedArray(ret);
}
exports.default = decodeBitString;
//# sourceMappingURL=decodeBitString.js.map