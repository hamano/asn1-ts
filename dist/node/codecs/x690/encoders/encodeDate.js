"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const convertTextToBytes_1 = tslib_1.__importDefault(require("../../../utils/convertTextToBytes"));
const errors = tslib_1.__importStar(require("../../../errors"));
function encodeDate(date) {
    if (date.getFullYear() < 1582 || date.getFullYear() > 9999) {
        throw new errors.ASN1Error(`The DATE ${date.toISOString()} may not be encoded, because the `
            + "year must be greater than 1581 and less than 10000.");
    }
    return convertTextToBytes_1.default(date.getFullYear().toString()
        + (date.getMonth() + 1).toString().padStart(2, "0")
        + date.getDate().toString().padStart(2, "0"));
}
exports.default = encodeDate;
//# sourceMappingURL=encodeDate.js.map