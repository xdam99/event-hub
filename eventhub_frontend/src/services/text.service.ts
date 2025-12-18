export class TextService {
    static needsTruncationChars(text: string, maxChars: number): boolean {
        if (!text) return false;
        return text.trim().length > maxChars;
    }

    static truncateChars(text: string, maxChars: number): string {
        if (!text) return "";
        const clean = text.trim();

        if (clean.length <= maxChars) return clean;

        const sliced = clean.slice(0, maxChars);

        const lastSpace = sliced.lastIndexOf(" ");
        const safeCut = lastSpace > 0 ? sliced.slice(0, lastSpace) : sliced;

        return safeCut + "...";
    }
}
