import React, { useEffect } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Spinner,
} from "@chakra-ui/react";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { MdNotificationAdd } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../store/services/endpoint/userEndpoint";
import { destoryUser } from "../store/services/slice/userSlice";

const UserDrawerComponent = ({ isOpen, onClose }) => {
  const { name, email, avatar } = useSelector((state) => state.user);
  const [logout, { data, isLoading, isError, isSuccess }] = useLogoutMutation();
  const nav = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isSuccess) {
      dispatch(destoryUser());
      nav("/");
    }
  }, [isSuccess]);
  return (
    <Drawer
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
      // finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <div className="flex space-x-3 first:">
            <div>
              <AvatarGroup spacing="1rem">
                {avatar ? (
                  <Avatar
                    src={import.meta.env.VITE_BACKEND_ACCESS_URL + avatar}
                  />
                ) : (
                  <Avatar bg="blue.500" />
                )}
              </AvatarGroup>
            </div>
            <div>
              <p className="font-headingg">{name}</p>
              <p className="text-sm text-gray-500 font-bodyy">{email}</p>
            </div>
          </div>
        </DrawerHeader>

        <DrawerBody>
          <div className="space-y-4 flex flex-col mb-14">
            <button
              onClick={() => nav("user/edit-profile")}
              className="flex w-full items-center justify-between hover:cursor-pointer hover:bg-blue-300 px-2 rounded-md focus:text-blue-800"
            >
              <p className=" font-bodyy font-semibold">Edit Profile</p>
            </button>
            <button
              onClick={() => nav("/create-post")}
              className="font-bodyy flex w-full items-center justify-between font-semibold hover:cursor-pointer hover:bg-blue-300 px-2 rounded-md focus:text-blue-800"
            >
              <p className=" font-bodyy font-semibold">Post News</p>
              <MdNotificationAdd className="text-white hidden" />
            </button>
            <button
              onClick={() => nav("user/manage-posts")}
              className="font-bodyy flex w-full items-center justify-between font-semibold hover:cursor-pointer hover:bg-blue-300 px-2 rounded-md focus:text-blue-800"
            >
              <p className=" font-bodyy font-semibold"> Manage Posts</p>
              <MdNotificationAdd className="hidden text-xl" />
            </button>

            <button className="flex w-full items-center justify-between hover:cursor-pointer hover:bg-blue-300 px-2 rounded-md focus:text-blue-800">
              <p className=" font-bodyy font-semibold">Notification</p>
              <MdNotificationAdd className="text-red-400 text-xl" />
            </button>
            <button
              onClick={() => logout()}
              className="flex w-full items-center justify-between hover:cursor-pointer hover:bg-blue-300 px-2 rounded-md focus:text-blue-800"
            >
              <div className="flex w-full items-center justify-between ">
                {isLoading ? (
                  <Spinner size="sm" />
                ) : (
                  <p className=" font-bodyy font-semibold">Logout</p>
                )}
                <MdLogout className="text-gray-900 text-base" />
              </div>
            </button>
          </div>
          <div>
            <p className="text-blue-600 font-headingg text-base">Value :</p>
            <Textarea
              borderColor="gray.500"
              size={"sm"}
              placeholder="Descript Your Through"
            />
          </div>
          <p className="font-bodyy text-sm mt-4 text-center text-gray-400">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos
            minima expedita quidem aliquam veritatis reprehenderit iure,
            delectus perferendis facilis saepe.
          </p>
        </DrawerBody>

        <DrawerFooter>
          <AvatarGroup width={"full"} size="md" max={2}>
            <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
            <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
            <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
            <Avatar
              name="Prosper Otemuyiwa"
              src="https://bit.ly/prosper-baba"
            />
            <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
          </AvatarGroup>
          <p className="font-bodyy font-semibold text-sm text-blue-500">
            Active
          </p>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default UserDrawerComponent;
