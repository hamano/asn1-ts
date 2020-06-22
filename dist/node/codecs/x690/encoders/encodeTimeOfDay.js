"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const convertTextToBytes_1 = tslib_1.__importDefault(require("../../../utils/convertTextToBytes"));
function encodeTimeOfDay(time) {
    return convertTextToBytes_1.default(`${time.getHours()}${time.getMinutes()}${time.getSeconds()}`);
}
exports.default = encodeTimeOfDay;
//# sourceMappingURL=encodeTimeOfDay.js.map