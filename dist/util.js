export const isFunction = (value) => typeof value === 'function';
export const isSymbol = (value) => typeof value === 'symbol';
export const add = (list, item, index) => {
    const output = list.slice();
    output[index] = item;
    return output;
};
