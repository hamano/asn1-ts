"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const convertBytesToText_1 = tslib_1.__importDefault(require("../../../utils/convertBytesToText"));
const errors = tslib_1.__importStar(require("../../../errors"));
const types_1 = require("../../../types");
const values_1 = require("../../../values");
function decodeDuration(bytes) {
    const str = convertBytesToText_1.default(bytes).replace(/,/g, ".");
    if (str.indexOf("W") === (str.length - 1)) {
        const weekString = str.slice(0, -1);
        const indexOfDecimalSeparator = weekString.indexOf(".");
        const weeks = indexOfDecimalSeparator !== -1
            ? parseInt(weekString.slice(0, indexOfDecimalSeparator), 10)
            : parseInt(weekString, 10);
        if (Number.isNaN(weeks)) {
            throw new errors.ASN1Error(`Could not decode a real number of weeks from DURATION ${str}.`);
        }
        let fractional_part = undefined;
        if (indexOfDecimalSeparator !== -1) {
            const fractionString = weekString.slice(indexOfDecimalSeparator + 1);
            const fractionValue = parseInt(fractionString, 10);
            if (Number.isNaN(fractionValue)) {
                throw new errors.ASN1Error(`Could not decode a fractional number of weeks from DURATION ${str}.`);
            }
            fractional_part = {
                number_of_digits: fractionString.length,
                fractional_value: fractionValue,
            };
        }
        return new types_1.DURATION_EQUIVALENT(undefined, undefined, weeks, undefined, undefined, undefined, undefined, fractional_part);
    }
    const match = values_1.datetimeRegex.exec(str);
    if (!match) {
        throw new errors.ASN1Error(`Malformed DURATION ${str}.`);
    }
    let fractional_part = undefined;
    [
        match[1],
        match[2],
        match[3],
        match[4],
        match[5],
        match[6],
    ].forEach((component) => {
        if (!component) {
            return;
        }
        if (fractional_part) {
            throw new errors.ASN1Error(`No smaller components permitted after fractional component in DURATION ${str}.`);
        }
        const indexOfFractionalSeparator = component.indexOf(".");
        if (indexOfFractionalSeparator !== -1) {
            fractional_part = {
                number_of_digits: (component.length - 1 - indexOfFractionalSeparator),
                fractional_value: Number.parseInt(component.slice(indexOfFractionalSeparator + 1), 10),
            };
        }
    });
    const years = match[1] ? Number.parseInt(match[1], 10) : undefined;
    const months = match[2] ? Number.parseInt(match[2], 10) : undefined;
    const days = match[3] ? Number.parseInt(match[3], 10) : undefined;
    const hours = match[4] ? Number.parseInt(match[4], 10) : undefined;
    const minutes = match[5] ? Number.parseInt(match[5], 10) : undefined;
    const seconds = match[6] ? Number.parseInt(match[6], 10) : undefined;
    return new types_1.DURATION_EQUIVALENT(years, months, undefined, days, hours, minutes, seconds, fractional_part);
}
exports.default = decodeDuration;
//# sourceMappingURL=decodeDuration.js.map