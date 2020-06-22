"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const datetimeComponentValidator_1 = tslib_1.__importDefault(require("../../validators/datetimeComponentValidator"));
class TIME_OF_DAY_FRACTION_ENCODING {
    constructor(hours, minutes, seconds, fractional_part) {
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
        this.fractional_part = fractional_part;
        datetimeComponentValidator_1.default("hour", 0, 24)("TIME-OF-DAY-FRACTION-ENCODING", hours);
        datetimeComponentValidator_1.default("minute", 0, 59)("TIME-OF-DAY-FRACTION-ENCODING", minutes);
        datetimeComponentValidator_1.default("seconds", 0, 60)("TIME-OF-DAY-FRACTION-ENCODING", seconds);
        datetimeComponentValidator_1.default("fractional-part", 0, Number.MAX_SAFE_INTEGER)("TIME-OF-DAY-FRACTION-ENCODING", fractional_part);
    }
}
exports.default = TIME_OF_DAY_FRACTION_ENCODING;
//# sourceMappingURL=TIME-OF-DAY-FRACTION-ENCODING.js.map