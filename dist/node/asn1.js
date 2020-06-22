"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const errors = tslib_1.__importStar(require("./errors"));
const values_1 = require("./values");
class ASN1Element {
    constructor() {
        this.recursionCount = 0;
        this.name = "";
        this.tagClass = values_1.ASN1TagClass.universal;
        this.construction = values_1.ASN1Construction.primitive;
        this._tagNumber = 0;
        this.value = new Uint8Array(0);
    }
    get tagNumber() {
        return this._tagNumber;
    }
    set tagNumber(value) {
        if (!Number.isSafeInteger(value) || (value < 0)) {
            throw new errors.ASN1Error(`Tag ${value} was not a non-negative integer.`);
        }
        this._tagNumber = value;
    }
    get length() {
        return this.value.length;
    }
    validateSize(name, units, actualSize, min, max) {
        const effectiveMax = (typeof max === "undefined" ? Infinity : max);
        if (actualSize < min) {
            throw new errors.ASN1SizeError(`${name} encoded ${actualSize} ${units} when the `
                + `minimum permissible is ${min} ${units}.`);
        }
        if (actualSize > effectiveMax) {
            throw new errors.ASN1SizeError(`${name} encoded ${actualSize} ${units} when the `
                + `maximum permissible is ${effectiveMax} ${units}.`);
        }
    }
    validateRange(name, actualValue, min, max) {
        const effectiveMax = (typeof max === "undefined" ? Infinity : max);
        if (actualValue < min) {
            throw new errors.ASN1OverflowError(`${name} was ${actualValue} when the `
                + `minimum permissible is ${min}.`);
        }
        if (actualValue > effectiveMax) {
            throw new errors.ASN1OverflowError(`${name} was ${actualValue} when the `
                + `maximum permissible is ${effectiveMax}.`);
        }
    }
    sizeConstrainedBitString(min, max) {
        const ret = this.bitString;
        this.validateSize(this.name || "BIT STRING", "bits", ret.length, min, max);
        return ret;
    }
    sizeConstrainedOctetString(min, max) {
        const ret = this.octetString;
        this.validateSize(this.name || "OCTET STRING", "octets", ret.length, min, max);
        return ret;
    }
    sizeConstrainedObjectDescriptor(min, max) {
        const ret = this.objectDescriptor;
        this.validateSize(this.name || "ObjectDescriptor", "characters", ret.length, min, max);
        return ret;
    }
    sizeConstrainedUTF8String(min, max) {
        const ret = this.utf8String;
        this.validateSize(this.name || "UTF8String", "characters", ret.length, min, max);
        return ret;
    }
    sizeConstrainedSequenceOf(min, max) {
        const ret = this.sequence;
        this.validateSize(this.name || "SEQUENCE OF", "elements", ret.length, min, max);
        return ret;
    }
    sizeConstrainedSetOf(min, max) {
        const ret = this.set;
        this.validateSize(this.name || "SET OF", "elements", ret.length, min, max);
        return ret;
    }
    sizeConstrainedNumericString(min, max) {
        const ret = this.numericString;
        this.validateSize(this.name || "NumericString", "characters", ret.length, min, max);
        return ret;
    }
    sizeConstrainedPrintableString(min, max) {
        const ret = this.printableString;
        this.validateSize(this.name || "PrintableString", "characters", ret.length, min, max);
        return ret;
    }
    sizeConstrainedTeletexString(min, max) {
        const ret = this.teletexString;
        this.validateSize(this.name || "TeletexString", "characters", ret.length, min, max);
        return ret;
    }
    sizeConstrainedVideotexString(min, max) {
        const ret = this.videotexString;
        this.validateSize(this.name || "VideotexString", "characters", ret.length, min, max);
        return ret;
    }
    sizeConstrainedIA5String(min, max) {
        const ret = this.ia5String;
        this.validateSize(this.name || "IA5String", "characters", ret.length, min, max);
        return ret;
    }
    sizeConstrainedGraphicString(min, max) {
        const ret = this.graphicString;
        this.validateSize(this.name || "GraphicString", "characters", ret.length, min, max);
        return ret;
    }
    sizeConstrainedVisibleString(min, max) {
        const ret = this.visibleString;
        this.validateSize(this.name || "VisibleString", "characters", ret.length, min, max);
        return ret;
    }
    sizeConstrainedGeneralString(min, max) {
        const ret = this.generalString;
        this.validateSize(this.name || "GeneralString", "characters", ret.length, min, max);
        return ret;
    }
    sizeConstrainedUniversalString(min, max) {
        const ret = this.universalString;
        this.validateSize(this.name || "UniversalString", "characters", ret.length, min, max);
        return ret;
    }
    sizeConstrainedBMPString(min, max) {
        const ret = this.bmpString;
        this.validateSize(this.name || "BMPString", "characters", ret.length, min, max);
        return ret;
    }
    rangeConstrainedInteger(min, max) {
        const ret = this.integer;
        this.validateRange(this.name || "INTEGER", ret, min, max);
        return ret;
    }
    rangeConstrainedReal(min, max) {
        const ret = this.real;
        this.validateRange(this.name || "REAL", ret, min, max);
        return ret;
    }
    validateTag(permittedClasses, permittedConstruction, permittedNumbers) {
        if (!permittedClasses.includes(this.tagClass))
            return -1;
        if (!permittedConstruction.includes(this.construction))
            return -2;
        if (!permittedNumbers.includes(this.tagNumber))
            return -3;
        return 0;
    }
    set bool(value) {
        this.boolean = value;
    }
    get bool() {
        return this.boolean;
    }
    set int(value) {
        this.integer = value;
    }
    get int() {
        return this.integer;
    }
    set bits(value) {
        this.bitString = value;
    }
    get bits() {
        return this.bitString;
    }
    set octs(value) {
        this.octetString = value;
    }
    get octs() {
        return this.octetString;
    }
    set oid(value) {
        this.objectIdentifier = value;
    }
    get oid() {
        return this.objectIdentifier;
    }
    set odesc(value) {
        this.objectDescriptor = value;
    }
    get odesc() {
        return this.objectDescriptor;
    }
    set enum(value) {
        this.enumerated = value;
    }
    get enum() {
        return this.enumerated;
    }
    set utf8(value) {
        this.utf8String = value;
    }
    get utf8() {
        return this.utf8String;
    }
    set roid(value) {
        this.relativeObjectIdentifier = value;
    }
    get roid() {
        return this.relativeObjectIdentifier;
    }
    set seq(value) {
        this.sequence = value;
    }
    get seq() {
        return this.sequence;
    }
    set nums(value) {
        this.numericString = value;
    }
    get nums() {
        return this.numericString;
    }
    set prints(value) {
        this.printableString = value;
    }
    get prints() {
        return this.printableString;
    }
    set ttex(value) {
        this.teletexString = value;
    }
    get ttex() {
        return this.teletexString;
    }
    set vtex(value) {
        this.videotexString = value;
    }
    get vtex() {
        return this.videotexString;
    }
    set ia5(value) {
        this.ia5String = value;
    }
    get ia5() {
        return this.ia5String;
    }
    set utc(value) {
        this.utcTime = value;
    }
    get utc() {
        return this.utcTime;
    }
    set gtime(value) {
        this.generalizedTime = value;
    }
    get gtime() {
        return this.generalizedTime;
    }
    set ustr(value) {
        this.universalString = value;
    }
    get ustr() {
        return this.universalString;
    }
    set bmp(value) {
        this.bmpString = value;
    }
    get bmp() {
        return this.bmpString;
    }
    toElement() {
        return this;
    }
    fromElement(el) {
        this.tagClass = el.tagClass;
        this.construction = el.construction;
        this.tagNumber = el.tagNumber;
        this.value = new Uint8Array(el.value);
    }
}
exports.default = ASN1Element;
ASN1Element.nestingRecursionLimit = 5;
//# sourceMappingURL=asn1.js.map