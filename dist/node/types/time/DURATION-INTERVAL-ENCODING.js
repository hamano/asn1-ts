"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors = tslib_1.__importStar(require("../../errors"));
const datetimeComponentValidator_1 = tslib_1.__importDefault(require("../../validators/datetimeComponentValidator"));
class DURATION_INTERVAL_ENCODING {
    constructor(years, months, weeks, days, hours, minutes, seconds, fractional_part) {
        this.years = years;
        this.months = months;
        this.weeks = weeks;
        this.days = days;
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
        this.fractional_part = fractional_part;
        if (typeof weeks !== "undefined"
            && (years || months || days || hours || minutes || seconds)) {
            throw new errors.ASN1Error("DURATION-INTERVAL-ENCODING may not combine week components and date-time components.");
        }
        if (years) {
            datetimeComponentValidator_1.default("year", 0, Number.MAX_SAFE_INTEGER)("DURATION-INTERVAL-ENCODING", years);
        }
        if (months) {
            datetimeComponentValidator_1.default("month", 0, Number.MAX_SAFE_INTEGER)("DURATION-INTERVAL-ENCODING", months);
        }
        if (weeks) {
            datetimeComponentValidator_1.default("week", 0, Number.MAX_SAFE_INTEGER)("DURATION-INTERVAL-ENCODING", weeks);
        }
        if (days) {
            datetimeComponentValidator_1.default("day", 0, Number.MAX_SAFE_INTEGER)("DURATION-INTERVAL-ENCODING", days);
        }
        if (hours) {
            datetimeComponentValidator_1.default("hour", 0, Number.MAX_SAFE_INTEGER)("DURATION-INTERVAL-ENCODING", hours);
        }
        if (minutes) {
            datetimeComponentValidator_1.default("minute", 0, Number.MAX_SAFE_INTEGER)("DURATION-INTERVAL-ENCODING", minutes);
        }
        if (seconds) {
            datetimeComponentValidator_1.default("second", 0, Number.MAX_SAFE_INTEGER)("DURATION-INTERVAL-ENCODING", seconds);
        }
        if (fractional_part && !Number.isSafeInteger(fractional_part.fractional_value)) {
            throw new errors.ASN1Error("Malformed DURATION-INTERVAL-ENCODING fractional part.");
        }
    }
}
exports.default = DURATION_INTERVAL_ENCODING;
//# sourceMappingURL=DURATION-INTERVAL-ENCODING.js.map