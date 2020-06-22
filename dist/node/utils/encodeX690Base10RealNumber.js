"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const values_1 = require("../values");
const convertTextToBytes_1 = tslib_1.__importDefault(require("./convertTextToBytes"));
function encodeX690Base10RealNumber(value) {
    if (value === 0.0) {
        return new Uint8Array(0);
    }
    else if (Number.isNaN(value)) {
        return new Uint8Array([values_1.ASN1SpecialRealValue.notANumber]);
    }
    else if (value === -0.0) {
        return new Uint8Array([values_1.ASN1SpecialRealValue.minusZero]);
    }
    else if (value === Infinity) {
        return new Uint8Array([values_1.ASN1SpecialRealValue.plusInfinity]);
    }
    else if (value === -Infinity) {
        return new Uint8Array([values_1.ASN1SpecialRealValue.minusInfinity]);
    }
    const valueString = (String.fromCharCode(0b00000011) + value.toFixed(7));
    return convertTextToBytes_1.default(valueString);
}
exports.default = encodeX690Base10RealNumber;
//# sourceMappingURL=encodeX690Base10RealNumber.js.map