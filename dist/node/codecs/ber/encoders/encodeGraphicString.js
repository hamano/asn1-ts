"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const isGraphicCharacter_1 = tslib_1.__importDefault(require("../../../validators/isGraphicCharacter"));
const convertTextToBytes_1 = tslib_1.__importDefault(require("../../../utils/convertTextToBytes"));
const errors_1 = require("../../../errors");
function encodeGraphicString(value) {
    const bytes = convertTextToBytes_1.default(value);
    bytes.forEach((characterCode) => {
        if (!isGraphicCharacter_1.default(characterCode)) {
            throw new errors_1.ASN1CharactersError("GraphicString can only contain characters between 0x20 and 0x7E. "
                + `Encountered character code ${characterCode}.`);
        }
    });
    return bytes;
}
exports.default = encodeGraphicString;
//# sourceMappingURL=encodeGraphicString.js.map