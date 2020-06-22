"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const convertTextToBytes_1 = tslib_1.__importDefault(require("../../../utils/convertTextToBytes"));
function encodeRelativeOIDIRI(value) {
    return convertTextToBytes_1.default(value);
}
exports.default = encodeRelativeOIDIRI;
//# sourceMappingURL=encodeRelativeOIDIRI.js.map