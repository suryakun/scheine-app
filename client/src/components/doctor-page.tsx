import { PlusIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

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
import { DoctorForm } from "./doctor-input-form";
import { DoctorTable } from './doctor-table';

export const DoctorPage = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div className="flex justify-end">
            <Button className="max-w-[150px]" variant="outline"><PlusIcon /> Add new doctor</Button>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add new doctor</DialogTitle>
            <DialogDescription>
              Add new doctor data. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <Card>
            <CardHeader>
              <CardTitle>Manage User</CardTitle>
            </CardHeader>
            <CardContent>
              <DoctorForm onSaveComplete={() => setOpen(false)} />
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
      <DoctorTable />
    </div>
  )
}