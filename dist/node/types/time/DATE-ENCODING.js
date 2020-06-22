"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const datetimeComponentValidator_1 = tslib_1.__importDefault(require("../../validators/datetimeComponentValidator"));
class DATE_ENCODING {
    constructor(year, month, day) {
        this.year = year;
        this.month = month;
        this.day = day;
        datetimeComponentValidator_1.default("month", 1, 12)("DATE-ENCODING", month);
        datetimeComponentValidator_1.default("day", 1, 31)("DATE-ENCODING", day);
    }
}
exports.default = DATE_ENCODING;
//# sourceMappingURL=DATE-ENCODING.js.map