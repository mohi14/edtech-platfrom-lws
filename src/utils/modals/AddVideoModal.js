import React from "react";
import { useAddVideoMutation } from "../../features/adminFeatures/videos/videosApi";

const AddVideoModal = ({ showModal, setShowModal }) => {
  const [addVideo, { isLoading }] = useAddVideoMutation();

  const date = new Date();
  const isoDate = date.toISOString();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const title = form.title.value;
    const description = form.description.value;
    const url = form.url.value;
    const views = form.views.value;
    const duration = form.duration.value;

    const data = {
      title,
      description,
      url,
      views,
      duration,
      createdAt: isoDate,
    };
    addVideo(data).then((res) => {
      if (res.data) {
        form.reset();
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
          <h3 className="text-lg font-bold">Add Video</h3>
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
                  //   onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label for="email-address" className="sr-only">
                  Video Description
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
                  //   onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>

            {/* <div className="rounded-md shadow-sm -space-y-px">
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
            </div> */}
            <div>
              <button
                // disabled={
                //   !video || !title || !totalMark
                //     ? true
                //     : isLoading
                //     ? true
                //     : false
                // }

                disabled={isLoading}
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

export default AddVideoModal;
