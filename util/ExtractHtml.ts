export function extractHtml(text: string): string | null {

    const htmlPattern = /<\!DOCTYPE html>[\s\S]*<\/html>/i;

    const match = text.match(htmlPattern);

    return match ? match[0] : null;
}