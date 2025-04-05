declare class Database {
    private readFile;
    private writeFile;
    constructor({ dataPath }?: {
        dataPath?: string | undefined;
    });
    set(key: string, value: any): any;
    get(key: string): any;
    delete(key: string): any;
    add(key: string, number: number): any;
    subtract(key: string, number: number): any;
    push(key: string, value: any, hardly?: boolean): any;
    pull(key: string, func: any): any;
    has(key: string): boolean;
    typeof(key: string, type?: string): boolean;
    math(key: string, symbol: string, number: number): any;
    find(text: string, tCase: boolean): any;
    filter(func: any): {
        [k: string]: unknown;
    };
    getAll(): any;
    remove(key: string): any;
    fetch(key: string): any;
    exists(key: string): boolean;
    substr(key: string, number: number): any;
}
export { Database };
