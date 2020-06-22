"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function compareSetOfElementsCanonically(a, b) {
    var _a, _b;
    const longestLength = (a.value.length > b.value.length)
        ? a.value.length
        : b.value.length;
    for (let i = 0; i < longestLength; i++) {
        const x = (_a = a.value[i]) !== null && _a !== void 0 ? _a : 0;
        const y = (_b = b.value[i]) !== null && _b !== void 0 ? _b : 0;
        if (x !== y) {
            return (x - y);
        }
    }
    return 0;
}
exports.default = compareSetOfElementsCanonically;
//# sourceMappingURL=compareSetOfElementsCanonically.js.map