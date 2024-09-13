import { PlusIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { UserInputForm } from "./user-input-form";
import { UserTable } from "./user-table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button";
import { useState } from "react";

export const UserPage = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div className="flex justify-end">
            <Button className="max-w-[150px]" variant="outline"><PlusIcon /> Add new patient</Button>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add new patient</DialogTitle>
            <DialogDescription>
              Add new patient data. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <Card>
            <CardHeader>
              <CardTitle>Manage User</CardTitle>
            </CardHeader>
            <CardContent>
              <UserInputForm onSaveComplete={() => setOpen(false)} />
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
      <UserTable />
    </div>
  )
}