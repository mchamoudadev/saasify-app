import { useCallback, useState } from "react";

export const useCopyClipboard = () => {

    const [isCopied, setIsCopied] = useState<boolean>(false);

    const copy = useCallback(async (text: string) => {

        try {

            await navigator.clipboard.writeText(text);
            setIsCopied(true);

            setTimeout(() => setIsCopied(false), 1500)

        } catch (error) {
            console.error("failed to copy text to ciplboard")
            setIsCopied(false);
        }

    }, [])

    return { isCopied, copy }

}