"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getBit(from, bitIndex) {
    return ((from[from.length - (Math.floor(bitIndex / 8) + 1)] & (0x01 << (bitIndex % 8))) > 0);
}
exports.default = getBit;
//# sourceMappingURL=getBitFromBase256.js.map