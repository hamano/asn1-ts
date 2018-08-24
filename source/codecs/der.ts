import { ASN1Element } from "../asn1";
import { ASN1TagClass,ASN1UniversalType,ASN1Construction,ASN1SpecialRealValue,LengthEncodingPreference,MAX_SINT_32,MIN_SINT_32,printableStringCharacters } from "../values";
import { ObjectIdentifier as OID } from "../types/objectidentifier";
import * as errors from "../errors";

export
class DERElement extends ASN1Element {

    set boolean (value : boolean) {
        this.value = new Uint8Array(1);
        this.value[0] = (value ? 0xFF : 0x00);
    }

    get boolean () : boolean {
        if (this.construction !== ASN1Construction.primitive)
            throw new errors.ASN1ConstructionError("BOOLEAN cannot be constructed.");
        if (this.value.length !== 1)
            throw new errors.ASN1SizeError("BOOLEAN not one byte");
        if ((this.value[0] !== 0x00) && (this.value[0] !== 0xFF))
            throw new errors.ASN1Error("BOOLEAN must be encoded as 0xFF or 0x00.");
        return (this.value[0] !== 0);
    }

    /**
     * This only accepts integers between MIN_SINT_32 and MAX_SINT_32 because
     * JavaScript's bitshift operators treat all integers as though they were
     * 32-bit integers, even though they are stored in the 53 mantissa bits of
     * an IEEE double-precision floating point number. Accepting larger or
     * smaller numbers would rule out the use of a critical arithmetic operator
     * when lower-level binary operations are not available, as is the case in
     * JavaScript.
     */
    set integer (value : number) {
        if (value < MIN_SINT_32)
            throw new errors.ASN1OverflowError(`Number ${value} too small to be converted.`);
        if (value > MAX_SINT_32)
            throw new errors.ASN1OverflowError(`Number ${value} too big to be converted.`);

        if (value <= 127 && value >= -128) {
            this.value = new Uint8Array([
                (value & 255)
            ]);
            return;
        } else if (value <= 32767 && value >= -32768) {
            this.value = new Uint8Array([
                (value >> 8 & 255),
                (value & 255)
            ]);
            return;
        } else if (value <= 8388607 && value >= -8388608) {
            this.value = new Uint8Array([
                ((value >> 16) & 255),
                (value >> 8 & 255),
                (value & 255)
            ]);
            return;
        } else {
            this.value = new Uint8Array([
                ((value >> 24) & 255),
                ((value >> 16) & 255),
                (value >> 8 & 255),
                (value & 255)
            ]);
            return;
        }
    }

    get integer () : number {
        if (this.construction !== ASN1Construction.primitive)
            throw new errors.ASN1ConstructionError("INTEGER cannot be constructed.");
        if (this.value.length === 0)
            throw new errors.ASN1SizeError("Number encoded on zero bytes!");
        if (this.value.length > 4)
            throw new errors.ASN1OverflowError("Number too long to decode.");
        if (
            this.value.length > 2 &&
            (
                (this.value[0] === 0xFF && this.value[1] >= 0b10000000) ||
                (this.value[0] === 0x00 && this.value[1] < 0b10000000)
            )
        )
            throw new errors.ASN1PaddingError("Unnecessary padding bytes on INTEGER or ENUMERATED.");
        let ret : number = (this.value[0] >= 128 ? Number.MAX_SAFE_INTEGER : 0);
        this.value.forEach(byte => {
            ret <<= 8;
            ret += byte;
        });
        return ret;
    }

    set bitString (value : boolean[]) {
        if (value.length === 0)
            this.value = new Uint8Array(0);
        let pre : number[] = [];
        pre.length = ((value.length >>> 3) + ((value.length % 8) ? 1 : 0)) + 1;
        for (let i = 0; i < value.length; i++) {
            if (value[i] === false) continue;
            pre[((i >>> 3) + 1)] |= (0b10000000 >>> (i % 8));
        }
        pre[0] = (8 - (value.length % 8));
        if (pre[0] === 8) pre[0] = 0;
        this.value = new Uint8Array(pre);
    }

    get bitString () : boolean[] {
        if (this.construction !== ASN1Construction.primitive)
            throw new errors.ASN1ConstructionError("BIT STRING cannot be constructed.");
        if (this.value.length === 0)
            throw new errors.ASN1Error("ASN.1 BIT STRING cannot be encoded on zero bytes!");
        if (this.value.length === 1 && this.value[0] !== 0)
            throw new errors.ASN1Error("ASN.1 BIT STRING encoded with deceptive first byte!");
        if (this.value[0] > 7)
            throw new errors.ASN1Error("First byte of an ASN.1 BIT STRING must be <= 7!");

        let ret : boolean[] = [];
        for (let i = 1; i < this.value.length; i++) {
            ret = ret.concat([
                (this.value[i] & 0b10000000 ? true : false),
                (this.value[i] & 0b01000000 ? true : false),
                (this.value[i] & 0b00100000 ? true : false),
                (this.value[i] & 0b00010000 ? true : false),
                (this.value[i] & 0b00001000 ? true : false),
                (this.value[i] & 0b00000100 ? true : false),
                (this.value[i] & 0b00000010 ? true : false),
                (this.value[i] & 0b00000001 ? true : false)
            ]);
        }
        ret.slice((ret.length - this.value[0])).forEach(bit => {
            if (bit) throw new errors.ASN1Error("BIT STRING had a trailing set bit.");
        });
        ret.length -= this.value[0];
        return ret;
    }

    set octetString (value : Uint8Array) {
        this.value = value.subarray(0); // Clones it.
    }

    get octetString () : Uint8Array {
        if (this.construction !== ASN1Construction.primitive)
            throw new errors.ASN1ConstructionError("OCTET STRING cannot be constructed.");
        return this.value.subarray(0);
    }

    set objectIdentifier (value : OID) {
        const numbers : number[] = value.nodes;
        let pre : number[] = [ ((numbers[0] * 40) + numbers[1]) ];
        let post : number[] = DERElement.encodeObjectIdentifierNodes(numbers.slice(2));
        this.value = new Uint8Array(pre.concat(post));
    }

    get objectIdentifier () : OID {
        if (this.construction !== ASN1Construction.primitive)
            throw new errors.ASN1ConstructionError
            ("Construction cannot be constructed for an OBJECT IDENTIFIER!");

        if (this.value.length === 0)
            throw new errors.ASN1TruncationError
            ("Encoded value was too short to be an OBJECT IDENTIFIER!");

        let numbers : number[] = [ 0, 0 ];
        if (this.value[0] >= 0x50) {
            numbers[0] = 2;
            numbers[1] = (this.value[0] - 0x50);
        } else if (this.value[0] >= 0x28) {
            numbers[0] = 1;
            numbers[1] = (this.value[0] - 0x28);
        } else {
            numbers[0] = 0;
            numbers[1] = this.value[0];
        }

        if (this.value.length === 1)
            return new OID(numbers);

        numbers = numbers.concat(DERElement.decodeObjectIdentifierNodes(this.value.slice(1)));
        return new OID(numbers);
    }

    set objectDescriptor (value : string) {
        this.graphicString = value;
    }

    get objectDescriptor () : string {
        return this.graphicString;
    }

    // Only encodes with two digits of precision.
    set real (value : number) {
        if (value === 0.0) {
            this.value = new Uint8Array(0);
        } else if (isNaN(value)) {
            this.value = new Uint8Array([ ASN1SpecialRealValue.notANumber ]);
        } else if (value === -0.0) {
            this.value = new Uint8Array([ ASN1SpecialRealValue.minusZero ]);
        } else if (value === Infinity) {
            this.value = new Uint8Array([ ASN1SpecialRealValue.plusInfinity ]);
        } else if (value === -Infinity) {
            this.value = new Uint8Array([ ASN1SpecialRealValue.minusInfinity ]);
        }
        let valueString : string = value.toFixed(7);
        valueString = (String.fromCharCode(0b00000011) + valueString);
        this.value = (new TextEncoder()).encode(valueString);
    }

    get real () : number {
        if (this.construction !== ASN1Construction.primitive)
            throw new errors.ASN1ConstructionError("REAL cannot be constructed.");
        if (this.value.length === 0) return 0.0;
        switch (this.value[0] & 0b11000000) {
            case (0b01000000): {
                if (this.value[0] === ASN1SpecialRealValue.notANumber) return NaN;
                if (this.value[0] === ASN1SpecialRealValue.minusZero) return -0.0;
                if (this.value[0] === ASN1SpecialRealValue.plusInfinity) return Infinity;
                if (this.value[0] === ASN1SpecialRealValue.minusInfinity) return -Infinity;
                throw new errors.ASN1UndefinedError("Unrecognized special REAL value!");
            }
            case (0b00000000): {
                return parseFloat((new TextDecoder()).decode(this.value.slice(1)));
            }
            case (0b10000000):
            case (0b11000000): {
                throw new errors.ASN1NotImplementedError();
            }
        }
    }

    set enumerated (value : number) {
        this.integer = value;
    }

    get enumerated () : number {
        return this.integer;
    }

    set utf8String (value : string) {
        if (typeof TextEncoder !== "undefined") { // Browser JavaScript
            this.value = (new TextEncoder()).encode(value);
        } else if (typeof Buffer !== "undefined") { // NodeJS
            this.value = Buffer.from(value, "utf-8");
        }
    }

    get utf8String () : string {
        if (this.construction !== ASN1Construction.primitive)
            throw new errors.ASN1ConstructionError("UTF8String cannot be constructed.");
        let ret : string = "";
        if (typeof TextEncoder !== "undefined") { // Browser JavaScript
            ret = (new TextDecoder("utf-8")).decode(this.value.subarray(0).buffer);
        } else if (typeof Buffer !== "undefined") { // NodeJS
            ret = (new Buffer(this.value)).toString("utf-8");
        }
        return ret;
    }

    set relativeObjectIdentifier (value : number[]) {
        this.value = new Uint8Array(DERElement.encodeObjectIdentifierNodes(value));
    }

    get relativeObjectIdentifier () : number[] {
        if (this.construction !== ASN1Construction.primitive)
            throw new errors.ASN1ConstructionError("Relative OID cannot be constructed.");
        return DERElement.decodeObjectIdentifierNodes(this.value.slice(0));
    }

    set sequence (value : DERElement[]) {
        let encodedElements : Uint8Array[] = [];
        value.forEach(element => {
            encodedElements.push(element.toBytes());
        });
        let totalLength : number = 0;
        encodedElements.forEach(element => {
            totalLength += element.length;
        });
        const newValue = new Uint8Array(totalLength);
        let currentIndex : number = 0;
        encodedElements.forEach(element => {
            newValue.set(element, currentIndex);
            currentIndex += element.length;
        });
        this.value = newValue;
        this.construction = ASN1Construction.constructed;
    }

    get sequence () : DERElement[] {
        if (this.construction !== ASN1Construction.constructed)
            throw new errors.ASN1ConstructionError("SET or SEQUENCE cannot be primitively constructed.");
        let encodedElements : DERElement[] = [];
        if (this.value.length === 0) return [];
        let i : number = 0;
        while (i < this.value.length) {
            const next : DERElement = new DERElement();
            i += next.fromBytes(this.value.slice(i));
            encodedElements.push(next);
        }
        return encodedElements;
    }

    set set (value : DERElement[]) {
        this.sequence = value;
    }

    get set () : DERElement[] {
        return this.sequence;
    }

    set numericString (value : string) {
        for (let i : number = 0; i < value.length; i++) {
            const characterCode : number = value.charCodeAt(i);
            if (!((characterCode >= 0x30 && characterCode <= 0x39) || characterCode === 0x20)) {
                throw new errors.ASN1CharactersError
                ("NumericString can only contain characters 0 - 9 and space.");
            }
        }

        if (typeof TextEncoder !== "undefined") { // Browser JavaScript
            this.value = (new TextEncoder()).encode(value);
        } else if (typeof Buffer !== "undefined") { // NodeJS
            this.value = Buffer.from(value, "utf-8");
        }
    }

    get numericString () : string {
        if (this.construction !== ASN1Construction.primitive)
            throw new errors.ASN1ConstructionError("NumericString cannot be constructed.");
        let ret : string = "";
        if (typeof TextEncoder !== "undefined") { // Browser JavaScript
            ret = (new TextDecoder("utf-8")).decode(this.value.subarray(0).buffer);
        } else if (typeof Buffer !== "undefined") { // NodeJS
            ret = (new Buffer(this.value)).toString("utf-8");
        }
        for (let i : number = 0; i < ret.length; i++) {
            const characterCode : number = ret.charCodeAt(i);
            if (!((characterCode >= 0x30 && characterCode <= 0x39) || characterCode === 0x20)) {
                throw new errors.ASN1CharactersError
                ("NumericString can only contain characters 0 - 9 and space.");
            }
        }
        return ret;
    }

    set printableString (value : string) {
        for (let i : number = 0; i < value.length; i++) {
            if (printableStringCharacters.indexOf(value.charAt(i)) === -1) {
                throw new errors.ASN1CharactersError
                (`PrintableString can only contain these characters: ${printableStringCharacters}`);
            }
        }

        if (typeof TextEncoder !== "undefined") { // Browser JavaScript
            this.value = (new TextEncoder()).encode(value);
        } else if (typeof Buffer !== "undefined") { // NodeJS
            this.value = Buffer.from(value, "utf-8");
        }
    }

    get printableString () : string {
        if (this.construction !== ASN1Construction.primitive)
            throw new errors.ASN1ConstructionError("PrintableString cannot be constructed.");
        let ret : string = "";
        if (typeof TextEncoder !== "undefined") { // Browser JavaScript
            ret = (new TextDecoder("utf-8")).decode(this.value.subarray(0).buffer); // REVIEW: Is the subarray(0) necessary?
        } else if (typeof Buffer !== "undefined") { // NodeJS
            ret = (new Buffer(this.value)).toString("utf-8");
        }
        for (let i : number = 0; i < ret.length; i++) {
            if (printableStringCharacters.indexOf(ret.charAt(i)) === -1) {
                throw new errors.ASN1CharactersError
                (`PrintableString can only contain these characters: ${printableStringCharacters}`);
            }
        }
        return ret;
    }

    set teletexString (value : Uint8Array) {
        this.value = value.subarray(0); // Clones it.
    }

    get teletexString () : Uint8Array {
        return this.octetString;
    }

    set videotexString (value : Uint8Array) {
        this.value = value.subarray(0); // Clones it.
    }

    get videotexString () : Uint8Array {
        return this.octetString;
    }

    set ia5String (value : string) {
        if (typeof TextEncoder !== "undefined") { // Browser JavaScript
            this.value = (new TextEncoder()).encode(value);
        } else if (typeof Buffer !== "undefined") { // NodeJS
            this.value = Buffer.from(value, "utf-8");
        }
    }

    get ia5String () : string {
        if (this.construction !== ASN1Construction.primitive)
            throw new errors.ASN1ConstructionError("IA5String cannot be constructed.");
        let ret : string = "";
        if (typeof TextEncoder !== "undefined") { // Browser JavaScript
            ret = (new TextDecoder("utf-8")).decode(this.value.subarray(0).buffer);
        } else if (typeof Buffer !== "undefined") { // NodeJS
            ret = (new Buffer(this.value)).toString("utf-8");
        }
        return ret;
    }

    set utcTime (value : Date) {
        let year : string = value.getUTCFullYear().toString();
        year = (year.substring(year.length - 2, year.length)); // Will fail if you supply a <2 digit date.
        const month : string = (value.getUTCMonth() < 9 ? `0${value.getUTCMonth() + 1}` : `${value.getUTCMonth() + 1}`);
        const day : string = (value.getUTCDate() < 10 ? `0${value.getUTCDate()}` : `${value.getUTCDate()}`);
        const hour : string = (value.getUTCHours() < 10 ? `0${value.getUTCHours()}` : `${value.getUTCHours()}`);
        const minute : string = (value.getUTCMinutes() < 10 ? `0${value.getUTCMinutes()}` : `${value.getUTCMinutes()}`);
        const second : string = (value.getUTCSeconds() < 10 ? `0${value.getUTCSeconds()}` : `${value.getUTCSeconds()}`);
        const utcString = `${year}${month}${day}${hour}${minute}${second}Z`;
        if (typeof TextEncoder !== "undefined") { // Browser JavaScript
            this.value = (new TextEncoder()).encode(utcString);
        } else if (typeof Buffer !== "undefined") { // NodeJS
            this.value = Buffer.from(utcString, "utf-8");
        }
    }

    get utcTime () : Date {
        if (this.construction !== ASN1Construction.primitive)
            throw new errors.ASN1ConstructionError("UTCTime cannot be constructed.");
        let dateString : string = "";
        if (typeof TextEncoder !== "undefined") { // Browser JavaScript
            dateString = (new TextDecoder("utf-8")).decode(this.value.subarray(0).buffer);
        } else if (typeof Buffer !== "undefined") { // NodeJS
            dateString = (new Buffer(this.value)).toString("utf-8");
        }
        if (dateString.length !== 13 || !(/\d{12}Z/.test(dateString)))
            throw new errors.ASN1Error("Malformed UTCTime string.");
        const ret : Date = new Date();
        let year : number = Number(dateString.substring(0, 2));
        year = (year < 70 ? (2000 + year) : (1900 + year));
        const month : number = (Number(dateString.substring(2, 4)) - 1);
        const date : number = Number(dateString.substring(4, 6));
        const hours : number = Number(dateString.substring(6, 8));
        const minutes : number = Number(dateString.substring(8, 10));
        const seconds : number = Number(dateString.substring(10, 12));
        DERElement.validateDateTime("UTCTime", year, month, date, hours, minutes, seconds);
        ret.setUTCFullYear(year);
        ret.setUTCMonth(month);
        ret.setUTCDate(date);
        ret.setUTCHours(hours);
        ret.setUTCMinutes(minutes);
        ret.setUTCSeconds(seconds);
        return ret;
    }

    set generalizedTime (value : Date) {
        const year : string = value.getUTCFullYear().toString();
        const month : string = (value.getUTCMonth() < 9 ? `0${value.getUTCMonth() + 1}` : `${value.getUTCMonth() + 1}`);
        const day : string = (value.getUTCDate() < 10 ? `0${value.getUTCDate()}` : `${value.getUTCDate()}`);
        const hour : string = (value.getUTCHours() < 10 ? `0${value.getUTCHours()}` : `${value.getUTCHours()}`);
        const minute : string = (value.getUTCMinutes() < 10 ? `0${value.getUTCMinutes()}` : `${value.getUTCMinutes()}`);
        const second : string = (value.getUTCSeconds() < 10 ? `0${value.getUTCSeconds()}` : `${value.getUTCSeconds()}`);
        const timeString = `${year}${month}${day}${hour}${minute}${second}Z`;
        if (typeof TextEncoder !== "undefined") { // Browser JavaScript
            this.value = (new TextEncoder()).encode(timeString);
        } else if (typeof Buffer !== "undefined") { // NodeJS
            this.value = Buffer.from(timeString, "utf-8");
        }
    }

    get generalizedTime () : Date {
        if (this.construction !== ASN1Construction.primitive)
            throw new errors.ASN1ConstructionError("GeneralizedTime cannot be constructed.");
        let dateString : string = "";
        if (typeof TextEncoder !== "undefined") { // Browser JavaScript
            dateString = (new TextDecoder("utf-8")).decode(this.value.subarray(0).buffer);
        } else if (typeof Buffer !== "undefined") { // NodeJS
            dateString = (new Buffer(this.value)).toString("utf-8");
        }
        if (dateString.length < 13 || !(/\d{14}(?:\.\d*[1-9])?Z/.test(dateString)))
            throw new errors.ASN1Error("Malformed GeneralizedTime string.");
        const ret : Date = new Date();
        const year : number = Number(dateString.substring(0, 4));
        const month : number = (Number(dateString.substring(4, 6)) - 1);
        const date : number = Number(dateString.substring(6, 8));
        const hours : number = Number(dateString.substring(8, 10));
        const minutes : number = Number(dateString.substring(10, 12));
        const seconds : number = Number(dateString.substring(12, 14));
        DERElement.validateDateTime("GeneralizedTime", year, month, date, hours, minutes, seconds);
        ret.setUTCFullYear(year);
        ret.setUTCMonth(month);
        ret.setUTCDate(date);
        ret.setUTCHours(hours);
        ret.setUTCMinutes(minutes);
        ret.setUTCSeconds(seconds);
        return ret;
    }

    set graphicString (value : string) {
        for (let i : number = 0; i < value.length; i++) {
            const characterCode : number = value.charCodeAt(i);
            if (characterCode < 0x20 || characterCode > 0x7E)
                throw new errors.ASN1CharactersError
                (
                    "GraphicString, VisibleString, or ObjectDescriptor " +
                    "can only contain characters between 0x20 and 0x7E."
                );
        }

        if (typeof TextEncoder !== "undefined") { // Browser JavaScript
            this.value = (new TextEncoder()).encode(value);
        } else if (typeof Buffer !== "undefined") { // NodeJS
            this.value = Buffer.from(value, "utf-8");
        }
    }

    get graphicString () : string {
        if (this.construction !== ASN1Construction.primitive)
            throw new errors.ASN1ConstructionError("GraphicString cannot be constructed.");
        let ret : string = "";
        if (typeof TextEncoder !== "undefined") { // Browser JavaScript
            ret = (new TextDecoder("utf-8")).decode(this.value.subarray(0).buffer);
        } else if (typeof Buffer !== "undefined") { // NodeJS
            ret = (new Buffer(this.value)).toString("utf-8");
        }
        for (let i : number = 0; i < ret.length; i++) {
            const characterCode : number = ret.charCodeAt(i);
            if (characterCode < 0x20 || characterCode > 0x7E) {
                throw new errors.ASN1CharactersError
                (
                    "GraphicString, VisibleString, or ObjectDescriptor " +
                    "can only contain characters between 0x20 and 0x7E."
                );
            }
        }
        return ret;
    }

    set visibleString (value : string) {
        this.graphicString = value;
    }

    get visibleString () : string {
        return this.graphicString;
    }

    set generalString (value : string) {
        for (let i : number = 0; i < value.length; i++) {
            if (value.charCodeAt(i) > 0x7F)
                throw new errors.ASN1CharactersError
                ("GeneralString can only contain ASCII characters.");
        }
        if (typeof TextEncoder !== "undefined") { // Browser JavaScript
            this.value = (new TextEncoder()).encode(value);
        } else if (typeof Buffer !== "undefined") { // NodeJS
            this.value = Buffer.from(value, "ascii");
        }
    }

    get generalString () : string {
        if (this.construction !== ASN1Construction.primitive)
            throw new errors.ASN1ConstructionError("GeneralString cannot be constructed.");
        let ret : string = "";
        if (typeof TextEncoder !== "undefined") { // Browser JavaScript
            ret = (new TextDecoder("windows-1252")).decode(this.value.subarray(0).buffer);
        } else if (typeof Buffer !== "undefined") { // NodeJS
            ret = (new Buffer(this.value)).toString("ascii");
        }
        for (let i : number = 0; i < ret.length; i++) {
            if (ret.charCodeAt(i) > 0x7F)
                throw new errors.ASN1CharactersError
                ("GeneralString can only contain ASCII characters.");
        }
        return ret;
    }

    set universalString (value : string) {
        const buf : Uint8Array = new Uint8Array(value.length << 2);
        for (let i : number = 0; i < value.length; i++) {
            buf[(i << 2)]      = value.charCodeAt(i) >>> 24;
            buf[(i << 2) + 1]  = value.charCodeAt(i) >>> 16;
            buf[(i << 2) + 2]  = value.charCodeAt(i) >>> 8;
            buf[(i << 2) + 3]  = value.charCodeAt(i);
        }
        this.value = buf;
    }

    /** NOTE:
     * This might not decode anything above 0xFFFF, because JavaScript
     * natively uses either UCS-2 or UTF-16. If it uses UTF-16 (which
     * most do), it might work, but UCS-2 will definitely not work.
     */
    get universalString () : string {
        if (this.construction !== ASN1Construction.primitive)
            throw new errors.ASN1ConstructionError("UniversalString cannot be constructed.");
        if (this.value.length % 4)
            throw new errors.ASN1Error
            ("UniversalString encoded on non-mulitple of four bytes.");
        let ret : string = "";
        for (let i : number = 0; i < this.value.length; i += 4) {
            ret += String.fromCharCode(
                (this.value[i + 0] << 24) +
                (this.value[i + 1] << 16) +
                (this.value[i + 2] << 8)  +
                (this.value[i + 3] << 0)
            );
        }
        return ret;
    }

    set bmpString (value : string) {
        const buf : Uint8Array = new Uint8Array(value.length << 1);
        for (let i : number = 0, strLen : number = value.length; i < strLen; i++) {
            buf[(i << 1)]      = value.charCodeAt(i) >>> 8;
            buf[(i << 1) + 1]  = value.charCodeAt(i);
        }
        this.value = buf;
    }

    get bmpString () : string {
        if (this.construction !== ASN1Construction.primitive)
            throw new errors.ASN1ConstructionError("BMPString cannot be constructed.");
        if (this.value.length % 2)
            throw new errors.ASN1Error
            ("BMPString encoded on non-mulitple of two bytes.");
        let ret : string = "";
        if (typeof TextEncoder !== "undefined") { // Browser JavaScript
            ret = (new TextDecoder("utf-16be")).decode(this.value.subarray(0).buffer);
        } else if (typeof Buffer !== "undefined") { // NodeJS
            const swappedEndianness : Uint8Array = new Uint8Array(this.value.length);
            for (let i : number = 0; i < this.value.length; i += 2) {
                swappedEndianness[i] = this.value[i + 1];
                swappedEndianness[i + 1] = this.value[i];
            }
            /** REVIEW:
             * Since NodeJS does not have a UTF-16-BE decoder, can we swap
             * every pair of bytes to make it little-endian, then decode
             * using NodeJS's utf-16-le decoder?
             */
            ret = (new Buffer(swappedEndianness)).toString("utf-16le");
        }
        return ret;
    }

    constructor
    (
        tagClass : ASN1TagClass = ASN1TagClass.universal,
        construction : ASN1Construction = ASN1Construction.primitive,
        tagNumber : number = 0
    )
    {
        super();
        this.tagClass = tagClass;
        this.construction = construction;
        this.tagNumber = tagNumber;
        this.value = new Uint8Array(0);
    }

    // Returns the number of bytes read
    public fromBytes (bytes : Uint8Array) : number {
        if (bytes.length < 2)
            throw new errors.ASN1TruncationError
            ("Tried to decode a DER element that is less than two bytes.");
        if ((this.recursionCount + 1) > DERElement.nestingRecursionLimit)
            throw new errors.ASN1RecursionError();
        let cursor : number = 0;
        switch (bytes[cursor] & 0b11000000) {
            case (0b00000000): this.tagClass = ASN1TagClass.universal; break;
            case (0b01000000): this.tagClass = ASN1TagClass.application; break;
            case (0b10000000): this.tagClass = ASN1TagClass.context; break;
            case (0b11000000): this.tagClass = ASN1TagClass.private; break;
            default: this.tagClass = ASN1TagClass.universal;
        }
        this.construction = ((bytes[cursor] & 0b00100000) ?
            ASN1Construction.constructed : ASN1Construction.primitive);
        this.tagNumber = (bytes[cursor] & 0b00011111);
        cursor++;
        if (this.tagNumber >= 31) {
            /* NOTE:
                Section 8.1.2.4.2, point C of the International
                Telecommunications Union's X.690 specification says:
                "bits 7 to 1 of the first subsequent octet shall not all be zero."
                in reference to the bytes used to encode the tag number in long
                form, which happens when the least significant five bits of the
                first byte are all set.
                This essentially means that the long-form tag number must be
                encoded on the fewest possible octets. If the first byte is
                0b10000000, then it is not encoded on the fewest possible octets.
            */
            if (bytes[cursor] === 0b10000000)
                throw new errors.ASN1PaddingError
                ("Leading padding byte on long tag number encoding.");
            this.tagNumber = 0;
            // This loop looks for the end of the encoded tag number.
            const limit : number = (((bytes.length - 1) >= 4) ? 4 : (bytes.length - 1));
            while (cursor < limit) {
                if (!(bytes[cursor++] & 0b10000000)) break;
            }
            if (bytes[cursor-1] & 0b10000000) {
                if (limit === bytes.length-1) {
                    throw new errors.ASN1TruncationError
                    ("ASN.1 tag number appears to have been truncated.");
                } else
                    throw new errors.ASN1OverflowError("ASN.1 tag number too large.");
            }
            for (let i : number = 1; i < cursor; i++) {
                this.tagNumber <<= 7;
                this.tagNumber |= (bytes[i] & 0x7F);
            }
            if (this.tagNumber <= 31)
                throw new errors.ASN1Error("ASN.1 tag number could have been encoded in short form.");
        }

        // Length
        if ((bytes[cursor] & 0b10000000) === 0b10000000) {
            const numberOfLengthOctets : number = (bytes[cursor] & 0x7F);
            if (numberOfLengthOctets === 0b01111111) // Reserved
                throw new errors.ASN1UndefinedError
                ("Length byte with undefined meaning encountered.");
            // Definite Long, if it has made it this far
            if (numberOfLengthOctets > 4)
                throw new errors.ASN1OverflowError
                ("Element length too long to decode to an integer.");
            if (cursor + numberOfLengthOctets >= bytes.length)
                throw new errors.ASN1TruncationError
                ("Element length bytes appear to have been truncated.");
            cursor++;
            const lengthNumberOctets : Uint8Array = new Uint8Array(4);
            for (let i : number = numberOfLengthOctets; i > 0; i--) {
                lengthNumberOctets[(4 - i)] = bytes[(cursor + numberOfLengthOctets - i)];
            }
            let length : number = 0;
            lengthNumberOctets.forEach(octet => {
                length <<= 8;
                length += octet;
            });
            if ((cursor + length) < cursor) // This catches an overflow.
                throw new errors.ASN1OverflowError("ASN.1 element too large.");
            cursor += (numberOfLengthOctets);
            if ((cursor + length) > bytes.length)
                throw new errors.ASN1TruncationError("ASN.1 element truncated.");
            this.value = bytes.slice(cursor, (cursor + length));
            return (cursor + length);
        } else { // Definite Short
            const length : number = (bytes[cursor++] & 0x7F);
            if ((cursor + length) > bytes.length)
                throw new errors.ASN1TruncationError("ASN.1 element was truncated.");
            this.value = bytes.slice(cursor, (cursor + length));
            return (cursor + length);
        }
    }

    public toBytes () : Uint8Array {
        let tagBytes : number[] = [ 0x00 ];
        tagBytes[0] |= this.tagClass;
        tagBytes[0] |= this.construction;
        if (this.tagNumber < 31) {
            tagBytes[0] |= this.tagNumber;
        } else {
            /*
                Per section 8.1.2.4 of X.690:
                The last five bits of the first byte being set indicate that
                the tag number is encoded in base-128 on the subsequent octets,
                using the first bit of each subsequent octet to indicate if the
                encoding continues on the next octet, just like how the
                individual numbers of OBJECT IDENTIFIER and RELATIVE OBJECT
                IDENTIFIER are encoded.
            */
            tagBytes[0] |= 0b00011111;
            let number : number = this.tagNumber; // We do not want to modify by reference.
            let encodedNumber : number[] = [];
            while (number !== 0) {
                encodedNumber.unshift(number & 0x7F);
                number >>>= 7;
                encodedNumber[0] |= 0b10000000;
            }
            encodedNumber[encodedNumber.length - 1] &= 0b01111111;
            tagBytes = tagBytes.concat(encodedNumber);
        }

        let lengthOctets : number[] = [ 0x00 ];
        if (this.value.length < 127) {
            lengthOctets = [ this.value.length ];
        } else {
            let length : number = this.value.length;
            lengthOctets = [ 0, 0, 0, 0 ];
            for (let i : number = 0; i < 4; i++) {
                lengthOctets[i] = ((length >>> ((3 - i) << 3)) & 0xFF);
            }
            let startOfNonPadding : number = 0;
            for (let i : number = 0; i < (lengthOctets.length - 1); i++) {
                if (lengthOctets[i] === 0x00) startOfNonPadding++;
            }
            lengthOctets = lengthOctets.slice(startOfNonPadding);
            lengthOctets.unshift(0b10000000 | lengthOctets.length);
        }

        const ret : Uint8Array = new Uint8Array(
            tagBytes.length +
            lengthOctets.length +
            this.value.length
        );
        ret.set(tagBytes, 0);
        ret.set(lengthOctets, tagBytes.length);
        ret.set(this.value, (tagBytes.length + lengthOctets.length));
        return ret;
    }

    private static validateDateTime (
        dataType : string,
        year : number,
        month : number,
        date : number,
        hours : number,
        minutes : number,
        seconds : number
    ) : void {
        switch (month) {

            // 31-day months
            case 0  : // January
            case 2  : // March
            case 4  : // May
            case 6  : // July
            case 7  : // August
            case 9  : // October
            case 11 : // December
                if (date > 31)
                    throw new errors.ASN1Error
                    (`Day > 31 encountered in ${dataType} with 31-day month.`);
                break;

            // 30-day months
            case 3  : // April
            case 5  : // June
            case 8  : // September
            case 10 : // November
                if (date > 30)
                    throw new errors.ASN1Error
                    (`Day > 31 encountered in ${dataType} with 30-day month.`);
                break;

            // 28/29-day month
            case 1  : // Feburary
                // Source: https://stackoverflow.com/questions/16353211/check-if-year-is-leap-year-in-javascript#16353241
                let isLeapYear : boolean = ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
                if (isLeapYear) {
                    if (date > 29)
                        throw new errors.ASN1Error
                        (`Day > 29 encountered in ${dataType} with month of February in leap year.`);
                } else {
                    if (date > 28)
                        throw new errors.ASN1Error
                        (`Day > 28 encountered in ${dataType} with month of February and non leap year.`);
                }
                break;

            default:
                throw new errors.ASN1Error(`Month greater than 12 encountered in ${dataType}.`);

        }

        if (hours > 23)
            throw new errors.ASN1Error(`Hours > 23 encountered in ${dataType}.`);
        if (minutes > 59)
            throw new errors.ASN1Error(`Minutes > 60 encountered in ${dataType}.`);
        if (seconds > 59)
            throw new errors.ASN1Error(`Seconds > 60 encountered in ${dataType}.`);
    }

    private static decodeObjectIdentifierNodes (value : Uint8Array) : number[] {
        if (value.length === 0) return [];
        let numbers : number[] = [];
        if (value.length > 0 && (value[(value.length - 1)] & 0b10000000) === 0b10000000)
            throw new errors.ASN1TruncationError("OID truncated");
        let components : number = 0;
        value.forEach(b => { if (!(b & 0b10000000)) components++; });
        numbers.length = components;
        let currentNumber : number = 0;
        let bytesUsedInCurrentNumber : number = 0;
        value.forEach(b => {
            if (bytesUsedInCurrentNumber === 0 && b === 0b10000000)
                throw new errors.ASN1PaddingError("OID had invalid padding byte.");
            // NOTE: You must use the unsigned shift >>> or MAX_SAFE_INTEGER will become -1.
            if (numbers[currentNumber] > (Number.MAX_SAFE_INTEGER >>> 7))
                throw new errors.ASN1OverflowError("OID node too big");
            numbers[currentNumber] <<= 7;
            numbers[currentNumber] |= (b & 0x7F);
            if (!(b & 0b10000000)) {
                currentNumber++;
                bytesUsedInCurrentNumber = 0;
            } else {
                bytesUsedInCurrentNumber++;
            }
        });
        return numbers;
    }

    private static encodeObjectIdentifierNodes (value : number[]) : number[] {
        let ret : number[] = [];
        for (let i : number = 0; i < value.length; i++) {
            let number : number = value[i];
            if (number < 128) {
                ret.push(number);
                continue;
            }
            let encodedOIDNode : number[] = [];
            while (number !== 0) {
                let numberBytes : number[] = [
                    (number & 255),
                    (number >>> 8 & 255),
                    ((number >>> 16) & 255),
                    ((number >>> 24) & 255),
                ];
                if ((numberBytes[0] & 0x80) === 0) numberBytes[0] |= 0x80;
                encodedOIDNode.unshift(numberBytes[0]);
                number >>= 7;
            }
            encodedOIDNode[encodedOIDNode.length - 1] &= 0x7F;
            ret = ret.concat(encodedOIDNode);
        }
        return ret;
    }
}