"use client"
import React, { useEffect, useState } from 'react'
import Draw from './_component/Draw'
import Preview from './_component/Preview'
import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { API } from '@/util/api'


const DesignPage = () => {

    const [designCode, setDesignCode] = useState("");
    const [open, setOpen] = useState(false);

    const searchParams = useSearchParams();

    const code = searchParams.get("code");

    const { data, isError, isLoading } = useQuery({
        queryKey: ["design"],
        queryFn: () => axios.get(`${API}/user/design/${code}`).then(res => res.data),
        staleTime: 0,
        retry: 3
    });



    useEffect(() => {

        if (data && data.code) {
            setDesignCode(data.code);
            setOpen(true)
        }

    }, [data])



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