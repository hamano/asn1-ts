"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const asn1_1 = tslib_1.__importDefault(require("../asn1"));
const errors = tslib_1.__importStar(require("../errors"));
const values_1 = require("../values");
const x690_1 = tslib_1.__importDefault(require("../x690"));
const convertBytesToText_1 = tslib_1.__importDefault(require("../utils/convertBytesToText"));
const convertTextToBytes_1 = tslib_1.__importDefault(require("../utils/convertTextToBytes"));
const ObjectIdentifier_1 = tslib_1.__importDefault(require("../types/ObjectIdentifier"));
const encodeBoolean_1 = tslib_1.__importDefault(require("./x690/encoders/encodeBoolean"));
const decodeBoolean_1 = tslib_1.__importDefault(require("./ber/decoders/decodeBoolean"));
const encodeBitString_1 = tslib_1.__importDefault(require("./x690/encoders/encodeBitString"));
const decodeBitString_1 = tslib_1.__importDefault(require("./ber/decoders/decodeBitString"));
const encodeReal_1 = tslib_1.__importDefault(require("./x690/encoders/encodeReal"));
const decodeReal_1 = tslib_1.__importDefault(require("./ber/decoders/decodeReal"));
const encodeSequence_1 = tslib_1.__importDefault(require("./x690/encoders/encodeSequence"));
const decodeSequence_1 = tslib_1.__importDefault(require("./ber/decoders/decodeSequence"));
const encodeUTCTime_1 = tslib_1.__importDefault(require("./x690/encoders/encodeUTCTime"));
const decodeUTCTime_1 = tslib_1.__importDefault(require("./ber/decoders/decodeUTCTime"));
const encodeGeneralizedTime_1 = tslib_1.__importDefault(require("./x690/encoders/encodeGeneralizedTime"));
const decodeGeneralizedTime_1 = tslib_1.__importDefault(require("./ber/decoders/decodeGeneralizedTime"));
const encodeExternal_1 = tslib_1.__importDefault(require("../codecs/x690/encoders/encodeExternal"));
const encodeEmbeddedPDV_1 = tslib_1.__importDefault(require("../codecs/x690/encoders/encodeEmbeddedPDV"));
const encodeCharacterString_1 = tslib_1.__importDefault(require("../codecs/x690/encoders/encodeCharacterString"));
const decodeExternal_1 = tslib_1.__importDefault(require("../codecs/x690/decoders/decodeExternal"));
const decodeEmbeddedPDV_1 = tslib_1.__importDefault(require("../codecs/x690/decoders/decodeEmbeddedPDV"));
const decodeCharacterString_1 = tslib_1.__importDefault(require("../codecs/x690/decoders/decodeCharacterString"));
const encodeGraphicString_1 = tslib_1.__importDefault(require("../codecs/ber/encoders/encodeGraphicString"));
const encodeNumericString_1 = tslib_1.__importDefault(require("../codecs/ber/encoders/encodeNumericString"));
const encodeObjectDescriptor_1 = tslib_1.__importDefault(require("../codecs/ber/encoders/encodeObjectDescriptor"));
const encodePrintableString_1 = tslib_1.__importDefault(require("../codecs/ber/encoders/encodePrintableString"));
const encodeVisibleString_1 = tslib_1.__importDefault(require("../codecs/ber/encoders/encodeVisibleString"));
const encodeGeneralString_1 = tslib_1.__importDefault(require("../codecs/ber/encoders/encodeGeneralString"));
const decodeGraphicString_1 = tslib_1.__importDefault(require("../codecs/x690/decoders/decodeGraphicString"));
const decodeNumericString_1 = tslib_1.__importDefault(require("../codecs/x690/decoders/decodeNumericString"));
const decodeObjectDescriptor_1 = tslib_1.__importDefault(require("../codecs/x690/decoders/decodeObjectDescriptor"));
const decodePrintableString_1 = tslib_1.__importDefault(require("../codecs/x690/decoders/decodePrintableString"));
const decodeVisibleString_1 = tslib_1.__importDefault(require("../codecs/x690/decoders/decodeVisibleString"));
const decodeGeneralString_1 = tslib_1.__importDefault(require("../codecs/x690/decoders/decodeGeneralString"));
const encodeDuration_1 = tslib_1.__importDefault(require("../codecs/x690/encoders/encodeDuration"));
const decodeDuration_1 = tslib_1.__importDefault(require("../codecs/ber/decoders/decodeDuration"));
const macros_1 = require("../macros");
class BERElement extends x690_1.default {
    constructor(tagClass = values_1.ASN1TagClass.universal, construction = values_1.ASN1Construction.primitive, tagNumber = values_1.ASN1UniversalType.endOfContent, value = undefined) {
        super();
        this.encode(value);
        this.tagClass = tagClass;
        this.construction = construction;
        this.tagNumber = tagNumber;
    }
    set boolean(value) {
        this.value = encodeBoolean_1.default(value);
    }
    get boolean() {
        if (this.construction !== values_1.ASN1Construction.primitive) {
            throw new errors.ASN1ConstructionError("BOOLEAN cannot be constructed.", this);
        }
        return decodeBoolean_1.default(this.value);
    }
    set bitString(value) {
        this.value = encodeBitString_1.default(value);
    }
    get bitString() {
        if (this.construction === values_1.ASN1Construction.primitive) {
            return decodeBitString_1.default(this.value);
        }
        if ((this.recursionCount + 1) > BERElement.nestingRecursionLimit) {
            throw new errors.ASN1RecursionError();
        }
        let appendy = [];
        const substrings = this.sequence;
        substrings.slice(0, (substrings.length - 1)).forEach((substring) => {
            if (substring.construction === values_1.ASN1Construction.primitive
                && substring.value.length > 0
                && substring.value[0] !== 0x00) {
                throw new errors.ASN1Error("Only the last subelement of a constructed BIT STRING may have a non-zero first value byte.", this);
            }
        });
        substrings.forEach((substring) => {
            if (substring.tagClass !== this.tagClass) {
                throw new errors.ASN1ConstructionError("Invalid tag class in recursively-encoded BIT STRING.", this);
            }
            if (substring.tagNumber !== this.tagNumber) {
                throw new errors.ASN1ConstructionError("Invalid tag class in recursively-encoded BIT STRING.", this);
            }
            substring.recursionCount = (this.recursionCount + 1);
            appendy = appendy.concat(Array.from(substring.bitString).map((b) => b !== macros_1.FALSE_BIT));
        });
        return new Uint8ClampedArray(appendy.map((b) => (b ? 1 : 0)));
    }
    set octetString(value) {
        this.value = new Uint8Array(value);
    }
    get octetString() {
        return this.deconstruct("OCTET STRING");
    }
    set objectDescriptor(value) {
        this.value = encodeObjectDescriptor_1.default(value);
    }
    get objectDescriptor() {
        const bytes = this.deconstruct("ObjectDescriptor");
        return decodeObjectDescriptor_1.default(bytes);
    }
    set external(value) {
        this.value = encodeExternal_1.default(value);
    }
    get external() {
        return decodeExternal_1.default(this.value);
    }
    set real(value) {
        this.value = encodeReal_1.default(value);
    }
    get real() {
        if (this.construction !== values_1.ASN1Construction.primitive) {
            throw new errors.ASN1ConstructionError("REAL cannot be constructed.");
        }
        return decodeReal_1.default(this.value);
    }
    set embeddedPDV(value) {
        this.value = encodeEmbeddedPDV_1.default(value);
    }
    get embeddedPDV() {
        return decodeEmbeddedPDV_1.default(this.value);
    }
    set utf8String(value) {
        this.value = convertTextToBytes_1.default(value);
    }
    get utf8String() {
        return convertBytesToText_1.default(this.deconstruct("UTF8String"));
    }
    set sequence(value) {
        this.value = encodeSequence_1.default(value);
        this.construction = values_1.ASN1Construction.constructed;
    }
    get sequence() {
        if (this.construction !== values_1.ASN1Construction.constructed) {
            throw new errors.ASN1ConstructionError("SET or SEQUENCE cannot be primitively constructed.", this);
        }
        return decodeSequence_1.default(this.value);
    }
    set set(value) {
        this.sequence = value;
    }
    get set() {
        return this.sequence;
    }
    set numericString(value) {
        this.value = encodeNumericString_1.default(value);
    }
    get numericString() {
        const bytes = this.deconstruct("NumericString");
        return decodeNumericString_1.default(bytes);
    }
    set printableString(value) {
        this.value = encodePrintableString_1.default(value);
    }
    get printableString() {
        const bytes = this.deconstruct("PrintableString");
        return decodePrintableString_1.default(bytes);
    }
    set teletexString(value) {
        this.value = new Uint8Array(value);
    }
    get teletexString() {
        return this.deconstruct("TeletexString");
    }
    set videotexString(value) {
        this.value = new Uint8Array(value);
    }
    get videotexString() {
        return this.deconstruct("VideotexString");
    }
    set ia5String(value) {
        this.value = convertTextToBytes_1.default(value);
    }
    get ia5String() {
        return convertBytesToText_1.default(this.deconstruct("IA5String"));
    }
    set utcTime(value) {
        this.value = encodeUTCTime_1.default(value);
    }
    get utcTime() {
        return decodeUTCTime_1.default(this.deconstruct("UTCTime"));
    }
    set generalizedTime(value) {
        this.value = encodeGeneralizedTime_1.default(value);
    }
    get generalizedTime() {
        return decodeGeneralizedTime_1.default(this.deconstruct("GeneralizedTime"));
    }
    set graphicString(value) {
        this.value = encodeGraphicString_1.default(value);
    }
    get graphicString() {
        const bytes = this.deconstruct("GraphicString");
        return decodeGraphicString_1.default(bytes);
    }
    set visibleString(value) {
        this.value = encodeVisibleString_1.default(value);
    }
    get visibleString() {
        return decodeVisibleString_1.default(this.value);
    }
    set generalString(value) {
        this.value = encodeGeneralString_1.default(value);
    }
    get generalString() {
        const bytes = this.deconstruct("GeneralString");
        return decodeGeneralString_1.default(bytes);
    }
    set characterString(value) {
        this.value = encodeCharacterString_1.default(value);
    }
    get characterString() {
        return decodeCharacterString_1.default(this.value);
    }
    set universalString(value) {
        const buf = new Uint8Array(value.length << 2);
        for (let i = 0; i < value.length; i++) {
            buf[(i << 2)] = value.charCodeAt(i) >>> 24;
            buf[(i << 2) + 1] = value.charCodeAt(i) >>> 16;
            buf[(i << 2) + 2] = value.charCodeAt(i) >>> 8;
            buf[(i << 2) + 3] = value.charCodeAt(i);
        }
        this.value = buf;
    }
    get universalString() {
        const valueBytes = this.deconstruct("UniversalString");
        if (valueBytes.length % 4) {
            throw new errors.ASN1Error("UniversalString encoded on non-mulitple of four bytes.", this);
        }
        let ret = "";
        for (let i = 0; i < valueBytes.length; i += 4) {
            ret += String.fromCharCode((valueBytes[i + 0] << 24)
                + (valueBytes[i + 1] << 16)
                + (valueBytes[i + 2] << 8)
                + (valueBytes[i + 3] << 0));
        }
        return ret;
    }
    set bmpString(value) {
        const buf = new Uint8Array(value.length << 1);
        for (let i = 0, strLen = value.length; i < strLen; i++) {
            buf[(i << 1)] = value.charCodeAt(i) >>> 8;
            buf[(i << 1) + 1] = value.charCodeAt(i);
        }
        this.value = buf;
    }
    get bmpString() {
        const valueBytes = this.deconstruct("BMPString");
        if (valueBytes.length % 2)
            throw new errors.ASN1Error("BMPString encoded on non-mulitple of two bytes.", this);
        if (typeof TextEncoder !== "undefined") {
            return (new TextDecoder("utf-16be")).decode(valueBytes.buffer);
        }
        else if (typeof Buffer !== "undefined") {
            const swappedEndianness = new Uint8Array(valueBytes.length);
            for (let i = 0; i < valueBytes.length; i += 2) {
                swappedEndianness[i] = valueBytes[i + 1];
                swappedEndianness[i + 1] = valueBytes[i];
            }
            return (Buffer.from(swappedEndianness)).toString("utf16le");
        }
        else {
            throw new errors.ASN1Error("Neither TextDecoder nor Buffer are defined to decode bytes into text.", this);
        }
    }
    set duration(value) {
        this.value = encodeDuration_1.default(value);
    }
    get duration() {
        return decodeDuration_1.default(this.value);
    }
    encode(value) {
        switch (typeof value) {
            case ("undefined"): {
                this.value = new Uint8Array(0);
                break;
            }
            case ("boolean"): {
                this.tagNumber = values_1.ASN1UniversalType.boolean;
                this.boolean = value;
                break;
            }
            case ("number"): {
                if (Number.isInteger(value)) {
                    this.tagNumber = values_1.ASN1UniversalType.integer;
                    this.integer = value;
                }
                else {
                    this.tagNumber = values_1.ASN1UniversalType.realNumber;
                    this.real = value;
                }
                break;
            }
            case ("string"): {
                this.tagNumber = values_1.ASN1UniversalType.utf8String;
                this.utf8String = value;
                break;
            }
            case ("object"): {
                if (!value) {
                    this.tagNumber = values_1.ASN1UniversalType.nill;
                    this.value = new Uint8Array(0);
                }
                else if (value instanceof Uint8Array) {
                    this.tagNumber = values_1.ASN1UniversalType.octetString;
                    this.octetString = value;
                }
                else if (value instanceof Uint8ClampedArray) {
                    this.tagNumber = values_1.ASN1UniversalType.bitString;
                    this.bitString = value;
                }
                else if (value instanceof asn1_1.default) {
                    this.construction = values_1.ASN1Construction.constructed;
                    this.sequence = [value];
                }
                else if (value instanceof Set) {
                    this.construction = values_1.ASN1Construction.constructed;
                    this.set = Array.from(value).map((v) => {
                        if (typeof v === "object" && v instanceof asn1_1.default) {
                            return v;
                        }
                        else {
                            const e = new BERElement();
                            e.encode(v);
                            return e;
                        }
                    });
                }
                else if (value instanceof ObjectIdentifier_1.default) {
                    this.tagNumber = values_1.ASN1UniversalType.objectIdentifier;
                    this.objectIdentifier = value;
                }
                else if (Array.isArray(value)) {
                    this.construction = values_1.ASN1Construction.constructed;
                    this.tagNumber = values_1.ASN1UniversalType.sequence;
                    this.sequence = value.map((sub) => {
                        const ret = new BERElement();
                        ret.encode(sub);
                        return ret;
                    });
                }
                else if (value instanceof Date) {
                    this.generalizedTime = value;
                }
                else {
                    throw new errors.ASN1Error(`Cannot encode value of type ${value.constructor.name}.`, this);
                }
                break;
            }
            default: {
                throw new errors.ASN1Error(`Cannot encode value of type ${typeof value}.`, this);
            }
        }
    }
    static fromSequence(sequence) {
        const ret = new BERElement(values_1.ASN1TagClass.universal, values_1.ASN1Construction.constructed, values_1.ASN1UniversalType.sequence);
        ret.sequence = sequence.filter((element) => Boolean(element));
        return ret;
    }
    static fromSet(set) {
        const ret = new BERElement(values_1.ASN1TagClass.universal, values_1.ASN1Construction.constructed, values_1.ASN1UniversalType.set);
        ret.set = set.filter((element) => Boolean(element));
        return ret;
    }
    get inner() {
        if (this.construction !== values_1.ASN1Construction.constructed) {
            throw new errors.ASN1ConstructionError("An explicitly-encoded element cannot be encoded using "
                + "primitive construction.", this);
        }
        const ret = new BERElement();
        const readBytes = ret.fromBytes(this.value);
        if (readBytes !== this.value.length) {
            throw new errors.ASN1ConstructionError("An explicitly-encoding element contained more than one single "
                + "encoded element. The tag number of the first decoded "
                + `element was ${ret.tagNumber}, and it was encoded on `
                + `${readBytes} bytes.`, this);
        }
        return ret;
    }
    set inner(value) {
        this.construction = values_1.ASN1Construction.constructed;
        this.value = value.toBytes();
    }
    fromBytes(bytes) {
        if (bytes.length < 2) {
            throw new errors.ASN1TruncationError("Tried to decode a BER element that is less than two bytes.", this);
        }
        if ((this.recursionCount + 1) > BERElement.nestingRecursionLimit) {
            throw new errors.ASN1RecursionError();
        }
        let cursor = 0;
        switch (bytes[cursor] & 0b11000000) {
            case (0b00000000):
                this.tagClass = values_1.ASN1TagClass.universal;
                break;
            case (0b01000000):
                this.tagClass = values_1.ASN1TagClass.application;
                break;
            case (0b10000000):
                this.tagClass = values_1.ASN1TagClass.context;
                break;
            case (0b11000000):
                this.tagClass = values_1.ASN1TagClass.private;
                break;
            default: this.tagClass = values_1.ASN1TagClass.universal;
        }
        this.construction = ((bytes[cursor] & 0b00100000)
            ? values_1.ASN1Construction.constructed : values_1.ASN1Construction.primitive);
        this.tagNumber = (bytes[cursor] & 0b00011111);
        cursor++;
        if (this.tagNumber >= 31) {
            if (bytes[cursor] === 0b10000000) {
                throw new errors.ASN1PaddingError("Leading padding byte on long tag number encoding.", this);
            }
            this.tagNumber = 0;
            const limit = (((bytes.length - 1) >= 4) ? 4 : (bytes.length - 1));
            while (cursor < limit) {
                if (!(bytes[cursor++] & 0b10000000))
                    break;
            }
            if (bytes[cursor - 1] & 0b10000000) {
                if (limit === (bytes.length - 1)) {
                    throw new errors.ASN1TruncationError("ASN.1 tag number appears to have been truncated.", this);
                }
                else {
                    throw new errors.ASN1OverflowError("ASN.1 tag number too large.", this);
                }
            }
            for (let i = 1; i < cursor; i++) {
                this.tagNumber <<= 7;
                this.tagNumber |= (bytes[i] & 0x7F);
            }
        }
        if ((bytes[cursor] & 0b10000000) === 0b10000000) {
            const numberOfLengthOctets = (bytes[cursor] & 0x7F);
            if (numberOfLengthOctets) {
                if (numberOfLengthOctets === 0b01111111) {
                    throw new errors.ASN1UndefinedError("Length byte with undefined meaning encountered.", this);
                }
                if (numberOfLengthOctets > 4) {
                    throw new errors.ASN1OverflowError("Element length too long to decode to an integer.", this);
                }
                if (cursor + numberOfLengthOctets >= bytes.length) {
                    throw new errors.ASN1TruncationError("Element length bytes appear to have been truncated.", this);
                }
                cursor++;
                const lengthNumberOctets = new Uint8Array(4);
                for (let i = numberOfLengthOctets; i > 0; i--) {
                    lengthNumberOctets[(4 - i)] = bytes[(cursor + numberOfLengthOctets - i)];
                }
                let length = 0;
                lengthNumberOctets.forEach((octet) => {
                    length <<= 8;
                    length += octet;
                });
                if ((cursor + length) < cursor) {
                    throw new errors.ASN1OverflowError("ASN.1 element too large.", this);
                }
                cursor += (numberOfLengthOctets);
                if ((cursor + length) > bytes.length) {
                    throw new errors.ASN1TruncationError("ASN.1 element truncated.", this);
                }
                this.value = bytes.slice(cursor, (cursor + length));
                return (cursor + length);
            }
            else {
                if (this.construction !== values_1.ASN1Construction.constructed) {
                    throw new errors.ASN1ConstructionError("Indefinite length ASN.1 element was not of constructed construction.", this);
                }
                const startOfValue = ++cursor;
                let sentinel = cursor;
                while (sentinel < bytes.length) {
                    const child = new BERElement();
                    child.recursionCount = (this.recursionCount + 1);
                    sentinel += child.fromBytes(bytes.slice(sentinel));
                    if (child.tagClass === values_1.ASN1TagClass.universal
                        && child.construction === values_1.ASN1Construction.primitive
                        && child.tagNumber === values_1.ASN1UniversalType.endOfContent
                        && child.value.length === 0)
                        break;
                }
                if (sentinel === bytes.length && (bytes[sentinel - 1] !== 0x00 || bytes[sentinel - 2] !== 0x00)) {
                    throw new errors.ASN1TruncationError("No END OF CONTENT element found at the end of indefinite length ASN.1 element.", this);
                }
                this.value = bytes.slice(startOfValue, (sentinel - 2));
                return sentinel;
            }
        }
        else {
            const length = (bytes[cursor++] & 0x7F);
            if ((cursor + length) > bytes.length) {
                throw new errors.ASN1TruncationError("ASN.1 element was truncated.", this);
            }
            this.value = bytes.slice(cursor, (cursor + length));
            return (cursor + length);
        }
    }
    toBytes() {
        let tagBytes = [0x00];
        tagBytes[0] |= (this.tagClass << 6);
        tagBytes[0] |= (this.construction << 5);
        if (this.tagNumber < 31) {
            tagBytes[0] |= this.tagNumber;
        }
        else {
            tagBytes[0] |= 0b00011111;
            let number = this.tagNumber;
            const encodedNumber = [];
            while (number !== 0) {
                encodedNumber.unshift(number & 0x7F);
                number >>>= 7;
                encodedNumber[0] |= 0b10000000;
            }
            encodedNumber[encodedNumber.length - 1] &= 0b01111111;
            tagBytes = tagBytes.concat(encodedNumber);
        }
        let lengthOctets = [0x00];
        switch (BERElement.lengthEncodingPreference) {
            case (values_1.LengthEncodingPreference.definite): {
                if (this.value.length < 127) {
                    lengthOctets[0] = this.value.length;
                }
                else {
                    const length = this.value.length;
                    lengthOctets = [0, 0, 0, 0];
                    for (let i = 0; i < 4; i++) {
                        lengthOctets[i] = ((length >>> ((3 - i) << 3)) & 0xFF);
                    }
                    let startOfNonPadding = 0;
                    for (let i = 0; i < (lengthOctets.length - 1); i++) {
                        if (lengthOctets[i] === 0x00)
                            startOfNonPadding++;
                    }
                    lengthOctets = lengthOctets.slice(startOfNonPadding);
                    lengthOctets.unshift(0b10000000 | lengthOctets.length);
                }
                break;
            }
            case (values_1.LengthEncodingPreference.indefinite): {
                lengthOctets = [0b10000000];
                break;
            }
            default:
                throw new errors.ASN1UndefinedError("Invalid LengthEncodingPreference encountered!", this);
        }
        const ret = new Uint8Array(tagBytes.length
            + lengthOctets.length
            + this.value.length
            + (BERElement.lengthEncodingPreference === values_1.LengthEncodingPreference.indefinite ? 2 : 0));
        ret.set(tagBytes, 0);
        ret.set(lengthOctets, tagBytes.length);
        ret.set(this.value, (tagBytes.length + lengthOctets.length));
        return ret;
    }
    deconstruct(dataType) {
        if (this.construction === values_1.ASN1Construction.primitive) {
            return new Uint8Array(this.value);
        }
        else {
            if ((this.recursionCount + 1) > BERElement.nestingRecursionLimit)
                throw new errors.ASN1RecursionError();
            let appendy = [];
            const substrings = this.sequence;
            substrings.forEach((substring) => {
                if (substring.tagClass !== this.tagClass) {
                    throw new errors.ASN1ConstructionError(`Invalid tag class in recursively-encoded ${dataType}.`, this);
                }
                if (substring.tagNumber !== this.tagNumber) {
                    throw new errors.ASN1ConstructionError(`Invalid tag class in recursively-encoded ${dataType}.`, this);
                }
                substring.recursionCount = (this.recursionCount + 1);
                appendy = appendy.concat(substring.deconstruct(dataType));
            });
            let totalLength = 0;
            appendy.forEach((substring) => {
                totalLength += substring.length;
            });
            const whole = new Uint8Array(totalLength);
            let currentIndex = 0;
            appendy.forEach((substring) => {
                whole.set(substring, currentIndex);
                currentIndex += substring.length;
            });
            return whole;
        }
    }
}
exports.default = BERElement;
BERElement.lengthEncodingPreference = values_1.LengthEncodingPreference.definite;
//# sourceMappingURL=ber.js.map