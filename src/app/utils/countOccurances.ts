export function countOccurrences(arr: string[], str: string): number {
    return arr.reduce((count: number, item: string) => {
        return item === str ? count + 1 : count;
    }, 0);
}
