import React from "react";
import { useGetVideosQuery } from "../../features/adminFeatures/videos/videosApi";
import { useDispatch, useSelector } from "react-redux";
import { activeCourse } from "../../features/studentFeatures/courses/courseSlice";

const CourseLists = () => {
  const { data: videos } = useGetVideosQuery();
  const { course } = useSelector(state => state.courses)
  const dispatch = useDispatch()
  console.log(course)

  const handleCourse = (video) => {
    dispatch(activeCourse(video))
  }

  return (
    <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30">
      {videos &&
        videos.length > 0 &&
        videos.map((video) => (
          <div
            key={video.id}
            className={`${video.id === course?.id && "bg-[#572ea9]"} w-full flex flex-row gap-2 cursor-pointer hover:bg-slate-900 p-2 py-3`}
            onClick={() => handleCourse(video)}
          >
            <svg
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
              />
            </svg>

            <div clas="flex flex-col w-full">
              <a href="#">
                <p className="text-slate-50 text-sm font-medium">
                  {video?.title}
                </p>
              </a>
              <div>
                <span className="text-gray-400 text-xs mt-1">
                  {video?.duration} Mins
                </span>
                <span className="text-gray-400 text-xs mt-1"> | </span>
                <span className="text-gray-400 text-xs mt-1">
                  {video?.views} views
                </span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CourseLists;
