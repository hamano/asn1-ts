"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const validateDate_1 = tslib_1.__importDefault(require("./validateDate"));
const validateTime_1 = tslib_1.__importDefault(require("./validateTime"));
function validateDateTime(dataType, year, month, date, hours, minutes, seconds) {
    validateDate_1.default(dataType, year, month, date);
    validateTime_1.default(dataType, hours, minutes, seconds);
}
exports.default = validateDateTime;
//# sourceMappingURL=validateDateTime.js.map