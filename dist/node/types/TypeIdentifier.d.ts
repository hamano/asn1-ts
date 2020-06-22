import ASN1Element from "../asn1";
import ObjectIdentifier from "./ObjectIdentifier";
export default class TypeIdentifier<Element extends ASN1Element> {
    readonly id: ObjectIdentifier;
    readonly type: Element;
    constructor(id: ObjectIdentifier, type: Element);
}
//# sourceMappingURL=TypeIdentifier.d.ts.map