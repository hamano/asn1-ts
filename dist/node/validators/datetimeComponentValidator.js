"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors = tslib_1.__importStar(require("../errors"));
function datetimeComponentValidator(unitName, min, max) {
    return function (dataType, value) {
        if (!Number.isInteger(value)) {
            throw new errors.ASN1Error(`Non-integral ${unitName} supplied to ${dataType}.`);
        }
        if (value > max) {
            throw new errors.ASN1Error(`Encountered ${unitName} greater than ${max} in ${dataType}.`);
        }
        if (value < min) {
            throw new errors.ASN1Error(`Encountered ${unitName} less than ${min} in ${dataType}.`);
        }
    };
}
exports.default = datetimeComponentValidator;
//# sourceMappingURL=datetimeComponentValidator.js.map