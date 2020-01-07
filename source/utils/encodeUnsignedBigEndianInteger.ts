import * as errors from "../errors";
import { MIN_UINT_32, MAX_UINT_32 } from "../values";

export default
function encodeUnsignedBigEndianInteger (value: number): Uint8Array {
    if (value < MIN_UINT_32) {
        throw new errors.ASN1OverflowError(
            `Number ${value} too small to be encoded as a big-endian unsigned integer.`,
        );
    }
    if (value > MAX_UINT_32) {
        throw new errors.ASN1OverflowError(
            `Number ${value} too big to be encoded as a big-endian unsigned integer.`,
        );
    }
    const bytes: Uint8Array = new Uint8Array((new Uint32Array([ value ])).reverse());
    let startOfNonPadding: number = 0;
    for (let i: number = 0; i < bytes.length - 1; i++) {
        if (bytes[i] === 0x00) {
            startOfNonPadding++;
        }
    }
    return new Uint8Array((new Uint32Array([ value ])).reverse()).slice(startOfNonPadding);
}