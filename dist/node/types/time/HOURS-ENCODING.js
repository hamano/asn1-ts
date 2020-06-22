"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const datetimeComponentValidator_1 = tslib_1.__importDefault(require("../../validators/datetimeComponentValidator"));
class HOURS_ENCODING {
    constructor(hours) {
        this.hours = hours;
        datetimeComponentValidator_1.default("hour", 0, 24)("HOURS-ENCODING", hours);
    }
}
exports.default = HOURS_ENCODING;
//# sourceMappingURL=HOURS-ENCODING.js.map