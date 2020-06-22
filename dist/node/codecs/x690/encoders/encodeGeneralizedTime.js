"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const convertTextToBytes_1 = tslib_1.__importDefault(require("../../../utils/convertTextToBytes"));
function encodeGeneralizedTime(value) {
    const year = value.getUTCFullYear().toString();
    const month = (value.getUTCMonth() < 9 ? `0${value.getUTCMonth() + 1}` : `${value.getUTCMonth() + 1}`);
    const day = (value.getUTCDate() < 10 ? `0${value.getUTCDate()}` : `${value.getUTCDate()}`);
    const hour = (value.getUTCHours() < 10 ? `0${value.getUTCHours()}` : `${value.getUTCHours()}`);
    const minute = (value.getUTCMinutes() < 10 ? `0${value.getUTCMinutes()}` : `${value.getUTCMinutes()}`);
    const second = (value.getUTCSeconds() < 10 ? `0${value.getUTCSeconds()}` : `${value.getUTCSeconds()}`);
    const timeString = `${year}${month}${day}${hour}${minute}${second}Z`;
    return convertTextToBytes_1.default(timeString);
}
exports.default = encodeGeneralizedTime;
//# sourceMappingURL=encodeGeneralizedTime.js.map