"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const convertTextToBytes_1 = tslib_1.__importDefault(require("../../../utils/convertTextToBytes"));
function encodeDuration(value) {
    if (value.weeks) {
        if (!value.fractional_part) {
            return convertTextToBytes_1.default(`${value.weeks}W`);
        }
        else {
            const integralAmount = value.weeks;
            const fraction = value.fractional_part.fractional_value
                / Math.pow(10, value.fractional_part.number_of_digits);
            return convertTextToBytes_1.default(integralAmount.toString()
                + fraction.toString().slice(1)
                + "W");
        }
    }
    let years = value.years;
    let months = value.months;
    let days = value.days;
    let hours = value.hours;
    let minutes = value.minutes;
    let seconds = value.seconds;
    if (value.fractional_part) {
        const fraction = value.fractional_part.fractional_value
            / Math.pow(10, value.fractional_part.number_of_digits);
        if (seconds !== undefined) {
            seconds += fraction;
        }
        else if (minutes !== undefined) {
            minutes += fraction;
        }
        else if (hours !== undefined) {
            hours += fraction;
        }
        else if (days !== undefined) {
            days += fraction;
        }
        else if (months !== undefined) {
            months += fraction;
        }
        else if (years !== undefined) {
            years += fraction;
        }
    }
    return convertTextToBytes_1.default((years ? `${years}Y` : "")
        + (months ? `${months}M` : "")
        + (days ? `${days}D` : "")
        + ((hours || minutes || seconds) ? "T" : "")
        + (hours ? `${hours}H` : "")
        + (minutes ? `${minutes}M` : "")
        + (seconds ? `${seconds}S` : ""));
}
exports.default = encodeDuration;
//# sourceMappingURL=encodeDuration.js.map