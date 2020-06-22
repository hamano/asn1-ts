"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const convertBytesToText_1 = tslib_1.__importDefault(require("../../../utils/convertBytesToText"));
const validateDateTime_1 = tslib_1.__importDefault(require("../../../validators/validateDateTime"));
function decodeDateTime(bytes) {
    const str = convertBytesToText_1.default(bytes);
    const year = parseInt(str.slice(0, 4), 10);
    const month = parseInt(str.slice(4, 6), 10) - 1;
    const day = parseInt(str.slice(6, 8), 10);
    const hours = parseInt(str.slice(8, 10), 10);
    const minutes = parseInt(str.slice(10, 12), 10);
    const seconds = parseInt(str.slice(12, 14), 10);
    validateDateTime_1.default("DATE-TIME", year, month, day, hours, minutes, seconds);
    return new Date(year, month, day, hours, minutes, seconds);
}
exports.default = decodeDateTime;
//# sourceMappingURL=decodeDateTime.js.map