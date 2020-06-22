"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function trimLeadingPaddingBytes(value) {
    if (value.length <= 1) {
        return value;
    }
    let startOfNonPadding = 0;
    while (startOfNonPadding < value.length) {
        if (value[startOfNonPadding] === 0x80) {
            startOfNonPadding++;
        }
        else {
            break;
        }
    }
    return value.slice(startOfNonPadding);
}
exports.default = trimLeadingPaddingBytes;
//# sourceMappingURL=trimLeadingPaddingBytes.js.map