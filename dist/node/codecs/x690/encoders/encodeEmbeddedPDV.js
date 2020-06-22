"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const der_1 = tslib_1.__importDefault(require("../../../codecs/der"));
const values_1 = require("../../../values");
const encodeSequence_1 = tslib_1.__importDefault(require("./encodeSequence"));
function encodeEmbeddedPDV(value) {
    return encodeSequence_1.default([
        value.identification,
        new der_1.default(values_1.ASN1TagClass.universal, values_1.ASN1Construction.primitive, values_1.ASN1UniversalType.octetString, value.dataValue),
    ]);
}
exports.default = encodeEmbeddedPDV;
//# sourceMappingURL=encodeEmbeddedPDV.js.map