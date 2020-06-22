"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const encodeX690BinaryRealNumber_1 = tslib_1.__importDefault(require("../../../utils/encodeX690BinaryRealNumber"));
function encodeReal(value) {
    return encodeX690BinaryRealNumber_1.default(value);
}
exports.default = encodeReal;
//# sourceMappingURL=encodeReal.js.map