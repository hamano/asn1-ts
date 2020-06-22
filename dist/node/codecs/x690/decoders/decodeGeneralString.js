"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const isGeneralCharacter_1 = tslib_1.__importDefault(require("../../../validators/isGeneralCharacter"));
const convertBytesToText_1 = tslib_1.__importDefault(require("../../../utils/convertBytesToText"));
const errors_1 = require("../../../errors");
function decodeGeneralString(value) {
    value.forEach((characterCode) => {
        if (!isGeneralCharacter_1.default(characterCode)) {
            throw new errors_1.ASN1CharactersError("GeneralString can only contain ASCII characters."
                + `Encountered character code ${characterCode}.`);
        }
    });
    return convertBytesToText_1.default(value);
}
exports.default = decodeGeneralString;
//# sourceMappingURL=decodeGeneralString.js.map