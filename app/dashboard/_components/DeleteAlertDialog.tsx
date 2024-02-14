"use client"
import React, { useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { API } from '@/util/api'
import { toast } from 'sonner'
import { Loader, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

const DeleteAlertDialog = ({ id }: { id: string }) => {


    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleDelete = async () => {
        setLoading(true)
        try {
            await axios.delete(`${API}/user/design/${id}`);
            router.refresh();
            toast.success("deleted successfully");
            setLoading(false)
        } catch (error) {
            toast.error("something went wrong")
            setLoading(false)
        }
    }


    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <span className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 px-4 py-2'>
                    {loading ? <Loader2 className=' animate-spin h-5 w-5 ' /> : "Delete"}
                </span>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                    >Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default DeleteAlertDialog