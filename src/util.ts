export const isFunction = (value: unknown): value is Function => typeof value === 'function';
export const isSymbol = (value: unknown): value is Symbol => typeof value === 'symbol';
export const add = <T>(list: T[], item: T, index: number) => {
    const output = list.slice();
    output[index] = item;
    return output;
}