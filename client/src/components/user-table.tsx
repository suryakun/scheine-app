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

import { useUsersQuery } from "@/hooks/use-user-query";
import { Loading } from "./loading";
import { format } from "date-fns";
import { useState } from "react";

export const UserTable = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { userQuery } = useUsersQuery(currentPage);
  const { data, isLoading } = userQuery;

  if (!data || isLoading) {
    return <Loading className="h-[200px]" />
  }


  const { users, total } = data;

  return (
    <>
      <Table>
        <TableCaption>List of patient</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>First name</TableHead>
            <TableHead>Last name</TableHead>
            <TableHead>Insurance</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Birthday</TableHead>
            <TableHead className="text-right">Created at</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            users.map(user => {
              return (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.first_name}</TableCell>
                  <TableCell>{user.last_name}</TableCell>
                  <TableCell>{user.insurance}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.birthday ? format(user.birthday, "PPP") : ''}</TableCell>
                  <TableCell className="text-right">{format(user.createdAt, "PPP")}</TableCell>
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