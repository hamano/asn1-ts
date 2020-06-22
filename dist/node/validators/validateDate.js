"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors = tslib_1.__importStar(require("../errors"));
function validateDate(dataType, year, month, date) {
    switch (month) {
        case 0:
        case 2:
        case 4:
        case 6:
        case 7:
        case 9:
        case 11: {
            if (date > 31) {
                throw new errors.ASN1Error(`Day > 31 encountered in ${dataType} with 31-day month.`);
            }
            break;
        }
        case 3:
        case 5:
        case 8:
        case 10: {
            if (date > 30) {
                throw new errors.ASN1Error(`Day > 31 encountered in ${dataType} with 30-day month.`);
            }
            break;
        }
        case 1: {
            const isLeapYear = ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
            if (isLeapYear) {
                if (date > 29) {
                    throw new errors.ASN1Error(`Day > 29 encountered in ${dataType} with month of February in leap year.`);
                }
            }
            else if (date > 28) {
                throw new errors.ASN1Error(`Day > 28 encountered in ${dataType} with month of February and non leap year.`);
            }
            break;
        }
        default:
            throw new errors.ASN1Error(`Month greater than 12 encountered in ${dataType}.`);
    }
}
exports.default = validateDate;
//# sourceMappingURL=validateDate.js.map