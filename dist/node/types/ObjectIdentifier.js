"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ObjectIdentifier {
    constructor(nodes, prefix) {
        const _nodes = prefix
            ? typeof prefix === "number"
                ? [prefix].concat(nodes)
                : prefix._nodes.concat(nodes)
            : nodes.slice(0);
        if (_nodes.length < 2) {
            throw new Error("Cannot construct an OID with less than two nodes!");
        }
        if (_nodes.length >= 1 && !(_nodes[0] in [0, 1, 2])) {
            throw new Error("OIDs first node must be 0, 1, or 2!");
        }
        if (((_nodes[0] < 2) && _nodes[1] > 39)
            || (_nodes[0] === 2 && _nodes[1] > 175)) {
            throw new Error("OID Node #2 cannot exceed 39 if node #1 is 0 or 1, and 175 "
                + `if node #1 is 2. Received these nodes: ${_nodes}.`);
        }
        _nodes.forEach((node) => {
            if (node < 0) {
                throw new Error("OID node numbers cannot be negative!");
            }
            if (node > Number.MAX_SAFE_INTEGER) {
                throw new Error("OID number was too big!");
            }
        });
        this._nodes = _nodes;
    }
    get nodes() {
        return this._nodes.slice(0);
    }
    get dotDelimitedNotation() {
        return this._nodes.join(".");
    }
    toString() {
        return this.dotDelimitedNotation;
    }
}
exports.default = ObjectIdentifier;
//# sourceMappingURL=ObjectIdentifier.js.map