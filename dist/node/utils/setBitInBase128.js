"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function setBit(to, bitIndex, value) {
    const byteIndex = to.length - (Math.floor(bitIndex / 7) + 1);
    if (value) {
        to[byteIndex] |= (0x01 << (bitIndex % 7));
    }
    else {
        to[byteIndex] &= ~(0x01 << (bitIndex % 7));
    }
}
exports.default = setBit;
//# sourceMappingURL=setBitInBase128.js.map