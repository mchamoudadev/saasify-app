"use client"
import React, { useState } from 'react'
import Draw from './_component/Draw'
import Preview from './_component/Preview'


const DesignPage = () => {

    const [designCode, setDesignCode] = useState("");
    const [open, setOpen] = useState(false);

    return (
        <>
            {open && designCode &&
                <Preview
                    designCode={designCode}
                    setOpen={setOpen}
                />}
            <main>
                <Draw setOpen={setOpen} setDesignCode={setDesignCode} />
            </main>
        </>
    )
}

export default DesignPage