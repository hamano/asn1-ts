"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const packBits_1 = tslib_1.__importDefault(require("../../../utils/packBits"));
function encodeBitString(value) {
    if (value.length === 0) {
        return new Uint8Array([0]);
    }
    const ret = new Uint8Array(((value.length >>> 3) + ((value.length % 8) ? 1 : 0)) + 1);
    ret[0] = (8 - (value.length % 8));
    if (ret[0] === 8) {
        ret[0] = 0;
    }
    ret.set(packBits_1.default(value), 1);
    return ret;
}
exports.default = encodeBitString;
//# sourceMappingURL=encodeBitString.js.map