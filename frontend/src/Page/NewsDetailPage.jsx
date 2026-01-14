import { useEffect, useRef, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  useCommentMutation,
  useShowQuery,
} from "../store/services/endpoint/newsEndpoint";
import { useSelector } from "react-redux";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";

const NewsDetailPage = () => {
  const { id } = useParams();
  const { name, photo, id: userId } = useSelector((state) => state.user);
  const { data, isLoading, isError, isSuccess } = useShowQuery(id);
  const [
    storeComment,
    {
      isLoading: commentLoading,
      isSuccess: commentSuccess,
      isError: commentError,
    },
  ] = useCommentMutation();
  const [comment, setComment] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const nav = useNavigate();
  useEffect(() => {
    if (isError) {
      nav("/");
    }
  }, [isError, nav]);
  const commentHandle = async () => {
    if (name == "") {
      onOpen();
      return;
    }
    await storeComment({
      author_name: name,
      comment,
      new_id: id,
    });
  };
  console.log("comment", data);

  return (
    <div className="min-h-screen mt-20 bg-gray-100">
      {isLoading ? (
        <div className="flex justify-center px-4 py-10">
          <div className="w-full max-w-4xl bg-white rounded-2xl shadow-sm p-6 animate-pulse">
            <div className="h-72 bg-gray-200 rounded-xl mb-6" />
            <div className="h-9 bg-gray-200 rounded w-4/5 mb-4" />
            <div className="space-y-3 mb-8">
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
            </div>

            <div className="border-t pt-6">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-4" />
              <div className="space-y-3 mb-6">
                <div className="h-12 bg-gray-100 rounded-lg" />
                <div className="h-12 bg-gray-100 rounded-lg" />
              </div>
              <div className="h-24 bg-gray-100 rounded-lg mb-4" />
              <div className="h-10 bg-gray-200 rounded-lg w-36" />
            </div>
          </div>
        </div>
      ) : isError ? (
        <div className="text-center text-red-500 py-20">
          Failed to load news details.
        </div>
      ) : isSuccess ? (
        <div className="flex justify-center px-4 py-10">
          <article className="w-full max-w-4xl bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* Image */}
            <img
              src={import.meta.env.VITE_BACKEND_ACCESS_URL + data.image}
              alt={data.title}
              className="w-full h-80 object-cover"
            />

            {/* Content */}
            <div className="p-6 md:p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {data.title}
              </h1>
               <p className="text-gray-400 mb-2 text-sm font-semibold">Author : {data.journalist_name}</p>
              <p className="text-gray-700 leading-relaxed text-lg mb-10">
                {data.description}
              </p>

              {/* Comments */}
              <section className="border-t pt-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Comments
                </h2>

                {/* Comment List */}
                <div className="space-y-4 mb-6">
                  {data?.comments?.map((ment, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 border border-gray-200 rounded-xl p-4"
                    >
                      <p className="text-blue-500 mb-1 font-semibold">
                       {ment.author_name}
                      </p>
                      <p className="text-gray-500">
                        {ment.comment}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Add Comment */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <textarea
                    rows="3"
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write your comment..."
                    className="w-full bg-transparent resize-none text-gray-800 placeholder-gray-400 focus:outline-none"
                  />
                  <div className="flex justify-end mt-3">
                    <button
                      onClick={commentHandle}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg transition"
                    >
                      {commentLoading ? <Spinner /> : " Post Comment"}
                    </button>
                  </div>
                </div>
              </section>

              {/* Back */}
              <button
                onClick={() => nav(-1)}
                className="mt-8 inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 font-medium"
              >
                ← Back to Home
              </button>
            </div>
          </article>
        </div>
      ) : (
        <div className="text-center py-20">Unknown state</div>
      )}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Dear Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              You can't comment this news without{" "}
              <Link
                to={"/login"}
                className="text-blue-600 font-semibold underline"
              >
                login
              </Link>
              . Don't have an account. Please,{" "}
              <Link
                to={"/register"}
                className="text-blue-600 font-semibold underline"
              >
                Register
              </Link>
              .
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  );
};

export default NewsDetailPage;