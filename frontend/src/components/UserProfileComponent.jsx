import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";
import { useDisclosure } from "@chakra-ui/react";
import UserDrawerComponent from "./UserDrawerComponent";

const UserProfileComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div className="flex space-x-3 text-center items-center">
      <button onClick={onOpen} type="button">
        <FaUser className="text-blue-500 text-lg" />
      </button>
      <UserDrawerComponent isOpen={isOpen} onClose={onClose} />
      <p className="text-blue-500">|</p>
      <MdDarkMode className=" text-xl" />
    </div>
  );
};

export default UserProfileComponent;
