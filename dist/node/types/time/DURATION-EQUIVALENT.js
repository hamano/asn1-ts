"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors = tslib_1.__importStar(require("../../errors"));
const datetimeComponentValidator_1 = tslib_1.__importDefault(require("../../validators/datetimeComponentValidator"));
class DURATION_EQUIVALENT {
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
            throw new errors.ASN1Error("DURATION-EQUIVALENT may not combine week components and date-time components.");
        }
        if (years) {
            datetimeComponentValidator_1.default("year", 0, Number.MAX_SAFE_INTEGER)("DURATION-EQUIVALENT", years);
        }
        if (months) {
            datetimeComponentValidator_1.default("month", 0, Number.MAX_SAFE_INTEGER)("DURATION-EQUIVALENT", months);
        }
        if (weeks) {
            datetimeComponentValidator_1.default("week", 0, Number.MAX_SAFE_INTEGER)("DURATION-EQUIVALENT", weeks);
        }
        if (days) {
            datetimeComponentValidator_1.default("day", 0, Number.MAX_SAFE_INTEGER)("DURATION-EQUIVALENT", days);
        }
        if (hours) {
            datetimeComponentValidator_1.default("hour", 0, Number.MAX_SAFE_INTEGER)("DURATION-EQUIVALENT", hours);
        }
        if (minutes) {
            datetimeComponentValidator_1.default("minute", 0, Number.MAX_SAFE_INTEGER)("DURATION-EQUIVALENT", minutes);
        }
        if (seconds) {
            datetimeComponentValidator_1.default("second", 0, Number.MAX_SAFE_INTEGER)("DURATION-EQUIVALENT", seconds);
        }
        if (fractional_part && !Number.isSafeInteger(fractional_part.fractional_value)) {
            throw new errors.ASN1Error("Malformed DURATION-EQUIVALENT fractional part.");
        }
    }
}
exports.default = DURATION_EQUIVALENT;
//# sourceMappingURL=DURATION-EQUIVALENT.js.map