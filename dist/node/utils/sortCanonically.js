"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const values_1 = require("../values");
const compareSetOfElementsCanonically_1 = tslib_1.__importDefault(require("./compareSetOfElementsCanonically"));
function sortCanonically(elements) {
    elements.sort((a, b) => {
        const aClassOrder = values_1.CANONICAL_TAG_CLASS_ORDERING.findIndex((ctco) => ctco === a.tagClass);
        const bClassOrder = values_1.CANONICAL_TAG_CLASS_ORDERING.findIndex((ctco) => ctco === b.tagClass);
        if (aClassOrder !== bClassOrder) {
            return (aClassOrder - bClassOrder);
        }
        return (a.tagNumber !== b.tagNumber)
            ? (a.tagNumber - b.tagNumber)
            : compareSetOfElementsCanonically_1.default(a, b);
    });
}
exports.default = sortCanonically;
//# sourceMappingURL=sortCanonically.js.map