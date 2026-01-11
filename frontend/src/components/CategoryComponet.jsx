import { IoMdFootball } from "react-icons/io";
import { TiThSmall } from "react-icons/ti";
import { MdEmojiEvents } from "react-icons/md";
import { BiWorld } from "react-icons/bi";
import { MdHealthAndSafety } from "react-icons/md";
import { FaRegNewspaper } from "react-icons/fa6";
import { useGetCategoriesQuery } from "../store/services/endpoint/categoryEndpoint";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import NewsSortingComponents from "./NewsSortingComponents";

const CategoryComponet = () => {
  const { data, isLoading, isError, isSuccess } = useGetCategoriesQuery();
  const [choosenCategory, setChosenCategory] = useState("all");
  const { pathname } = useLocation();
  const nav = useNavigate();
  const iconMap = {
    Football: IoMdFootball,
    International: BiWorld,
    Local: FaRegNewspaper,
    Health: MdHealthAndSafety,
    Entertainment: MdEmojiEvents,
  };

  return (
    <div
      className={`flex ${
        pathname == "/user/manage-posts" ? "justify-between" : "justify-center"
      } items-center bg-white`}
    >
      <div className="z-20 h-16 w-6/12 rounded-3xl bg-neutral-primary-soft border border-blue-400">
        {isLoading ? (
          <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center gap-2 animate-pulse"
              >
                <div className="w-6 h-6 rounded-full bg-gray-300" />
                <div className="w-14 h-3 rounded bg-gray-300" />
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center text-center mt-4">
            <div className="mb-2 text-3xl">⚠️</div>
          </div>
        ) : data?.length > 0 ? (
          <div className="grid h-full max-w-lg grid-cols-6 mx-auto font-medium">
            <button
              onClick={() => {
                nav("/");
                setChosenCategory("all");
              }}
              type="button"
              className="inline-flex flex-col items-center justify-center px-5 hover:bg-neutral-secondary-medium group"
            >
              <TiThSmall
                className={`w-5 h-5 group-hover:text-fg-brand ${
                  choosenCategory === "all"
                    ? "text-blue-600 font-semibold"
                    : "text-gray-500"
                }`}
              />
              <span
                className={`text-sm text-body text-blue-500 group-hover:text-fg-brand ${
                  choosenCategory === "all"
                    ? "border-b border-blue-500 font-semibold"
                    : ""
                }`}
              >
                All
              </span>
            </button>
            {data?.map((category) => {
              const Icon = iconMap[category.name];
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    nav(`/?category=${category.name}`);
                    setChosenCategory(category.name);
                  }}
                  type="button"
                  className="inline-flex flex-col items-center justify-center px-5 hover:bg-neutral-secondary-medium group"
                >
                  {Icon && (
                    <Icon
                      className={`w-6 h-6 group-hover:text-fg-brand ${
                        choosenCategory === category.name
                          ? "text-blue-600 font-semibold"
                          : "text-gray-500"
                      }`}
                    />
                  )}
                  <span
                    className={`text-sm text-body text-blue-500 group-hover:text-fg-brand ${
                      choosenCategory === category.name
                        ? "border-b border-blue-500 font-semibold"
                        : ""
                    }`}
                  >
                    {category.name}
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <p>There is no data</p>
        )}
      </div>
      {pathname == "/user/manage-posts" && <NewsSortingComponents />}
    </div>
  );
};

export default CategoryComponet;
