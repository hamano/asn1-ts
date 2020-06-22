"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const convertBytesToText_1 = tslib_1.__importDefault(require("../../../utils/convertBytesToText"));
const validateDate_1 = tslib_1.__importDefault(require("../../../validators/validateDate"));
function decodeDate(bytes) {
    const str = convertBytesToText_1.default(bytes);
    const year = parseInt(str.slice(0, 4), 10);
    const month = parseInt(str.slice(4, 6), 10) - 1;
    const day = parseInt(str.slice(6, 8), 10);
    validateDate_1.default("DATE", year, month, day);
    return new Date(year, month, day);
}
exports.default = decodeDate;
//# sourceMappingURL=decodeDate.js.map