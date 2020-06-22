"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const convertBytesToText_1 = tslib_1.__importDefault(require("../../../utils/convertBytesToText"));
const errors = tslib_1.__importStar(require("../../../errors"));
const values_1 = require("../../../values");
const validateDateTime_1 = tslib_1.__importDefault(require("../../../validators/validateDateTime"));
function decodeUTCTime(value) {
    const dateString = convertBytesToText_1.default(value);
    const match = values_1.distinguishedUTCTimeRegex.exec(dateString);
    if (match === null) {
        throw new errors.ASN1Error("Malformed UTCTime string.");
    }
    const ret = new Date();
    let year = Number(match[1]);
    year = (year < 70 ? (2000 + year) : (1900 + year));
    const month = (Number(match[2]) - 1);
    const date = Number(match[3]);
    const hours = Number(match[4]);
    const minutes = Number(match[5]);
    const seconds = Number(match[6]);
    validateDateTime_1.default("UTCTime", year, month, date, hours, minutes, seconds);
    ret.setUTCFullYear(year);
    ret.setUTCMonth(month);
    ret.setUTCDate(date);
    ret.setUTCHours(hours);
    ret.setUTCMinutes(minutes);
    ret.setUTCSeconds(seconds);
    return ret;
}
exports.default = decodeUTCTime;
//# sourceMappingURL=decodeUTCTime.js.map