import React, { useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Pagination,
  Avatar,
  Chip,
  Skeleton,
} from "@nextui-org/react";
import { useDeleteQuestionMutation, useUpdateQuestionMutation } from "@/store/question/get-all-questions";
// import UpdateRoleDialog from "./UpdateRoleDialog";
// import DeleteUserDialog from "./DeleteDialog";

interface UserTableProps {
  data: {
    data: {
      data: any[];
    };
  };
  pages: number;
  users: any[];
  setUsers: Function;
  sortTable: Function;
  loading: boolean;
  setLoading: Function;
  onPreviousPage: any;
  onPageChange: Function;
  onNextPage: any;
  usersFilters: {
    page: number;
    limit: number;
    role: string;
    status: string;
    sortBy: string;
    sortOrder: string;
  };
  setUserFilters: Function;
}

const StudentsTable: React.FC<UserTableProps> = ({
  data,
  pages,
  users,
  sortTable,
  usersFilters,
  loading,
  onPreviousPage,
  onPageChange,
  onNextPage,
}) => {
  const [updateQuestion, { isLoading: isUpdating }] =
    useUpdateQuestionMutation();

  // Mutation hook for deleting a question
  const [deleteQuestion, { isLoading: isDeleting }] =
    useDeleteQuestionMutation();
    const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(
      null
    );

  // Example function to update a question
  const handleUpdateQuestion = async (
    questionId: any,
    updatedData: any,
    event: any
  ) => {
    event.preventDefault();
    try {
      await updateQuestion({ id: questionId, ...updatedData }); // Assuming 'updatedData' is an object containing the updated fields
      // Optionally, you can trigger a refetch of all questions after updating
      // refetch();
    } catch (error) {
      // Handle error
    }
  };

  // Example function to delete a question
  const handleDeleteQuestion = async (questionId: any, event: any) => {
    event.preventDefault();
    try {
      await deleteQuestion(questionId);
      // refetch();
    } catch (error) {
      // Handle error
      console.log("error deleting");
    }
  };

  const tableHeads = [
    { name: "Full Name", uid: "name", sortable: true },
    { name: "Email", uid: "email", sortable: false },
    { name: "ID", uid: "id", sortable: true },
    { name: "Status", uid: "status", sortable: false },
    { name: "Joined", uid: "date", sortable: true },
    { name: "Actions", uid: "actions", sortable: false },
  ];

  const t: any = {
    id: "",
    fullName: "",
    email: "",
    userId: "",
    password: "",
    status: "",
    isActive: true,
    isVerified: true,
    role: "",
    createdAt: "",
    updatedAt: "",
    SectionsOfUser: [{}],
  };
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const shimmers = [t, t, t, t, t];

  const openDialog = (user: any) => {
    setIsDialogOpen(true);
  };
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    const dateObject = new Date(dateString);
    return dateObject.toLocaleDateString("en-US", options);
  };

  const formatTime = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    };
    const dateObject = new Date(dateString);
    const time = dateObject.toLocaleDateString("en-US", options).split(",");
    return time[1];
  };
  const renderCell = (isUser: boolean, user: any, columnKey: any) => {
    console.log(user);
    switch (columnKey) {
      case "name":
        return (
          <>
            {isUser ? (
              <div className="text-xs text-gray-700 font-light">
                {user && user.fullName}
              </div>
            ) : (
              <div className="mr-32 w-full">
                <Skeleton className="h-3 mb-2 w-4/5 rounded-full" />
              </div>
            )}
          </>
        );
      case "id":
        return (
          <>
            {isUser ? (
              <div className="text-xs font-light text-gray-700">
                {user && user.userId}
              </div>
            ) : (
              <div className="mr-32 w-full">
                <Skeleton className="h-3 mb-2 w-3/5 rounded-full" />
              </div>
            )}
          </>
        );

      case "email":
        return (
          <>
            {isUser ? (
              <div className="text-xs text-gray-700 font-light">
                {user && user.email}
              </div>
            ) : (
              <div className="mr-32 w-full">
                <Skeleton className="h-3 mb-2 w-4/5 rounded-full" />
              </div>
            )}
          </>
        );
      case "status":
        return (
          <>
            {isUser ? (
              <>
                {user.isActive && user.isVerified && (
                  <Chip
                    className="text-xs font-light text-gray-700"
                    color={"success"}
                    size="sm"
                    variant="flat"
                  >
                    Active
                  </Chip>
                )}
                {user.isActive && !user.isVerified && (
                  <Chip
                    className="text-xs font-light text-gray-700"
                    color={"warning"}
                    size="sm"
                    variant="flat"
                  >
                    Pending
                  </Chip>
                )}
                {!user.isActive && (
                  <Chip
                    className="text-xs font-light text-gray-700"
                    color={"danger"}
                    size="sm"
                    variant="flat"
                  >
                    Archived
                  </Chip>
                )}
              </>
            ) : (
              <div className="mr-3 w-full">
                <Skeleton className="h-6 mb-2 w-20 rounded-full" />
              </div>
            )}
          </>
        );
      case "date":
        const formattedDate = formatDate(user.updatedAt);
        const formattedTime = formatTime(user.updatedAt);
        return (
          <>
            {isUser ? (
              <>
                <div className="text-xs mt-1">{formattedDate}</div>
                <div className="text-xs mt-1">{formattedTime}</div>
              </>
            ) : (
              <div className="w-full mr-24">
                <Skeleton className="h-3 mb-2 w-3/5 rounded-full" />
                <Skeleton className="h-3 my- w-2/5 rounded-full" />
              </div>
            )}
          </>
        );
      case "actions":
        return (
          <>
            {isUser ? (
              <div className="flex">
                <button onClick={(e) => handleDeleteQuestion(user.id, e)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    color="#FF3B30"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-8 h-8 mx-2 rounded-full bg-[#FF3B30] bg-opacity-20 p-2"
                  >
                    <path
                      strokeLinecap="round"
                      d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                    />
                  </svg>
                </button>
                <button onClick={() => handleUpdateQuestion(user, "", "")}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    color="#AE709F"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-8 h-8 mx-2 rounded-full bg-[#AE709F] bg-opacity-20 pt-2.5 py-1.5 pl-0.5"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 14 3-3m-3 3 3 3m-3-3h16v-3m2-7-3 3m3-3-3-3m3 3H3v3"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex w-fit">
                <Skeleton className="h-8 w-8 mr-5 rounded-full" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            )}
          </>
        );
      default:
        return <div></div>;
    }
  };

  const bottomContent = useMemo(() => {
    return (
      <div className="pt-4 bg-white rounded-2xl px-2 flex justify-between items-center">
        <span className="w-[30%] px-2 text-small text-default-400">
          {data?.data?.data?.length} users in total
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={usersFilters.page}
          total={pages}
          onChange={(e) => onPageChange(e)}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [
    usersFilters.page,
    pages,
    data?.data?.data?.length,
    onNextPage,
    onPageChange,
    onPreviousPage,
  ]);
  return (
    <div>
      <div className="p-6 bg-white rounded-2xl shadow-sm">
        <Table
          aria-label="Example table with custom cells, pagination and sorting"
          isHeaderSticky
          bottomContent={bottomContent}
          bottomContentPlacement="inside"
          sortDescriptor={{
            column: usersFilters.sortBy,
            direction:
              usersFilters.sortOrder == "asc" ? "ascending" : "descending",
          }}
          onSortChange={(e) => sortTable(e)}
          topContentPlacement="outside"
          removeWrapper={true}
          className="text-secondary w-full h-full"
        >
          <TableHeader columns={tableHeads}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
                allowsSorting={column.sortable}
                className="text-xs font-bold text-gray-700 bg-white"
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          {loading ? (
            <TableBody>
              {shimmers.map((user, i) => (
                <TableRow key={i}>
                  {(columnKey) => (
                    <TableCell>{renderCell(false, user, columnKey)}</TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              {users.map((item) => (
                <TableRow key={item.id}>
                  {(columnKey) => (
                    <TableCell>{renderCell(true, item, columnKey)}</TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </div>
    </div>
  );
};

export default StudentsTable;
