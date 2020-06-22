"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function decodeIEEE754SinglePrecisionFloat(bytes) {
    return new Float32Array(bytes.reverse().buffer)[0];
}
exports.default = decodeIEEE754SinglePrecisionFloat;
//# sourceMappingURL=decodeIEEE754SinglePrecisionFloat.js.map