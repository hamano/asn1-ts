"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isNumericString(characterCode) {
    return ((characterCode >= 0x30 && characterCode <= 0x39) || characterCode === 0x20);
}
exports.default = isNumericString;
//# sourceMappingURL=isNumericCharacter.js.map