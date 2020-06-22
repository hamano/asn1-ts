"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const isPrintableCharacter_1 = tslib_1.__importDefault(require("../../../validators/isPrintableCharacter"));
const convertBytesToText_1 = tslib_1.__importDefault(require("../../../utils/convertBytesToText"));
const errors_1 = require("../../../errors");
const values_1 = require("../../../values");
function decodePrintableString(value) {
    value.forEach((characterCode) => {
        if (!isPrintableCharacter_1.default(characterCode)) {
            throw new errors_1.ASN1CharactersError(`PrintableString can only contain these characters: ${values_1.printableStringCharacters}. `
                + `Encountered character code ${characterCode}.`);
        }
    });
    return convertBytesToText_1.default(value);
}
exports.default = decodePrintableString;
//# sourceMappingURL=decodePrintableString.js.map