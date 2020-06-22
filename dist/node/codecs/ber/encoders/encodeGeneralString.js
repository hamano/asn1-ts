"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const isGeneralCharacter_1 = tslib_1.__importDefault(require("../../../validators/isGeneralCharacter"));
const convertTextToBytes_1 = tslib_1.__importDefault(require("../../../utils/convertTextToBytes"));
const errors_1 = require("../../../errors");
function encodeGeneralString(value) {
    const bytes = convertTextToBytes_1.default(value);
    bytes.forEach((characterCode) => {
        if (!isGeneralCharacter_1.default(characterCode)) {
            throw new errors_1.ASN1CharactersError("GeneralString can only contain ASCII characters."
                + `Encountered character code ${characterCode}.`);
        }
    });
    return bytes;
}
exports.default = encodeGeneralString;
//# sourceMappingURL=encodeGeneralString.js.map