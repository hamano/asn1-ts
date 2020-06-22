"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function encodeIEEE754DoublePrecisionFloat(value) {
    return new Uint8Array(new Float64Array([value]).buffer).reverse();
}
exports.default = encodeIEEE754DoublePrecisionFloat;
//# sourceMappingURL=encodeIEEE754DoublePrecisionFloat.js.map