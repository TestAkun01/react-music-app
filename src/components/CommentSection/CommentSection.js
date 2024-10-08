"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import FetchData from "../FetchData/FetchData";
import Image from "next/legacy/image";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ReplyIcon from "@mui/icons-material/Reply";

export default function CommentSection({ albumId }) {
  const { data: session } = useSession();
  const [text, setText] = useState("");
  const [isSend, setIsSend] = useState(false);
  const [comments, setComments] = useState([]);
  const [activeCommentId, setActiveCommentId] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [replyCommentId, setReplyCommentId] = useState(null);

  const fetchComments = async () => {
    await FetchData(`/api/comment?albumId=${albumId}`).then((data) => {
      setComments(data);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSend((prev) => !prev);
    await FetchData("/api/comment", "", "POST", {
      albumId,
      userId: session.user.id,
      text,
    }).then(() => {
      setIsSend((prev) => !prev);
      setText("");
      fetchComments();
    });
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    await FetchData(`/api/comment/${replyCommentId}/reply`, "", "POST", {
      userId: session.user.id,
      text: replyText,
    }).then(() => {
      setReplyText("");
      setReplyCommentId(null);
      fetchComments();
    });
  };

  useEffect(() => {
    fetchComments();
  }, [albumId]);

  const handleDropdownToggle = (commentId) => {
    setActiveCommentId(activeCommentId === commentId ? null : commentId);
  };

  const handleReplyClick = (commentId) => {
    setReplyCommentId((prevId) => (prevId === commentId ? null : commentId));
  };

  const handleEdit = async (commentId) => {
    const newText = prompt("Edit your comment:");
    if (newText) {
      await FetchData(`/api/comment/${commentId}`, "", "PUT", { text: newText })
        .then(() => {
          fetchComments();
        })
        .catch((error) => {
          console.error("Failed to update comment:", error);
        });
    }
  };

  const handleRemove = async (commentId) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this comment?"
    );
    if (confirmDelete) {
      await FetchData(`/api/comment/${commentId}`, "", "DELETE")
        .then(() => {
          fetchComments();
        })
        .catch((error) => {
          console.error("Failed to delete comment:", error);
        });
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg lg:text-3xl text-gray-900 dark:text-white">
          Discussion ({comments.length})
        </h2>
      </div>
      {session ? (
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="py-2 px-4 mb-4 rounded-lg rounded-t-lg border bg-gray-800 border-gray-700">
            <textarea
              rows="6"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className={`w-full text-sm border-0 focus:ring-0 focus:outline-none text-white placeholder-gray-400 bg-gray-800`}
              placeholder="Write a comment..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className={`inline-flex items-center py-2.5 px-4 text-xs font-medium text-center bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-900 hover:bg-blue-800 ${
              isSend ? "disable" : ""
            }`}
          >
            Post comment
          </button>
        </form>
      ) : (
        <p className="text-red-500">You must be logged in to comment.</p>
      )}
      <hr className="my-4 border-gray-400" />

      <div className="my-4 w-full space-y-2">
        {comments?.map((comment) => (
          <article
            key={comment._id}
            className="p-6 text-base rounded-lg bg-gray-900"
          >
            <footer className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-x-4">
                <div className="inline-flex items-center text-sm text-white font-semibold">
                  <div className="relative mr-2 w-8 h-8 rounded-full overflow-hidden">
                    <Image
                      src={comment.userId.image}
                      alt={comment.userId.email}
                      layout={"fill"}
                    />
                  </div>
                  {comment.userId.email}
                </div>
                <p className="text-sm text-gray-400">
                  <time
                    pubdate={"true"}
                    dateTime={comment.createdAt}
                    title={new Date(comment.createdAt).toLocaleDateString()}
                  >
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </time>
                </p>
              </div>
              {session && (
                <div className="relative">
                  <button
                    onClick={() => handleDropdownToggle(comment._id)}
                    className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 rounded-lg bg-gray-900 hover:bg-gray-700"
                    type="button"
                  >
                    <MoreHorizIcon />
                  </button>
                  {/* Dropdown menu */}
                  <div
                    className={`absolute z-10 w-36 rounded divide-y shadow bg-gray-700 divide-gray-600 ${
                      activeCommentId === comment._id ? "block" : "hidden"
                    }`}
                    style={{
                      top: "130%",
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}
                  >
                    <ul className="py-1 text-sm text-gray-200 ">
                      <li>
                        <button
                          onClick={() => handleEdit(comment._id)}
                          className="block text-start w-full py-2 px-4 hover:bg-gray-600 hover:text-white"
                        >
                          Edit
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleRemove(comment._id)}
                          className="block text-start w-full py-2 px-4 hover:bg-gray-600 hover:text-white"
                        >
                          Remove
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </footer>
            <p className="text-gray-400">{comment.text}</p>
            {session && (
              <div className="flex items-center mt-4 space-x-4">
                <button
                  type="button"
                  onClick={() => handleReplyClick(comment._id)}
                  className="flex items-center text-sm hover:underline text-gray-400 font-medium"
                >
                  <ReplyIcon />
                  Reply
                </button>
              </div>
            )}

            {/* Reply Form */}
            {replyCommentId === comment._id && (
              <form onSubmit={handleReplySubmit} className="mt-2">
                <div className="py-2 px-4 mb-4 rounded-lg rounded-t-lg border bg-gray-800 border-gray-700">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write a reply..."
                    required
                    className={`w-full text-sm border-0 focus:ring-0 focus:outline-none text-white placeholder-gray-400 bg-gray-800`}
                  />
                </div>
                <button
                  type="submit"
                  className={`inline-flex items-center py-2.5 px-4 text-xs font-medium text-center bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-900 hover:bg-blue-800`}
                >
                  Post Reply
                </button>
              </form>
            )}

            {/* Display Replies */}
            <div className="ml-8 mt-4">
              {comment.replies.map((reply) => (
                <div key={reply._id} className="mb-8">
                  <div className="flex items-center gap-x-4 mb-2">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden mr-2">
                      <Image
                        src={reply.userId.image}
                        alt={reply.userId.email}
                        layout={"fill"}
                      />
                    </div>
                    <p className="text-white font-semibold">
                      {reply.userId.email}
                    </p>
                    <p className="text-sm text-gray-400">
                      <time
                        pubdate={"true"}
                        dateTime={comment.createdAt}
                        title={new Date(comment.createdAt).toLocaleDateString()}
                      >
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </time>
                    </p>
                  </div>
                  <p className="text-gray-400">{reply.text}</p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
