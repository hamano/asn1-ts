"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const isGraphicCharacter_1 = tslib_1.__importDefault(require("./isGraphicCharacter"));
function isVisibleCharacter(characterCode) {
    return isGraphicCharacter_1.default(characterCode);
}
exports.default = isVisibleCharacter;
//# sourceMappingURL=isVisibleCharacter.js.map