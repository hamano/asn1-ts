"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function encodeBoolean(value) {
    return new Uint8Array([(value ? 0xFF : 0x00)]);
}
exports.default = encodeBoolean;
//# sourceMappingURL=encodeBoolean.js.map