"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const asn1_1 = tslib_1.__importDefault(require("./asn1"));
const errors = tslib_1.__importStar(require("./errors"));
const values_1 = require("./values");
const encodeInteger_1 = tslib_1.__importDefault(require("./codecs/x690/encoders/encodeInteger"));
const decodeInteger_1 = tslib_1.__importDefault(require("./codecs/x690/decoders/decodeInteger"));
const encodeObjectIdentifier_1 = tslib_1.__importDefault(require("./codecs/x690/encoders/encodeObjectIdentifier"));
const decodeObjectIdentifier_1 = tslib_1.__importDefault(require("./codecs/x690/decoders/decodeObjectIdentifier"));
const encodeRelativeObjectIdentifier_1 = tslib_1.__importDefault(require("./codecs/x690/encoders/encodeRelativeObjectIdentifier"));
const decodeRelativeObjectIdentifier_1 = tslib_1.__importDefault(require("./codecs/x690/decoders/decodeRelativeObjectIdentifier"));
const encodeTime_1 = tslib_1.__importDefault(require("./codecs/x690/encoders/encodeTime"));
const decodeTime_1 = tslib_1.__importDefault(require("./codecs/x690/decoders/decodeTime"));
const encodeDate_1 = tslib_1.__importDefault(require("./codecs/x690/encoders/encodeDate"));
const decodeDate_1 = tslib_1.__importDefault(require("./codecs/x690/decoders/decodeDate"));
const encodeTimeOfDay_1 = tslib_1.__importDefault(require("./codecs/x690/encoders/encodeTimeOfDay"));
const decodeTimeOfDay_1 = tslib_1.__importDefault(require("./codecs/x690/decoders/decodeTimeOfDay"));
const encodeDateTime_1 = tslib_1.__importDefault(require("./codecs/x690/encoders/encodeDateTime"));
const decodeDateTime_1 = tslib_1.__importDefault(require("./codecs/x690/decoders/decodeDateTime"));
const encodeOIDIRI_1 = tslib_1.__importDefault(require("./codecs/x690/encoders/encodeOIDIRI"));
const decodeOIDIRI_1 = tslib_1.__importDefault(require("./codecs/x690/decoders/decodeOIDIRI"));
const encodeRelativeOIDIRI_1 = tslib_1.__importDefault(require("./codecs/x690/encoders/encodeRelativeOIDIRI"));
const decodeRelativeOIDIRI_1 = tslib_1.__importDefault(require("./codecs/x690/decoders/decodeRelativeOIDIRI"));
class X690Element extends asn1_1.default {
    set integer(value) {
        this.value = encodeInteger_1.default(value);
    }
    get integer() {
        if (this.construction !== values_1.ASN1Construction.primitive) {
            throw new errors.ASN1ConstructionError("INTEGER cannot be constructed.", this);
        }
        return decodeInteger_1.default(this.value);
    }
    set objectIdentifier(value) {
        this.value = encodeObjectIdentifier_1.default(value);
    }
    get objectIdentifier() {
        if (this.construction !== values_1.ASN1Construction.primitive) {
            throw new errors.ASN1ConstructionError("OBJECT IDENTIFIER cannot be constructed.", this);
        }
        if (this.value.length === 0) {
            throw new errors.ASN1TruncationError("Encoded value was too short to be an OBJECT IDENTIFIER!", this);
        }
        return decodeObjectIdentifier_1.default(this.value);
    }
    set enumerated(value) {
        this.integer = value;
    }
    get enumerated() {
        return this.integer;
    }
    set relativeObjectIdentifier(value) {
        this.value = encodeRelativeObjectIdentifier_1.default(value);
    }
    get relativeObjectIdentifier() {
        if (this.construction !== values_1.ASN1Construction.primitive) {
            throw new errors.ASN1ConstructionError("Relative OID cannot be constructed.", this);
        }
        return decodeRelativeObjectIdentifier_1.default(this.value);
    }
    set time(value) {
        this.value = encodeTime_1.default(value);
    }
    get time() {
        return decodeTime_1.default(this.value);
    }
    set date(value) {
        this.value = encodeDate_1.default(value);
    }
    get date() {
        return decodeDate_1.default(this.value);
    }
    set timeOfDay(value) {
        this.value = encodeTimeOfDay_1.default(value);
    }
    get timeOfDay() {
        return decodeTimeOfDay_1.default(this.value);
    }
    set dateTime(value) {
        this.value = encodeDateTime_1.default(value);
    }
    get dateTime() {
        return decodeDateTime_1.default(this.value);
    }
    set oidIRI(value) {
        this.value = encodeOIDIRI_1.default(value);
    }
    get oidIRI() {
        return decodeOIDIRI_1.default(this.value);
    }
    set relativeOIDIRI(value) {
        this.value = encodeRelativeOIDIRI_1.default(value);
    }
    get relativeOIDIRI() {
        return decodeRelativeOIDIRI_1.default(this.value);
    }
}
exports.default = X690Element;
//# sourceMappingURL=x690.js.map