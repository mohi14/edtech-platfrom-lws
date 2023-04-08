import React, { useState } from "react";
import { useGetVideosQuery } from "../../features/adminFeatures/videos/videosApi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetQuizzesQuery } from "../../features/adminFeatures/Quizzes/QuizzesApi";
import { useGetAssignmentsQuery } from "../../features/adminFeatures/Assigments/assignmentsApi";
import { useGetAssignmentMarksQuery } from "../../features/adminFeatures/AssignmentMarks/assignmentMarksApi";
import SubmitAssignmentModal from "../../utils/modals/SubmitAssignmentModal";

const ActiveCourse = () => {
  const { data: videos, isLoading, isSuccess } = useGetVideosQuery();
  const { data: quizzes } = useGetQuizzesQuery()
  const { data: assignments } = useGetAssignmentsQuery()
  const { data: assignmentMarks } = useGetAssignmentMarksQuery()

  const { course } = useSelector(state => state.courses)

  const { user } = useSelector(state => state.auth)

  const [showModal, setShowModal] = useState(false);

  console.log(assignmentMarks)

  // let assignmentStatus;
  // if (assignmentMarks) {
  //   const usr = assignmentMarks.find(m => m.student_id === user?.id)

  // }


  let isAssignments;
  if (assignments) {
    if (course) {
      const assignment = assignments.find(q => q.video_id === course?.id)
      if (assignment) {
        isAssignments = true
      }
    }
    else if (videos[0]) {
      const assignment = assignments.find(q => q.video_id === videos[0]?.id)
      if (assignment) {
        isAssignments = true
      }
    }
  }

  let isQuiz;
  if (quizzes) {
    if (course) {
      const quizz = quizzes.find(q => q.video_id === course?.id)
      if (quizz) {
        isQuiz = true
      }
    }
    else if (videos[0]) {
      const quizz = quizzes.find(q => q.video_id === videos[0]?.id)
      if (quizz) {
        isQuiz = true
      }
    }
  }



  if (isLoading) {
    return <div></div>;
  }
  return (
    isSuccess && (
      <>
        <div className="col-span-full w-full space-y-8 lg:col-span-2">
          <iframe
            width="100%"
            className="aspect-video"
            src={course ? course?.url : videos[0]?.url}
            title={course ? course?.title : videos[0]?.title}
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>

          <div>
            <h1 className="text-lg font-semibold tracking-tight text-slate-100">
              {course ? course?.title : videos[0]?.title}
            </h1>
            <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
              Uploaded on 23 February 2020
            </h2>

            <div className="flex gap-4">
              {isAssignments && <button
                onClick={() => setShowModal(true)}
                className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
              >
                এসাইনমেন্ট
              </button>}

              {isQuiz && <Link
                to={`/quiz/${course ? course?.id : videos[0]?.id}`}
                className="px-3 font-bold py-1 border border-cyan text-cyan rounded-full text-sm hover:bg-cyan hover:text-primary"
              >
                কুইজে অংশগ্রহণ করুন
              </Link>}
            </div>
            <p className="mt-4 text-sm text-slate-400 leading-6">
              {course ? course?.description : videos[0]?.description}
            </p>
          </div>
        </div>
        <SubmitAssignmentModal showModal={showModal} setShowModal={setShowModal} />
      </>
    )
  );
};

export default ActiveCourse;
