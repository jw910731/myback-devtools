export default class QueryBuilder {
    constraints: {};
    equal(k: any, v: any): QueryBuilder;
    __setConstraints(k: any, c: any, v: any): void;
    notEqual(k: any, v: any): QueryBuilder;
    lessThan(k: any, v: any): QueryBuilder;
    lessOrEqualThan(k: any, v: any): QueryBuilder;
    greaterThan(k: any, v: any): QueryBuilder;
    greaterOrEqualThan(k: any, v: any): QueryBuilder;
    toString(): string;
}
