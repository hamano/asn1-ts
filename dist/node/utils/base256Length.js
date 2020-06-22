"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function base256Length(numberOfBytes) {
    return Math.ceil(numberOfBytes * (7 / 8));
}
exports.default = base256Length;
//# sourceMappingURL=base256Length.js.map