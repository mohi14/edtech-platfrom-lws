import React, { useState } from "react";
import VideosCard from "../components/Videos/VideosCard";
import { useGetVideosQuery } from "../features/adminFeatures/videos/videosApi";
import AddVideoModal from "../utils/modals/AddVideoModal";
import EditVideoModal from "../utils/modals/EditVideoModal";

const Videos = () => {
  const {
    data: videos,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetVideosQuery();
  // console.table(videos)

  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

  let content;

  if (isLoading) {
    content = <div></div>;
  }
  if (!isLoading && isError) {
    content = <p>{error}</p>;
  }
  if (!isLoading && !isError && videos?.length === 0) {
    content = <p>No Videos Found!</p>;
  }
  if (!isLoading && !isError && videos.length > 0) {
    content = videos.map((video) => (
      <VideosCard key={video.id} video={video} setEditModal={setEditModal} />
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
              Add Video
            </button>
          </div>
          <div className="overflow-x-auto mt-4">
            <table className="divide-y-1 text-base divide-gray-600 w-full">
              <thead>
                <tr>
                  <th className="table-th">Video Title</th>
                  <th className="table-th">Description</th>
                  <th className="table-th">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-600/50">{content}</tbody>
            </table>
          </div>
        </div>
      </div>
      <AddVideoModal showModal={showModal} setShowModal={setShowModal} />
      <EditVideoModal setEditModal={setEditModal} editModal={editModal} />
    </section>
  );
};

export default Videos;
