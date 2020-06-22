export default class ObjectIdentifier {
    readonly _nodes: number[];
    constructor(nodes: number[], prefix?: ObjectIdentifier | number);
    get nodes(): number[];
    get dotDelimitedNotation(): string;
    toString(): string;
}
//# sourceMappingURL=ObjectIdentifier.d.ts.map