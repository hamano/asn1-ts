"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const concatenateBytes_1 = tslib_1.__importDefault(require("../../../utils/concatenateBytes"));
const encodeUnsignedBigEndianInteger_1 = tslib_1.__importDefault(require("../../../utils/encodeUnsignedBigEndianInteger"));
const encodeBase128_1 = tslib_1.__importDefault(require("../../../utils/encodeBase128"));
function encodeRelativeObjectIdentifier(value) {
    return concatenateBytes_1.default(value
        .map(encodeUnsignedBigEndianInteger_1.default)
        .map(encodeBase128_1.default)
        .map((arc) => ((arc[0] === 0x80) ? arc.slice(1) : arc)));
}
exports.default = encodeRelativeObjectIdentifier;
//# sourceMappingURL=encodeRelativeObjectIdentifier.js.map