"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function decodeIEEE754DoublePrecisionFloat(bytes) {
    return new Float64Array(bytes.reverse().buffer)[0];
}
exports.default = decodeIEEE754DoublePrecisionFloat;
//# sourceMappingURL=decodeIEEE754DoublePrecisionFloat.js.map