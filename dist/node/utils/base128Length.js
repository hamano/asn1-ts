"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function base128Length(numberOfBytes) {
    return Math.ceil(numberOfBytes * (8 / 7));
}
exports.default = base128Length;
//# sourceMappingURL=base128Length.js.map