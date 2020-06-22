"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const isNumericCharacter_1 = tslib_1.__importDefault(require("../../../validators/isNumericCharacter"));
const convertBytesToText_1 = tslib_1.__importDefault(require("../../../utils/convertBytesToText"));
const errors_1 = require("../../../errors");
function decodeNumericString(value) {
    value.forEach((characterCode) => {
        if (!isNumericCharacter_1.default(characterCode)) {
            throw new errors_1.ASN1CharactersError("NumericString can only contain characters 0 - 9 and space. "
                + `Encountered character code ${characterCode}.`);
        }
    });
    return convertBytesToText_1.default(value);
}
exports.default = decodeNumericString;
//# sourceMappingURL=decodeNumericString.js.map