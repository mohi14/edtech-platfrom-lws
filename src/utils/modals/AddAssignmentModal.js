import React, { useState } from "react";
import { useGetVideosQuery } from "../../features/adminFeatures/videos/videosApi";
import { useAddAssignmentMutation } from "../../features/adminFeatures/Assigments/assignmentsApi";

const AddAssignmentModal = ({ showModal, setShowModal }) => {
  const { data: videos } = useGetVideosQuery();

  const [video, setVideo] = useState("");
  const [title, setTitle] = useState("");
  const [totalMark, setTotalMark] = useState("");

  const [addAssignment, { isLoading }] = useAddAssignmentMutation();

  const clearForm = () => {
    setVideo("");
    setTitle("");
    setTotalMark("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const selectedVideo = JSON.parse(video);

    const data = {
      title,
      video_id: selectedVideo.id,
      video_title: selectedVideo.title,
      totalMark,
    };
    addAssignment(data).then((res) => {
      if (res.data) {
        clearForm();
        event.target.reset();
        event.target.selectVideo.value = 0;
        setShowModal(false);
      }
    });
  };
  return (
    <>
      <input
        type="checkbox"
        id="my-modal-3"
        className="modal-toggle"
        checked={showModal}
      />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => setShowModal(false)}
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Add Assignment</h3>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label for="email-address" className="sr-only">
                  Video Title
                </label>
                <input
                  id="email-address"
                  name="title"
                  type="text"
                  required
                  className="login-input rounded-t-md"
                  placeholder="Assignment tittle"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label for="email-address" className="sr-only">
                  Total Mark
                </label>
                <input
                  id="email-address"
                  name="total_mark"
                  type="number"
                  min={0}
                  max={100}
                  required
                  className="login-input rounded-t-md"
                  placeholder="Total Mark"
                  onChange={(e) => setTotalMark(Number(e.target.value))}
                />
              </div>
            </div>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <select
                  name="selectVideo"
                  className="select login-input rounded-t-md select-primary w-full "
                  required
                  onChange={(e) => setVideo(e.target.value)}
                >
                  <option value={0} disabled selected>
                    Choose Video
                  </option>
                  {videos?.map((vdo) => (
                    <option value={JSON.stringify(vdo)} key={vdo?.id}>
                      {vdo?.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <button
                disabled={
                  !video || !title || !totalMark
                    ? true
                    : isLoading
                    ? true
                    : false
                }
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddAssignmentModal;
