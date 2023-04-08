import React, { useState } from "react";
import AssignmentCard from "../components/Assignment/AssignmentCard";
import { useGetAssignmentsQuery } from "../features/adminFeatures/Assigments/assignmentsApi";
import AddAssignmentModal from "../utils/modals/AddAssignmentModal";
import EditAssignmentModal from "../utils/modals/EditAssignmentModal";

const Assignment = () => {
  const {
    data: assignments,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetAssignmentsQuery();

  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  let content;
  if (isLoading) {
    content = <div></div>;
  }
  if (!isLoading && isError) {
    content = <p>{error}</p>;
  }
  if (!isLoading && !isError && assignments?.length === 0) {
    content = <p>No Assignments Found!</p>;
  }
  if (!isLoading && !isError && assignments.length > 0) {
    content = assignments.map((assignment) => (
      <AssignmentCard
        key={assignment.id}
        assignment={assignment}
        setEditModal={setEditModal}
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
          <div className="w-full flex">
            <button className="btn ml-auto" onClick={() => setShowModal(true)}>
              Add Assignment
            </button>
          </div>
          <div className="overflow-x-auto mt-4">
            <table className="divide-y-1 text-base divide-gray-600 w-full">
              <thead>
                <tr>
                  <th className="table-th">Title</th>
                  <th className="table-th">Video Title</th>
                  <th className="table-th">Mark</th>
                  <th className="table-th">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-600/50">{content}</tbody>
            </table>
          </div>
        </div>
      </div>
      <AddAssignmentModal showModal={showModal} setShowModal={setShowModal} />
      <EditAssignmentModal setEditModal={setEditModal} editModal={editModal} />
    </section>
  );
};

export default Assignment;
