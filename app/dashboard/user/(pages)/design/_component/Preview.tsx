"use client"
import { Button } from '@/components/ui/button'
import { CheckIcon, CopyIcon, XIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import TabButtons from './TabButtons'

import Prism from 'prismjs'
import 'prismjs/components/prism-cshtml'
import "prismjs/themes/prism-tomorrow.css"
import { useCopyClipboard } from '@/util/useCopyClipboar'
import { useRouter } from 'next/navigation'

interface PreviewProps {
    designCode: string,
    setOpen: (open: boolean) => void
}


const Preview = ({ designCode, setOpen }: PreviewProps) => {

    const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");


    const { copy, isCopied } = useCopyClipboard()

    const router = useRouter()



    useEffect(() => {

        Prism.highlightAll()

    }, [activeTab, designCode])


    return (
        <dialog className='fixed inset-0 flex items-center justify-center z-[22222] bg-black/80 h-screen w-screen'>
            <div className='bg-white h-[calc(100%-300px)] max-w-screen-lg w-full rounded-md shadow-md flex flex-col p-4'>
                <header className='p-4 border-b flex item-center relative justify-center space-x-4'>

                    <TabButtons
                        onClick={() => setActiveTab("preview")}
                        activeTab={activeTab === "preview"}
                    >
                        Preview
                    </TabButtons>

                    <TabButtons
                        activeTab={activeTab === "code"}
                        onClick={() => setActiveTab("code")}>
                        Code
                    </TabButtons>

                    <Button
                        onClick={() => {
                            router.refresh();
                            setOpen(false)
                        }}
                        variant={'outline'}
                        className='absolute right-4 cursor-pointer'
                    ><XIcon /></Button>
                </header>

                {activeTab === "preview" ? <iframe className='w-full h-full rounded-md mt-6'
                    srcDoc={designCode}
                />
                    : (
                        <pre className='overflow-auto relative w-full h-full'>
                            {
                                isCopied ?
                                    <Button
                                        variant={"ghost"}
                                        className='absolute right-4 cursor-pointer'
                                    >
                                        <CheckIcon />
                                    </Button>
                                    :
                                    <Button
                                        onClick={() => copy(designCode)}
                                        variant={"ghost"}
                                        className='absolute right-4 cursor-pointer'
                                    >
                                        <CopyIcon />
                                    </Button>


                            }
                            <code className='language-markup'>
                                {designCode}
                            </code>
                        </pre>
                    )}
            </div>
        </dialog>
    )
}

export default Preview