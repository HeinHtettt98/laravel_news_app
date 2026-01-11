import { Button, Spinner } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { formatDistanceToNow, parseISO } from "date-fns";
import { GrDocumentUpdate } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDeleteMutation } from "../store/services/endpoint/newsEndpoint";

const NewsCard = ({ image, title, description, id, created_at }) => {
  const [deleteNews, { data, isLoading, isError, isSucess }] =
    useDeleteMutation();
  const { pathname, search } = useLocation();
  const nav = useNavigate();
  const date = parseISO(created_at);
  const formattedDate = formatDistanceToNow(date, { addSuffix: true });
  return (
    <div
      onClick={() => nav(`/news/${id}`)}
      className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer"
    >
      <div className="w-full h-48 overflow-hidden">
        <img
          src={`${import.meta.env.VITE_BACKEND_ACCESS_URL}${image}`}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 space-y-2">
        <h2 className="text-xl font-semibold leading-tight line-clamp-2">
          {title}
        </h2>

        <p className="text-gray-600 text-sm line-clamp-3">{description}</p>
        <div className="flex justify-between items-center">
          <div>
            {pathname == "/user/manage-posts" && (
              
                <Button
                  rightIcon={<RiDeleteBin6Line />}
                  colorScheme="red"
                  variant="outline"
                  onClick={async (e) => {
                    e.stopPropagation();
                    await deleteNews(id);
                  }}
                >
                  {isLoading ? <Spinner /> : "Delete"}
                </Button>
              
            )}
          </div>
          <p className=" text-sm text-gray-400">{formattedDate}</p>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
