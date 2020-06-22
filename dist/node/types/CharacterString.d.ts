import ASN1Element from "../asn1";
export default class CharacterString {
    readonly identification: ASN1Element;
    readonly stringValue: Uint8Array;
    constructor(identification: ASN1Element, stringValue: Uint8Array);
}
//# sourceMappingURL=CharacterString.d.ts.map