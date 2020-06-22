"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isUniquelyTagged(elements) {
    const finds = new Set([]);
    for (let i = 0; i < elements.length; i++) {
        const key = `${elements[i].tagClass}.${elements[i].tagNumber}`;
        if (finds.has(key)) {
            return false;
        }
        finds.add(key);
    }
    return true;
}
exports.default = isUniquelyTagged;
//# sourceMappingURL=isUniquelyTagged.js.map