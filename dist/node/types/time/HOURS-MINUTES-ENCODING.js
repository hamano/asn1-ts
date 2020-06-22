"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const datetimeComponentValidator_1 = tslib_1.__importDefault(require("../../validators/datetimeComponentValidator"));
class HOURS_MINUTES_ENCODING {
    constructor(hours, minutes) {
        this.hours = hours;
        this.minutes = minutes;
        datetimeComponentValidator_1.default("hour", 0, 24)("HOURS-MINUTES-ENCODING", hours);
        datetimeComponentValidator_1.default("minute", 0, 59)("HOURS-MINUTES-ENCODING", minutes);
    }
}
exports.default = HOURS_MINUTES_ENCODING;
//# sourceMappingURL=HOURS-MINUTES-ENCODING.js.map