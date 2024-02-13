import React from 'react'
import { Tldraw } from '@tldraw/tldraw'
import GenerateButton from './GenerateButton'

interface DrawProps {
    setDesignCode: (designCode: string) => void;
    setOpen: (open: boolean) => void;
}


const Draw = ({ setDesignCode, setOpen }: DrawProps) => {
    return (
        <div className='p-6' style={{ height: 'calc(100vh - 80px)' }}>
            <Tldraw persistenceKey='saasify-app'>
                <GenerateButton setOpen={setOpen} setDesignCode={setDesignCode} />
            </Tldraw>
        </div>
    )
}

export default Draw