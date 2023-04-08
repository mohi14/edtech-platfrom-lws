import React, { useState } from "react";
import { useGetVideosQuery } from "../../features/adminFeatures/videos/videosApi";
import { useAddQuizMutation } from "../../features/adminFeatures/Quizzes/QuizzesApi";

const AddQuizesModal = ({ showModal, setShowModal }) => {
  const { data: videos } = useGetVideosQuery();

  const [addQuiz, { isLoading }] = useAddQuizMutation();

  const [video, setVideo] = useState("");

  const [correctAnswer, setCorrectAnswer] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const selectedVideo = JSON.parse(video);

    const question = form.question.value;
    const optionA = form.option1.value;
    const optionB = form.option2.value;
    const optionC = form.option3.value;
    const optionD = form.option4.value;

    const data = {
      question,
      video_id: selectedVideo?.id,
      video_title: selectedVideo?.title,
      options: [
        {
          id: 1,
          option: optionA,
          isCorrect: correctAnswer === "A" ? true : false,
        },
        {
          id: 2,
          option: optionB,
          isCorrect: correctAnswer === "B" ? true : false,
        },
        {
          id: 3,
          option: optionC,
          isCorrect: correctAnswer === "C" ? true : false,
        },
        {
          id: 4,
          option: optionD,
          isCorrect: correctAnswer === "D" ? true : false,
        },
      ],
    };
    addQuiz(data).then((res) => {
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
          <h3 className="text-lg font-bold">Add Quiz</h3>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label for="email-address" className="sr-only">
                  Question
                </label>
                <input
                  id="email-address"
                  name="question"
                  type="text"
                  required
                  className="login-input rounded-t-md"
                  placeholder="Question"
                  //   onChange={(e) => setTitle(e.target.value)}
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

            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mb-5">
                <label for="email-address" className="">
                  Options
                </label>
              </div>
              <div>
                <input
                  id="email-address"
                  name="option1"
                  type="text"
                  required
                  className="login-input rounded-t-md"
                  placeholder="Option A"
                  //   onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <input
                  id="email-address"
                  name="option2"
                  type="text"
                  required
                  className="login-input rounded-t-md"
                  placeholder="Option B"
                  //   onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <input
                  id="email-address"
                  name="option3"
                  type="text"
                  required
                  className="login-input rounded-t-md"
                  placeholder="Option C"
                  //   onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <input
                  id="email-address"
                  name="option4"
                  type="text"
                  required
                  className="login-input rounded-t-md"
                  placeholder="Option D"
                  //   onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>
            <div>
              <select
                name="currentAnswer"
                className="select login-input rounded-t-md select-primary w-full "
                required
                onChange={(e) => setCorrectAnswer(e.target.value)}
              >
                <option value={0} disabled selected>
                  Choose Correct Answer
                </option>

                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>

            <div>
              <button
                disabled={
                  !video || !correctAnswer ? true : isLoading ? true : false
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

export default AddQuizesModal;
