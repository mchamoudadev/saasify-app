"use client"
import { Button } from '@/components/ui/button'
import { API } from '@/util/api'
import { useEditor } from '@tldraw/tldraw'
import { Loader2Icon } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'

interface DrawProps {
    setDesignCode: (designCode: string) => void;
    setOpen: (open: boolean) => void;
}

interface ResponseErrorProps {
    result: string,
    usage: number,
}


const GenerateButton = ({ setDesignCode, setOpen }: DrawProps) => {

    const [loading, setLoading] = useState(false);

    const editor = useEditor()


    const handleGenerate = async () => {

        setLoading(true)
        try {

            const svgElement = await editor.getSvg(Array.from(editor.getCurrentPageShapeIds()));

            if (!svgElement) {
                throw new Error("please select a shape")
            }

            const svgString = (typeof svgElement === "string") ? svgElement : new XMLSerializer().serializeToString(svgElement);

            const response = await fetch(`${API}/user/design`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ svg: svgString })
            });

            if (!response.ok) {
                const errorResponse = await response.json();

                if (errorResponse.message) {
                    throw new Error(`${errorResponse.message} at least you need ${errorResponse.additionalCreditRequired} credits`)
                } else {
                    throw new Error(errorResponse)
                }
            }

            const codeResult: ResponseErrorProps = await response.json();

            if (!codeResult) {
                throw new Error("Message not provided please try again")
            }

            setDesignCode(codeResult.result);
            setOpen(true)

            toast.success(`you have spent ${codeResult.usage} credits on this wireframe`, { duration: 9000, style: { zIndex: 888888888555 } })
            // setLoading(true)
        } catch (error) {

            console.error(error)
            if (error instanceof Error) {
                toast.error(error.message, { duration: 8000, position: "bottom-right" })
            }
        } finally {
            setLoading(false)
        }

    }



    return (
        <div>
            <Button
                onClick={handleGenerate}
                className={`z-[554] absolute top-4 left-[50%] bg-[#3080ed] hover:bg-[#3080ed]/70`}>
                {loading ?
                    <span className='flex space-x-2 justify-center items-center'>
                        Generating...
                        <Loader2Icon className='animate-spin' />
                    </span>
                    : <span>Generate Code</span>
                }
            </Button>
        </div>
    )
}

export default GenerateButton