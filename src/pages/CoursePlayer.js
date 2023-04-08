import React from "react";
import ActiveCourse from "../components/ActiveCourse/ActiveCourse";
import CourseLists from "../components/CourseLists/CourseLists";
import { useGetVideosQuery } from "../features/adminFeatures/videos/videosApi";

const CoursePlayer = () => {
  const { data: videos, isLoading, isSuccess } = useGetVideosQuery();


  return (
    <section
      className="py-6 bg-primary"
      style={{ height: "100vh", overflowY: "hidden" }}
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-0">
        <div className="grid grid-cols-3 gap-2 lg:gap-8">
          <ActiveCourse />
          <CourseLists />
        </div>
      </div>
    </section>
  );
};

export default CoursePlayer;
