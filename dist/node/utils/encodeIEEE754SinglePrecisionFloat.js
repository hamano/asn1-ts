"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function encodeIEEE754SinglePrecisionFloat(value) {
    return new Uint8Array(new Float32Array([value]).buffer).reverse();
}
exports.default = encodeIEEE754SinglePrecisionFloat;
//# sourceMappingURL=encodeIEEE754SinglePrecisionFloat.js.map