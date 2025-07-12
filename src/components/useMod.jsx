export function useMod(value, divide) {
    return ((value % divide) + divide) % divide;
}