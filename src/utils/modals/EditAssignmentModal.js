import React, { useState } from "react";
import { useGetVideosQuery } from "../../features/adminFeatures/videos/videosApi";
import { useSelector } from "react-redux";
import { useUpdateAssignmentMutation } from "../../features/adminFeatures/Assigments/assignmentsApi";

const EditAssignmentModal = ({ setEditModal, editModal }) => {
  const { data: videos } = useGetVideosQuery();

  const { editing } = useSelector((state) => state.assignment);

  const [updateAssignment, { isLoading }] = useUpdateAssignmentMutation();

  const [video, setVideo] = useState("");
  const [title, setTitle] = useState("");
  const [totalMark, setTotalMark] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    let selectedVideo = null;
    if (video) {
      selectedVideo = JSON.parse(video);
    }

    const editData = {
      title: title ? title : editing?.title,
      video_id: selectedVideo ? selectedVideo.id : editing?.video_id,
      video_title: selectedVideo ? selectedVideo.title : editing?.video_title,
      totalMark: totalMark ? totalMark : editing?.totalMark,
    };
    const id = editing?.id;

    console.log(editData);

    updateAssignment({ id, editData }).then((res) => {
      if (res.data) {
        event.target.reset();
        setEditModal(false);
      }
    });
  };
  return (
    <>
      <input
        type="checkbox"
        id="my-modal-3"
        className="modal-toggle"
        checked={editModal}
      />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => setEditModal(false)}
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Edit Assignment</h3>
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
                  Value={editing?.title}
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
                  Value={editing?.totalMark}
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
                    <option
                      selected={editing?.video_title === vdo?.title}
                      value={JSON.stringify(vdo)}
                      key={vdo?.id}
                    >
                      {vdo?.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <button
                // disabled={
                //   !video || !title || !totalMark
                //     ? true
                //     : isLoading
                //     ? true
                //     : false
                // }
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              >
                Edit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditAssignmentModal;
