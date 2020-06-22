"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const convertBytesToText_1 = tslib_1.__importDefault(require("../../../utils/convertBytesToText"));
const validateTime_1 = tslib_1.__importDefault(require("../../../validators/validateTime"));
function decodeTimeOfDay(bytes) {
    const str = convertBytesToText_1.default(bytes);
    const hours = parseInt(str.slice(0, 2), 10);
    const minutes = parseInt(str.slice(2, 4), 10);
    const seconds = parseInt(str.slice(4, 6), 10);
    validateTime_1.default("TIME-OF-DAY", hours, minutes, seconds);
    const ret = new Date();
    ret.setHours(hours);
    ret.setMinutes(minutes);
    ret.setSeconds(seconds);
    return ret;
}
exports.default = decodeTimeOfDay;
//# sourceMappingURL=decodeTimeOfDay.js.map