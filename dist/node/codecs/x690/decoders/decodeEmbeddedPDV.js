"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const EmbeddedPDV_1 = tslib_1.__importDefault(require("../../../types/EmbeddedPDV"));
const values_1 = require("../../../values");
const validateConstruction_1 = tslib_1.__importDefault(require("../../../validators/validateConstruction"));
const decodeSequence_1 = tslib_1.__importDefault(require("../../der/decoders/decodeSequence"));
function decodeEmbeddedPDV(value) {
    let identification;
    let dataValue;
    const specification = [
        {
            name: "identification",
            optional: false,
            tagClass: values_1.ASN1TagClass.context,
            callback: (el) => {
                identification = el;
            },
        },
        {
            name: "dataValue",
            optional: true,
            tagClass: values_1.ASN1TagClass.universal,
            tagNumber: values_1.ASN1UniversalType.octetString,
            callback: (el) => {
                dataValue = el.octetString;
            },
        },
    ];
    validateConstruction_1.default(decodeSequence_1.default(value), specification);
    return new EmbeddedPDV_1.default(identification, dataValue);
}
exports.default = decodeEmbeddedPDV;
//# sourceMappingURL=decodeEmbeddedPDV.js.map