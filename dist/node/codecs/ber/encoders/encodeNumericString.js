"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const isNumericCharacter_1 = tslib_1.__importDefault(require("../../../validators/isNumericCharacter"));
const convertTextToBytes_1 = tslib_1.__importDefault(require("../../../utils/convertTextToBytes"));
const errors_1 = require("../../../errors");
function encodeNumericString(value) {
    const bytes = convertTextToBytes_1.default(value);
    bytes.forEach((characterCode) => {
        if (!isNumericCharacter_1.default(characterCode)) {
            throw new errors_1.ASN1CharactersError("NumericString can only contain characters 0 - 9 and space. "
                + `Encountered character code ${characterCode}.`);
        }
    });
    return bytes;
}
exports.default = encodeNumericString;
//# sourceMappingURL=encodeNumericString.js.map