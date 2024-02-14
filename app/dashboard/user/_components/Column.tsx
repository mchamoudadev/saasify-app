"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import DeleteAlertDialog from "../../_components/DeleteAlertDialog"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type GeneratedCode = {
    id: string
    completion_tokens: number
    prompt_tokens: number
    total_tokens: number
}

export const columns: ColumnDef<GeneratedCode>[] = [
    {
        accessorKey: "id",
        header: "Id",
    },
    {
        accessorKey: "completion_tokens",
        header: "Completion Token",
    },
    {
        accessorKey: "prompt_tokens",
        header: "Prompt Token",
    },
    {
        accessorKey: "total_tokens",
        accessorFn: (originalRow) => {
            return originalRow.total_tokens.toString();
        },
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Total Token
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },

    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const designInfo = row.original;

            return (
                <div className="space-x-2">
                    <Button>
                        Preview
                    </Button>
                    <DeleteAlertDialog id={designInfo.id} />
                </div>
            )



        }

    }

]
