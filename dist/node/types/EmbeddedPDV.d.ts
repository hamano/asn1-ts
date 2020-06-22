import ASN1Element from "../asn1";
export default class EmbeddedPDV {
    readonly identification: ASN1Element;
    readonly dataValue: Uint8Array;
    constructor(identification: ASN1Element, dataValue: Uint8Array);
}
//# sourceMappingURL=EmbeddedPDV.d.ts.map