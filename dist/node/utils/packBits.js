"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const macros_1 = require("../macros");
function packBits(bits) {
    const bytesNeeded = Math.ceil(bits.length / 8);
    const ret = new Uint8Array(bytesNeeded);
    for (let bit = 0; bit < bits.length; bit++) {
        if (bits[bit] !== macros_1.FALSE_BIT) {
            const byte = Math.floor(bit / 8);
            ret[byte] |= (0x01 << (7 - (bit % 8)));
        }
    }
    return ret;
}
exports.default = packBits;
//# sourceMappingURL=packBits.js.map