import React from "react";
import { useSelector } from "react-redux";
import { useUpdateVideoMutation } from "../../features/adminFeatures/videos/videosApi";

const EditVideoModal = ({ setEditModal, editModal }) => {
  const { editing } = useSelector((state) => state.assignment);

  const [updateVideo, { isLoading }] = useUpdateVideoMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const title = form.title.value;
    const description = form.description.value;
    const url = form.url.value;
    const views = form.views.value;
    const duration = form.duration.value;

    const editData = {
      title,
      description,
      url,
      views,
      duration,
      createdAt: editing?.createdAt,
    };
    updateVideo({ id: editing?.id, editData }).then((res) => {
      if (res.data) {
        form.reset();
        setEditModal(false);
      }
    });
  };

  //   console.log(editing, "video");
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
          <h3 className="text-lg font-bold">Edit Video</h3>
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
                  placeholder="Video tittle"
                  Value={editing?.title}
                  //   onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label for="email-address" className="sr-only">
                  Video Title
                </label>
                {/* <input
              id="email-address"
              name="title"
              type="text"
              required
              className="login-input rounded-t-md"
              placeholder="Video tittle"

              //   onChange={(e) => setTitle(e.target.value)}
            /> */}
                <textarea
                  className="textarea textarea-primary login-input rounded-t-md"
                  placeholder="Video Description"
                  name="description"
                  required
                  Value={editing?.description}
                ></textarea>
              </div>
            </div>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label for="email-address" className="sr-only">
                  Url
                </label>
                <input
                  id="email-address"
                  name="url"
                  type="text"
                  required
                  className="login-input rounded-t-md"
                  placeholder="Url"
                  Value={editing?.url}
                  //   onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label for="email-address" className="sr-only">
                  Views
                </label>
                <input
                  id="email-address"
                  name="views"
                  type="text"
                  required
                  className="login-input rounded-t-md"
                  placeholder="Views"
                  Value={editing?.views}
                  //   onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label for="email-address" className="sr-only">
                  Duration
                </label>
                <input
                  id="email-address"
                  name="duration"
                  type="text"
                  required
                  className="login-input rounded-t-md"
                  placeholder="Duration"
                  Value={editing?.duration}
                  //   onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                // disabled={isLoading}
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

export default EditVideoModal;
