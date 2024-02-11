import React from 'react'
import { Tldraw } from '@tldraw/tldraw'
import GenerateButton from './GenerateButton'
// import '@tldraw/tldraw/styles-editor.css'
// import '@tldraw/tldraw/styles-ui.css'

const Draw = () => {
    return (
        <div className='p-6' style={{ height: 'calc(100vh - 80px)' }}>
            <Tldraw persistenceKey='saasify-app'>
                <GenerateButton />
            </Tldraw>
        </div>
    )
}

export default Draw