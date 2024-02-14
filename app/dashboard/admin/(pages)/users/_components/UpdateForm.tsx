"use client"
import React, { useState } from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { API } from '@/util/api'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'


const UpdateForm = ({ id, credit }: { id: string, credit: number }) => {

    const router = useRouter();

    const [open, setOpen] = useState(false);

    const mutation: any = useMutation<any>(({
        mutationFn: (newCredit) => {
            return axios.put(`${API}/admin/user/${id}`, newCredit)
        },
        onSuccess: () => {
            router.refresh()
            setOpen(false);
            toast.success("updated successfully");
        },
        onError: () => {
            toast.error("failed to update")
        }
    }))


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const newCredit = formData.get("credit")

        if (newCredit) {
            mutation.mutate({ credit: newCredit })
        }

    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <span className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2'>Update Credit</span>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update User Credit</DialogTitle>
                    <DialogDescription>
                        Update User Credit
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Credit
                            </Label>
                            <Input
                                id="credit"
                                name='credit'
                                defaultValue={credit}
                                className="col-span-3"
                            />
                        </div>

                    </div>
                    <DialogFooter>
                        <Button type="submit">{mutation.isPending ? "Updating Changes" : "Update Changes"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>

    )
}

export default UpdateForm