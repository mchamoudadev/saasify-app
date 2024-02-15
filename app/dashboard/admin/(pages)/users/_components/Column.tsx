"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
// import DeleteAlertDialog from "../../_components/DeleteAlertDialog"
import { useRouter } from "next/navigation"
import UpdateForm from "./UpdateForm"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type UserProps = {
    id?: string
    name?: string | null
    email?: string | null
    credit?: number,

}

export const columns: ColumnDef<UserProps>[] = [
    {
        accessorKey: "id",
        header: "Id",
    },
    {
        accessorKey: "name",
        header: "Name",
    },

    {
        accessorKey: "email",

        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },

    },

    {
        accessorKey: "credit",
        header: "Credit",
    },



    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {

            const userInfo = row.original;
            const router = useRouter()
            return (
                <div className="space-x-2">
                    <UpdateForm id={userInfo.id!} credit={userInfo.credit!} />
                    {/* <DeleteAlertDialog id={designInfo.id} /> */}
                </div>
            )
        }
    }
]
