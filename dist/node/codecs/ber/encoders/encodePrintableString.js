"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const isPrintableCharacter_1 = tslib_1.__importDefault(require("../../../validators/isPrintableCharacter"));
const convertTextToBytes_1 = tslib_1.__importDefault(require("../../../utils/convertTextToBytes"));
const errors_1 = require("../../../errors");
const values_1 = require("../../../values");
function encodeNumericString(value) {
    const bytes = convertTextToBytes_1.default(value);
    bytes.forEach((characterCode) => {
        if (!isPrintableCharacter_1.default(characterCode)) {
            throw new errors_1.ASN1CharactersError(`PrintableString can only contain these characters: ${values_1.printableStringCharacters}. `
                + `Encountered character code ${characterCode}.`);
        }
    });
    return bytes;
}
exports.default = encodeNumericString;
//# sourceMappingURL=encodePrintableString.js.map