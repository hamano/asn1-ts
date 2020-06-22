"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const CharacterString_1 = tslib_1.__importDefault(require("../../../types/CharacterString"));
const values_1 = require("../../../values");
const validateConstruction_1 = tslib_1.__importDefault(require("../../../validators/validateConstruction"));
const decodeSequence_1 = tslib_1.__importDefault(require("../../der/decoders/decodeSequence"));
function decodeCharacterString(value) {
    let identification;
    let stringValue;
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
            name: "stringValue",
            optional: true,
            tagClass: values_1.ASN1TagClass.universal,
            tagNumber: values_1.ASN1UniversalType.octetString,
            callback: (el) => {
                stringValue = el.octetString;
            },
        },
    ];
    validateConstruction_1.default(decodeSequence_1.default(value), specification);
    return new CharacterString_1.default(identification, stringValue);
}
exports.default = decodeCharacterString;
//# sourceMappingURL=decodeCharacterString.js.map