"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors = tslib_1.__importStar(require("../errors"));
function validateConstruction(elements, specification) {
    let i = 0;
    specification.forEach((spec) => {
        if ((i >= elements.length)
            || (spec.tagClass && spec.tagClass !== elements[i].tagClass)
            || (spec.construction && spec.construction !== elements[i].construction)
            || (spec.tagNumber && spec.tagNumber !== elements[i].tagNumber)) {
            if (!spec.optional) {
                throw new errors.ASN1ConstructionError(`Missing required element '${spec.name}'.`);
            }
            return;
        }
        if (spec.choice && spec.choice.length > 0) {
            let matchingChoiceFound = false;
            for (let j = 0; j < spec.choice.length; j++) {
                const choice = spec.choice[j];
                if ((!(choice.tagClass) || (choice.tagClass === elements[i].tagClass))
                    && (!(choice.construction) || (choice.construction === elements[i].construction))
                    && (!(choice.tagNumber) || (choice.tagNumber === elements[i].tagNumber))) {
                    if (choice.callback) {
                        choice.callback(elements[i]);
                    }
                    matchingChoiceFound = true;
                    break;
                }
            }
            if (!matchingChoiceFound && !spec.optional) {
                throw new errors.ASN1ConstructionError(`Missing required CHOICE '${spec.name}'.`);
            }
        }
        if (spec.callback) {
            spec.callback(elements[i]);
        }
        i++;
    });
}
exports.default = validateConstruction;
//# sourceMappingURL=validateConstruction.js.map