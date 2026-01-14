import React from "react";
import { RiArrowRightDoubleLine } from "react-icons/ri";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
const PaginationComponent = ({ last_page, current_page }) => {
  const [searchParams] = useSearchParams();
  const { pathname, search } = useLocation();
  const nav = useNavigate();
  let n = last_page;
  const paginationHandle = (page) => {
    // const newPage = data.selected + 1;
    // const searchParams = new URLSearchParams(search);
    searchParams.set("page", page);
    // searchParams.delete("id");
    nav(`${pathname}?${searchParams.toString()}`);
  };
  return (
    <div className="w-full flex justify-center my-10">
      <nav className="mx-auto" aria-label="Page navigation example">
        <ul className="flex -space-x-px text-sm">
          <li onClick={() => {
            if (current_page > 1) {
                paginationHandle(current_page - 1)
            }
          }}>
            <div
              className="flex items-center justify-center text-blue-400 font-bold bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading rounded-s-base text-sm w-10 h-10 focus:outline-none"
            >
              <span className="sr-only">Previous</span>
              <MdKeyboardDoubleArrowLeft className="w-5 h-5" />
            </div>
          </li>
          {Array.from({ length: n }, (_, i) => i + 1).map((page) => (
            <li key={page} onClick={() => paginationHandle(page)}>
              <span className={`flex items-center justify-center ${page == current_page ? "text-blue-600 font-bold text-xl": "text-blue-400"} font-bold bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading text-sm w-10 h-10 focus:outline-none`}>
                {page}
              </span>
            </li>
          ))}
         <li onClick={() => {
             if (current_page < last_page) {
                paginationHandle(current_page + 1)
            }
          }}>
            <div
              className="flex items-center justify-center text-blue-400 font-bold bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading rounded-s-base text-sm w-10 h-10 focus:outline-none"
            >
              <span className="sr-only">Next</span>
              <RiArrowRightDoubleLine className="w-5 h-5" />
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default PaginationComponent;
