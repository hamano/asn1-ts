"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const datetimeComponentValidator_1 = tslib_1.__importDefault(require("../../validators/datetimeComponentValidator"));
class TIME_OF_DAY_ENCODING {
    constructor(hours, minutes, seconds) {
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
        datetimeComponentValidator_1.default("hour", 0, 24)("TIME-OF-DAY-ENCODING", hours);
        datetimeComponentValidator_1.default("minute", 0, 59)("TIME-OF-DAY-ENCODING", minutes);
        datetimeComponentValidator_1.default("seconds", 0, 60)("TIME-OF-DAY-ENCODING", seconds);
    }
}
exports.default = TIME_OF_DAY_ENCODING;
//# sourceMappingURL=TIME-OF-DAY-ENCODING.js.map