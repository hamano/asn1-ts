export declare const MAX_UINT_32: number;
export declare const MIN_UINT_32: number;
export declare const MAX_SINT_32: number;
export declare const MIN_SINT_32: number;
export declare enum ASN1TagClass {
    universal = 0,
    application = 1,
    context = 3,
    private = 4
}
export declare enum ASN1Construction {
    primitive = 0,
    constructed = 1
}
export declare enum LengthEncodingPreference {
    definite = 0,
    indefinite = 1
}
export declare enum ASN1SpecialRealValue {
    plusInfinity = 64,
    minusInfinity = 65,
    notANumber = 66,
    minusZero = 67
}
export declare enum ASN1UniversalType {
    endOfContent = 0,
    boolean = 1,
    integer = 2,
    bitString = 3,
    octetString = 4,
    nill = 5,
    objectIdentifier = 6,
    objectDescriptor = 7,
    external = 8,
    realNumber = 9,
    enumerated = 10,
    embeddedPDV = 11,
    utf8String = 12,
    relativeOID = 13,
    reserved14 = 14,
    reserved15 = 15,
    sequence = 16,
    set = 17,
    numericString = 18,
    printableString = 19,
    teletexString = 20,
    videotexString = 21,
    ia5String = 22,
    utcTime = 23,
    generalizedTime = 24,
    graphicString = 25,
    visibleString = 26,
    generalString = 27,
    universalString = 28,
    characterString = 29,
    bmpString = 30
}
export declare const printableStringCharacters: string;
export declare const utcTimeRegex: RegExp;
export declare const distinguishedUTCTimeRegex: RegExp;
export declare const generalizedTimeRegex: RegExp;
export declare const distinguishedGeneralizedTimeRegex: RegExp;
export declare const nr1Regex: RegExp;
export declare const nr2Regex: RegExp;
export declare const nr3Regex: RegExp;
export declare const canonicalNR3Regex: RegExp;
export declare const distinguishedNR3Regex: RegExp;