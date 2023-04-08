import React, { useState } from "react";
import QuizzesCard from "../components/Quizzes/QuizzesCard";
import { useGetQuizzesQuery } from "../features/adminFeatures/Quizzes/QuizzesApi";
import AddQuizesModal from "../utils/modals/AddQuizesModal";
import EditQuizesModal from "../utils/modals/EditQuizesModal";

const Quizzes = () => {
  const {
    data: quizzes,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetQuizzesQuery();
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  console.log(quizzes);
  let content;
  if (isLoading) {
    content = <div></div>;
  }
  if (!isLoading && isError) {
    content = <p>{error}</p>;
  }
  if (!isLoading && !isError && quizzes?.length === 0) {
    content = <p>No Assignments Found!</p>;
  }
  if (!isLoading && !isError && quizzes.length > 0) {
    content = quizzes.map((quiz) => (
      <QuizzesCard key={quiz.id} quiz={quiz} setEditModal={setEditModal} />
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
              Add Quiz
            </button>
          </div>
          <div className="overflow-x-auto mt-4">
            <table className="divide-y-1 text-base divide-gray-600 w-full">
              <thead>
                <tr>
                  <th className="table-th">Question</th>
                  <th className="table-th">Video</th>
                  <th className="table-th justify-center">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-600/50">{content}</tbody>
            </table>
          </div>
        </div>
      </div>
      <AddQuizesModal showModal={showModal} setShowModal={setShowModal} />
      <EditQuizesModal setEditModal={setEditModal} editModal={editModal} />
    </section>
  );
};

export default Quizzes;
