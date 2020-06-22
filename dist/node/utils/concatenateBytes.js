"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function concatenateBytes(value) {
    if (value.length === 0) {
        return new Uint8Array(0);
    }
    const totalLength = value
        .map((bytes) => bytes.length)
        .reduce((previousValue, currentValue) => (previousValue + currentValue));
    const newValue = new Uint8Array(totalLength);
    let currentIndex = 0;
    value.forEach((x) => {
        newValue.set(x, currentIndex);
        currentIndex += x.length;
    });
    return newValue;
}
exports.default = concatenateBytes;
//# sourceMappingURL=concatenateBytes.js.map