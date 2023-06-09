import React from "react";
import AssignmentMarksCard from "../components/AssignmentMarks/AssignmentMarksCard";
import { useGetAssignmentMarksQuery } from "../features/adminFeatures/AssignmentMarks/assignmentMarksApi";

const AssignmetMarks = () => {
  const {
    data: assignmentMarks,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetAssignmentMarksQuery();

  console.table(assignmentMarks);

  const pendingMarks = assignmentMarks?.filter(
    (mark) => mark.status === "pending"
  );

  const publishedMarks = assignmentMarks?.filter(
    (mark) => mark.status === "published"
  );

  let content;
  if (isLoading) {
    content = <div></div>;
  }
  if (!isLoading && isError) {
    content = <p>{error}</p>;
  }
  if (!isLoading && !isError && assignmentMarks?.length === 0) {
    content = <p>No Assignments Found!</p>;
  }
  if (!isLoading && !isError && assignmentMarks.length > 0) {
    content = assignmentMarks.map((assignmentMark) => (
      <AssignmentMarksCard
        key={assignmentMark.id}
        assignmentMark={assignmentMark}
      />
    ));
  }
  return (
    <section
      className="py-6 bg-primary"
      style={{ height: "100vh", overflowY: "hidden" }}
    >
      <div className="mx-auto max-w-full px-5 lg:px-20">
        <div className="px-3 py-20 bg-opacity-10">
          <ul className="assignment-status">
            <li>
              Total <span>{assignmentMarks?.length}</span>
            </li>
            <li>
              Pending <span>{pendingMarks?.length}</span>
            </li>
            <li>
              Mark Sent <span>{publishedMarks?.length}</span>
            </li>
          </ul>
          <div className="overflow-x-auto mt-4">
            <table className="divide-y-1 text-base divide-gray-600 w-full">
              <thead>
                <tr>
                  <th className="table-th">Assignment</th>
                  <th className="table-th">Date</th>
                  <th className="table-th">Student Name</th>
                  <th className="table-th">Repo Link</th>
                  <th className="table-th">Mark</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-600/50">{content}</tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AssignmetMarks;
