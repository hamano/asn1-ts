"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const concatenateBytes_1 = tslib_1.__importDefault(require("../../../utils/concatenateBytes"));
function encodeSequence(value) {
    return concatenateBytes_1.default(value.map((v) => v.toBytes()));
}
exports.default = encodeSequence;
//# sourceMappingURL=encodeSequence.js.map