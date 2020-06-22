"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors = tslib_1.__importStar(require("../errors"));
function validateTime(dataType, hours, minutes, seconds) {
    if (hours > 23) {
        throw new errors.ASN1Error(`Hours > 23 encountered in ${dataType}.`);
    }
    if (minutes > 59) {
        throw new errors.ASN1Error(`Minutes > 60 encountered in ${dataType}.`);
    }
    if (seconds > 59) {
        throw new errors.ASN1Error(`Seconds > 60 encountered in ${dataType}.`);
    }
}
exports.default = validateTime;
//# sourceMappingURL=validateTime.js.map