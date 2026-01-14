import React from "react";
import CategoryComponet from "./CategoryComponet";
import NewsCard from "./NewsCard";
import PaginationComponent from "./PaginationComponent";
import { Link, useLocation } from "react-router-dom";

const NewsDashboardComponents = ({isLoading,isError,data,isSuccess}) => {
  const { pathname, search } = useLocation();
  return (
    <div className=" container mx-auto">
      <div className="mt-20 ">
        <CategoryComponet />
      </div>
      <div className="mt-16">
        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-xl border bg-white p-4 shadow-sm"
              >
                <div className="h-48 w-full rounded-lg bg-gray-200" />
                <div className="mt-4 h-4 w-3/4 rounded bg-gray-200" />
                <div className="mt-2 h-3 w-full rounded bg-gray-200" />
                <div className="mt-2 h-3 w-5/6 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="flex flex-col items-center justify-center text-center mt-20">
            <div className="mb-4 text-5xl">⚠️</div>
            <h2 className="text-xl font-semibold text-gray-800">
              Something went wrong
            </h2>
            <p className="mt-2 text-gray-500">
              Failed to load news. Please try again later.
            </p>
          </div>
        )}

        {/* Success State */}
        {isSuccess && data?.data?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data?.data?.map((n, i) => (
              <NewsCard
                key={i}
                id={n.id}
                image={n.image}
                title={n.title}
                description={n.description}
                created_at={n.created_at}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {isSuccess && data?.data?.length === 0 && (
          <div className="flex flex-col items-center justify-center text-center mt-20">
            <div className="mb-4 text-5xl">📰</div>
            <h2 className="text-xl font-semibold text-gray-800">
              No news available
            </h2>
            <p className="mt-2 text-gray-500">
              {pathname == "/user/manage-posts" ? (<Link to={'/create-post'} className="text-blue-500 font-semibold underline">Post some news</Link>) :
              "Please check back later for updates."}
            </p>
          </div>
        )}
      </div>
      <PaginationComponent
        last_page={data?.meta?.last_page}
        current_page={data?.meta?.current_page}
      />
    </div>
  );
};

export default NewsDashboardComponents;
