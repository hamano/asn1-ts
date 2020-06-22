"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const External_1 = tslib_1.__importDefault(require("../../../types/External"));
const values_1 = require("../../../values");
const errors = tslib_1.__importStar(require("../../../errors"));
const validateConstruction_1 = tslib_1.__importDefault(require("../../../validators/validateConstruction"));
const decodeSequence_1 = tslib_1.__importDefault(require("../../der/decoders/decodeSequence"));
function decodeExternal(value) {
    let directReference = undefined;
    let indirectReference = undefined;
    let dataValueDescriptor = undefined;
    let encoding;
    const specification = [
        {
            name: "directReference",
            optional: true,
            tagClass: values_1.ASN1TagClass.universal,
            tagNumber: values_1.ASN1UniversalType.objectIdentifier,
            callback: (el) => {
                directReference = el.objectIdentifier;
            },
        },
        {
            name: "indirectReference",
            optional: true,
            tagClass: values_1.ASN1TagClass.universal,
            tagNumber: values_1.ASN1UniversalType.integer,
            callback: (el) => {
                indirectReference = el.integer;
            },
        },
        {
            name: "dataValueDescriptor",
            optional: true,
            tagClass: values_1.ASN1TagClass.universal,
            tagNumber: values_1.ASN1UniversalType.objectDescriptor,
            callback: (el) => {
                dataValueDescriptor = el.objectDescriptor;
            },
        },
        {
            name: "encoding",
            optional: true,
            tagClass: values_1.ASN1TagClass.context,
            callback: (el) => {
                switch (el.tagNumber) {
                    case (0): {
                        encoding = el;
                        break;
                    }
                    case (1): {
                        encoding = el.octetString;
                        break;
                    }
                    case (2): {
                        encoding = el.bitString;
                        break;
                    }
                    default: {
                        throw new errors.ASN1UndefinedError("EXTERNAL does not know of an encoding option "
                            + `having tag number ${el.tagNumber}.`);
                    }
                }
            },
        },
    ];
    validateConstruction_1.default(decodeSequence_1.default(value), specification);
    return new External_1.default(directReference, indirectReference, dataValueDescriptor, encoding);
}
exports.default = decodeExternal;
//# sourceMappingURL=decodeExternal.js.map