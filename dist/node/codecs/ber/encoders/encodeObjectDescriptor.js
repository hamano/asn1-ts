"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const isObjectDescriptorCharacter_1 = tslib_1.__importDefault(require("../../../validators/isObjectDescriptorCharacter"));
const convertTextToBytes_1 = tslib_1.__importDefault(require("../../../utils/convertTextToBytes"));
const errors_1 = require("../../../errors");
function encodeObjectDescriptor(value) {
    const bytes = convertTextToBytes_1.default(value);
    bytes.forEach((characterCode) => {
        if (!isObjectDescriptorCharacter_1.default(characterCode)) {
            throw new errors_1.ASN1CharactersError("ObjectDescriptor can only contain characters between 0x20 and 0x7E. "
                + `Encountered character code ${characterCode}.`);
        }
    });
    return bytes;
}
exports.default = encodeObjectDescriptor;
//# sourceMappingURL=encodeObjectDescriptor.js.map