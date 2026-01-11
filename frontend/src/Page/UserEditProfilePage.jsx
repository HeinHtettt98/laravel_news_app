import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  IconButton,
  Spinner,
  Alert,
  AlertIcon,
  useToast,
} from "@chakra-ui/react";

import { FaCamera } from "react-icons/fa6";
import { useUpdateProfileMutation } from "../store/services/endpoint/userEndpoint";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

const UserManagePostPage = () => {
  const toast = useToast();
  const { name, email, avatar } = useSelector((state) => state.user);
  const [userData, setUserData] = useState({
    name: name,
    email: email,
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const nav = useNavigate();

  const [updateProfile, { isLoading, isError, isSuccess, error }] =
    useUpdateProfileMutation();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };
  const handleUserDataChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("avatar", image);
    formData.append("name", userData.name == "" ? name : userData.name);
    formData.append("email", userData.email == "" ? email : userData.email);
    await updateProfile(formData);
  };

  // ✅ Success Toast
  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Profile updated",
        description: "Your changes were saved successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      nav("/");
    }
  }, [isSuccess, toast]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-blue-500 to-pink-500 p-4">
      <Box
        as="form"
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl bg-white/90 backdrop-blur-xl shadow-2xl p-6"
      >
        {/* Avatar Upload */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Avatar
              size="2xl"
              src={
                preview
                  ? preview
                  : import.meta.env.VITE_BACKEND_ACCESS_URL + avatar
              }

              className="ring-4 ring-blue-500"
            />

            <IconButton
              icon={<FaCamera size={18} />}
              size="sm"
              isRound
              isDisabled={isLoading}
              className="!absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => document.getElementById("avatar-input").click()}
            />

            <input
              id="avatar-input"
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        </div>

        {/* Error */}
        {isError && (
          <Alert status="error" mb={4} rounded="md">
            <AlertIcon />
            {error?.data?.message || "Something went wrong"}
          </Alert>
        )}

        {/* Name */}
        <FormControl mb={4} isDisabled={isLoading}>
          <FormLabel className="text-gray-700 font-semibold">
            Full Name
          </FormLabel>
          <Input
            name="name"
            value={userData.name}
            onChange={handleUserDataChange}
            placeholder="John Doe"
            focusBorderColor="blue.500"
          />
        </FormControl>

        {/* Email */}
        <FormControl mb={6} isDisabled={isLoading}>
          <FormLabel className="text-gray-700 font-semibold">
            Email Address
          </FormLabel>
          <Input
            type="email"
            value={userData.email}
            onChange={handleUserDataChange}
            name="email"
            placeholder="john@example.com"
            focusBorderColor="blue.500"
          />
        </FormControl>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            type="submit"
            colorScheme="blue"
            className="flex-1"
            isDisabled={isLoading}
          >
            {isLoading ? <Spinner size="sm" /> : "Save Changes"}
          </Button>

          <Button variant="outline" className="flex-1" isDisabled={isLoading}>
            Cancel
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default UserManagePostPage;
