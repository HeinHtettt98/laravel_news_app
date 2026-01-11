import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useShowQuery } from "../store/services/endpoint/newsEndpoint";
// import axios from "axios";

const NewsDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError, isSuccess } = useShowQuery(id);
  const nav = useNavigate();
  useEffect(() => {
    if (isError) {
      nav("/");
    }
  }, [isError, nav]);

  return (
    <div>
      {isLoading ? (
        <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
          <div className="max-w-3xl w-full bg-white rounded-xl shadow-md p-6 animate-pulse">
            {/* Image Skeleton */}
            <div className="w-full h-64 bg-gray-300 rounded-lg mb-4" />

            {/* Title Skeleton */}
            <div className="h-8 bg-gray-300 rounded w-3/4 mb-3" />

            {/* Description Skeleton */}
            <div className="space-y-2 mb-6">
              <div className="h-4 bg-gray-300 rounded w-full" />
              <div className="h-4 bg-gray-300 rounded w-full" />
              <div className="h-4 bg-gray-300 rounded w-5/6" />
            </div>

            {/* Comments Section */}
            <div className="mt-10">
              <div className="h-6 bg-gray-300 rounded w-1/3 mb-4" />

              {/* Comment Skeletons */}
              <div className="space-y-3 mb-6">
                <div className="h-12 bg-gray-200 rounded-lg" />
                <div className="h-12 bg-gray-200 rounded-lg" />
              </div>

              {/* Textarea Skeleton */}
              <div className="h-24 bg-gray-200 rounded-lg mb-3" />

              {/* Button Skeleton */}
              <div className="h-10 bg-gray-300 rounded-lg w-40" />
            </div>

            {/* Back Link Skeleton */}
            <div className="h-5 bg-gray-300 rounded w-32 mt-6" />
          </div>
        </div>
      ) : isError ? (
        <div>Error loading news item.</div>
      ) : isSuccess ? (
        <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
          <div className="max-w-3xl w-full bg-white rounded-xl shadow-md p-6">
            <img
              src={import.meta.env.VITE_BACKEND_ACCESS_URL + data.image}
              alt={data.title}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />

            <h1 className="text-3xl font-bold mb-3">{data.title}</h1>

            <p className="text-gray-700 leading-relaxed mb-6">
              {data.description}
            </p>
            <div className="mt-10">
              <h2 className="text-2xl font-semibold mb-3">Comments</h2>

              {/* Comment List */}
              <div className="space-y-3 mb-6">
                <div className="p-3 bg-gray-100 rounded-lg">Great data!</div>
                <div className="p-3 bg-gray-100 rounded-lg">
                  Thanks for sharing.
                </div>
              </div>

              {/* Add Comment Box */}
              <textarea
                placeholder="Write a comment..."
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                rows="3"
              ></textarea>

              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Post Comment
              </button>
            </div>
            <div
              onClick={() => nav(-1)}
              className="text-blue-600 hover:underline text-lg"
            >
              ← Back to Home
            </div>
          </div>
        </div>
      ) : (
        <div>Unknow State</div>
      )}
    </div>
  );
};

export default NewsDetailPage;
