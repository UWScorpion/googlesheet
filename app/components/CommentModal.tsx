import { useEffect, useState } from "react";
import { BiCommentAdd } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { Column, Comment } from "../common/constants";
interface CommentModalProps {
  column: Column;
  rowNumber: number;
}

const CommentModal = ({ column, rowNumber }: CommentModalProps) => {
  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState({} as Comment);

  const handleSave = async () => {
    if (!column.columnNum) {
      return;
    }
    if (!column.comments){
      column.comments = [];
    }
    column.comments.push(comment);
    setShowModal(false);
    const req = new Request(
      `/api/comment?range=${column.columnNum}${rowNumber}`
    );
    const response = await fetch(req, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(JSON.stringify(column.comments)),
    });
    setComment({});
    return response;

  };
  return (
    <div>
      <button type="button" onClick={() => setShowModal(true)}>
        <BiCommentAdd />
      </button>
      <div>
        {column.comments && column.comments.length ? <div>{column.comments.length} comments</div>:null}
      </div>
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">Comment</h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setShowModal(false)}
                  >
                    <span>
                      <IoMdClose />
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <form>
                    <label className="block text-black text-sm font-bold mb-1">
                      Comment Type
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                    <label className="block text-black text-sm font-bold mb-1">
                      Comment
                    </label>
                    <textarea
                      value={comment.comment}
                      onChange={(e) =>
                        setComment({ ...comment, comment: e.target.value })
                      }
                      className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                    />
                  </form>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="text-white bg-blue-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => handleSave()}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default CommentModal;
