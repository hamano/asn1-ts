"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const isGraphicCharacter_1 = tslib_1.__importDefault(require("../../../validators/isGraphicCharacter"));
const convertBytesToText_1 = tslib_1.__importDefault(require("../../../utils/convertBytesToText"));
const errors_1 = require("../../../errors");
function decodeGraphicString(value) {
    value.forEach((characterCode) => {
        if (!isGraphicCharacter_1.default(characterCode)) {
            throw new errors_1.ASN1CharactersError("GraphicString can only contain characters between 0x20 and 0x7E. "
                + `Encountered character code ${characterCode}.`);
        }
    });
    return convertBytesToText_1.default(value);
}
exports.default = decodeGraphicString;
//# sourceMappingURL=decodeGraphicString.js.map