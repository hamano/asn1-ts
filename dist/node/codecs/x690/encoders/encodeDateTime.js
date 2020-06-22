"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const convertTextToBytes_1 = tslib_1.__importDefault(require("../../../utils/convertTextToBytes"));
const errors = tslib_1.__importStar(require("../../../errors"));
function encodeDateTime(value) {
    if (value.getFullYear() < 1582 || value.getFullYear() > 9999) {
        throw new errors.ASN1Error(`The DATE ${value.toISOString()} may not be encoded, because the `
            + "year must be greater than 1581 and less than 10000.");
    }
    return convertTextToBytes_1.default(value.getFullYear().toString()
        + (value.getMonth() + 1).toString().padStart(2, "0")
        + value.getDate().toString().padStart(2, "0")
        + value.getHours().toString().padStart(2, "0")
        + value.getMinutes().toString().padStart(2, "0")
        + value.getSeconds().toString().padStart(2, "0"));
}
exports.default = encodeDateTime;
//# sourceMappingURL=encodeDateTime.js.map