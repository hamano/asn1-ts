"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const convertBytesToText_1 = tslib_1.__importDefault(require("../../../utils/convertBytesToText"));
function decodeOIDIRI(bytes) {
    return convertBytesToText_1.default(bytes);
}
exports.default = decodeOIDIRI;
//# sourceMappingURL=decodeOIDIRI.js.map