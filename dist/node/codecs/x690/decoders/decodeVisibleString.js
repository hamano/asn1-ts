"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const isVisibleCharacter_1 = tslib_1.__importDefault(require("../../../validators/isVisibleCharacter"));
const convertBytesToText_1 = tslib_1.__importDefault(require("../../../utils/convertBytesToText"));
const errors_1 = require("../../../errors");
function decodePrintableString(value) {
    value.forEach((characterCode) => {
        if (!isVisibleCharacter_1.default(characterCode)) {
            throw new errors_1.ASN1CharactersError("VisibleString can only contain characters between 0x20 and 0x7E. "
                + `Encountered character code ${characterCode}.`);
        }
    });
    return convertBytesToText_1.default(value);
}
exports.default = decodePrintableString;
//# sourceMappingURL=decodeVisibleString.js.map