import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import { useDoctorsQuery } from "@/hooks/use-doctor-query";
import { Loading } from "./loading";
import { format } from "date-fns";
import { useState } from "react";

export const DoctorTable = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { doctorsQuery } = useDoctorsQuery(currentPage)
  const { data, isLoading } = doctorsQuery;

  if (!data || isLoading) {
    return <Loading className="h-[200px]" />
  }


  const { doctors, total } = data;

  return (
    <>
      <Table>
        <TableCaption>List of doctor</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Specialization</TableHead>
            <TableHead className="text-right">Created at</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            doctors.map(doctor => {
              return (
                <TableRow>
                  <TableCell>{doctor.id}</TableCell>
                  <TableCell>{doctor.name}</TableCell>
                  <TableCell>{doctor.email}</TableCell>
                  <TableCell>{doctor.specialization}</TableCell>
                  <TableCell className="text-right">{format(doctor.createdAt, "PPP")}</TableCell>
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              aria-disabled={currentPage === 1}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>{currentPage}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, total))}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

    </>
  )
}
