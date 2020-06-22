"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const datetimeComponentValidator_1 = tslib_1.__importDefault(require("../../validators/datetimeComponentValidator"));
class YEAR_MONTH_ENCODING {
    constructor(year, month) {
        this.year = year;
        this.month = month;
        datetimeComponentValidator_1.default("month", 1, 12)("YEAR-MONTH-ENCODING", month);
    }
}
exports.default = YEAR_MONTH_ENCODING;
//# sourceMappingURL=YEAR-MONTH-ENCODING.js.map