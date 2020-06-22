"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function* splitBytesByContinuationBit(value) {
    let lastChunkStartIndex = 0;
    for (let i = 0; i < value.length; i++) {
        if (!(value[i] & 0b10000000)) {
            yield value.slice(lastChunkStartIndex, (i + 1));
            lastChunkStartIndex = (i + 1);
        }
    }
    return;
}
exports.default = splitBytesByContinuationBit;
//# sourceMappingURL=splitBytesByContinuationBit.js.map