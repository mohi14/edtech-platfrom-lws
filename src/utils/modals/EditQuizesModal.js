import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useGetVideosQuery } from "../../features/adminFeatures/videos/videosApi";
import { useUpdateQuizMutation } from "../../features/adminFeatures/Quizzes/QuizzesApi";

const EditQuizesModal = ({ setEditModal, editModal }) => {
  const { data: videos } = useGetVideosQuery();
  const [updateQuiz, { isLoading }] = useUpdateQuizMutation();

  const { editing } = useSelector((state) => state.assignment);
  const [video, setVideo] = useState("");

  const [correctAnswer, setCorrectAnswer] = useState(null);

  console.log(editing);
  const handleSubmit = (e) => {
    e.preventDefault();

    let selectedVideo = null;
    if (video) {
      selectedVideo = JSON.parse(video);
    }

    const form = e.target;

    const question = form.question.value;
    const optionA = form.option1.value;
    const optionB = form.option2.value;
    const optionC = form.option3.value;
    const optionD = form.option4.value;

    const editData = {
      question,
      video_id: selectedVideo ? selectedVideo.id : editing?.video_id,
      video_title: selectedVideo ? selectedVideo.title : editing?.video_title,
      options: [
        {
          id: 1,
          option: optionA,
          isCorrect:
            correctAnswer === "A"
              ? true
              : editing?.options[0]?.isCorrect
              ? true
              : false,
        },
        {
          id: 2,
          option: optionB,
          isCorrect:
            correctAnswer === "B"
              ? true
              : editing?.options[1]?.isCorrect
              ? true
              : false,
        },
        {
          id: 3,
          option: optionC,
          isCorrect:
            correctAnswer === "C"
              ? true
              : editing?.options[2]?.isCorrect
              ? true
              : false,
        },
        {
          id: 4,
          option: optionD,
          isCorrect:
            correctAnswer === "D"
              ? true
              : editing?.options[3]?.isCorrect
              ? true
              : false,
        },
      ],
    };

    updateQuiz({ id: editing?.id, editData }).then((res) => {
      if (res.data) {
        form.reset();
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
                  Value={editing?.question}
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
                  Value={editing?.options[0]?.option}
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
                  Value={editing?.options[1]?.option}
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
                  Value={editing?.options[2]?.option}
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
                  Value={editing?.options[3]?.option}
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

                <option selected={editing?.options[0]?.isCorrect} value="A">
                  A
                </option>
                <option selected={editing?.options[1]?.isCorrect} value="B">
                  B
                </option>
                <option selected={editing?.options[2]?.isCorrect} value="C">
                  C
                </option>
                <option selected={editing?.options[3]?.isCorrect} value="D">
                  D
                </option>
              </select>
            </div>

            <div>
              <button
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

export default EditQuizesModal;
