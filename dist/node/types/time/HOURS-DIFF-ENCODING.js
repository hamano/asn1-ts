"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const datetimeComponentValidator_1 = tslib_1.__importDefault(require("../../validators/datetimeComponentValidator"));
class HOURS_DIFF_ENCODING {
    constructor(hours, minutes_diff) {
        this.hours = hours;
        this.minutes_diff = minutes_diff;
        datetimeComponentValidator_1.default("hour", 0, 24)("HOURS-DIFF-ENCODING", hours);
        datetimeComponentValidator_1.default("minute-diff", -900, 900)("HOURS-DIFF-ENCODING", minutes_diff);
    }
}
exports.default = HOURS_DIFF_ENCODING;
//# sourceMappingURL=HOURS-DIFF-ENCODING.js.map