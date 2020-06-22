"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const datetimeComponentValidator_1 = tslib_1.__importDefault(require("../../validators/datetimeComponentValidator"));
class TIME_OF_DAY_DIFF_ENCODING {
    constructor(hours, minutes, seconds, minutes_diff) {
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
        this.minutes_diff = minutes_diff;
        datetimeComponentValidator_1.default("hour", 0, 24)("TIME-OF-DAY-DIFF-ENCODING", hours);
        datetimeComponentValidator_1.default("minute", 0, 59)("TIME-OF-DAY-DIFF-ENCODING", minutes);
        datetimeComponentValidator_1.default("seconds", 0, 60)("TIME-OF-DAY-DIFF-ENCODING", seconds);
        datetimeComponentValidator_1.default("minute-diff", -900, 900)("TIME-OF-DAY-DIFF-ENCODING", minutes_diff);
    }
}
exports.default = TIME_OF_DAY_DIFF_ENCODING;
//# sourceMappingURL=TIME-OF-DAY-DIFF-ENCODING.js.map