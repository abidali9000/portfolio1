"use client"

import { useState, useTransition } from "react"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
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
import { useToast } from "@/hooks/use-toast"

/**
 * Generic delete button. The parent passes a server action that's already
 * been bound with the row id (e.g. `deleteProjectAction.bind(null, p.id)`).
 */
export function DeleteButton({
  action,
  label = "Delete",
  description = "This can't be undone.",
  size = "sm",
}: {
  action: () => Promise<void> | void
  label?: string
  description?: string
  size?: "sm" | "default" | "icon"
}) {
  const [open, setOpen] = useState(false)
  const [pending, start] = useTransition()
  const { toast } = useToast()

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size={size} className="text-muted-foreground hover:text-destructive">
          <Trash2 className="h-4 w-4" />
          {size !== "icon" && <span className="ml-1.5">{label}</span>}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={pending}
            onClick={() =>
              start(async () => {
                try {
                  await action()
                  toast({ title: "Deleted" })
                  setOpen(false)
                } catch (e) {
                  toast({
                    title: "Failed to delete",
                    description: e instanceof Error ? e.message : String(e),
                    variant: "destructive",
                  })
                }
              })
            }
          >
            {pending ? "Deleting…" : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
