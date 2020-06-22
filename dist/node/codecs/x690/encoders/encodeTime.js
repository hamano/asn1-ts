"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const convertTextToBytes_1 = tslib_1.__importDefault(require("../../../utils/convertTextToBytes"));
function encodeTime(value) {
    return convertTextToBytes_1.default(value.replace(/,/g, "."));
}
exports.default = encodeTime;
//# sourceMappingURL=encodeTime.js.map