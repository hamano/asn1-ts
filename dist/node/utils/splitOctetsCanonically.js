"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function* splitOctetsCanonically(value) {
    for (let i = 0; i < value.length; i += 1000) {
        yield value.slice(i, i + 1000);
    }
}
exports.default = splitOctetsCanonically;
//# sourceMappingURL=splitOctetsCanonically.js.map