export function getAccessToken(str: string | undefined) {
    if (!str) return '';
    return str.slice(7).trim();
}