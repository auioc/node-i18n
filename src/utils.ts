export function getNestedValue(obj: any, path: string[]) {
    const result = path.reduce((current, key) => {
        return current?.[key];
    }, obj);
    return result;
}

export function arrayToIndexedObject<T>(arr: T[]) {
    return arr.reduce(
        (p, c, i) => ({ ...p, [String(i)]: c }),
        {} as Record<string, T>
    );
}
