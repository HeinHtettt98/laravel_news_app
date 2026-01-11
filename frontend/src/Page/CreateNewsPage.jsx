import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStoreMutation } from "../store/services/endpoint/newsEndpoint";
import { Spinner } from "@chakra-ui/react";

const CreateNewsPage = () => {
  const [storeNews, { isLoading, isSuccess, error, isError }] =
    useStoreMutation();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    journalist_name: "",
  });
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const nav = useNavigate();
  useEffect(() => {
    if (isError) {
      console.log("first", error);
    }
    if (isSuccess) {
      nav("/");
    }
  }, [isSuccess, isError]);
  // console.log("categoryId", file);
  const data = [
    {
      id: 1,
      name: "Football",
    },
    {
      id: 2,
      name: "International",
    },
    {
      id: 3,
      name: "Local",
    },
    {
      id: 4,
      name: "Health",
    },
    {
      id: 5,
      name: "Entertainment",
    },
  ];
  // console.log("isError", error);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const uplodeHandel = (e) => {
    let image = e.target.files[0];
    setFile(image);
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      setPreview(e.target.result);
    };
    fileReader.readAsDataURL(image);
  };

  const handleSubmit = async (e) => {
    if (!categoryId) {
      alert("Please select a category.");
      return;
    }
    if (!file) {
      alert("Please upload an image.");
      return;
    }
    e.preventDefault();
    const news = new FormData();
    news.append("title", formData.title);
    news.append("image", file);
    news.append("description", formData.description);
    news.append("journalist_name", formData.journalist_name);
    news.append("category_id", categoryId);
    news.append("slug", data[categoryId - 1].name.toLowerCase());
    // console.log(data[categoryId - 1].name.toLowerCase());
    await storeNews(news);
    // Submit newsData to the backend API
  };
  return (
    <div className="min-h-screen flex items-center mt-20 justify-center bg-gray-300 p-6">
      <div className="w-full max-w-xl bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-4">Create News</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Journalist Name</label>
            <input
              type="text"
              name="journalist_name"
              value={formData.journalist_name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>

          <div>
            <label className="block font-medium mb-1">Upload Image</label>
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mb-2 w-full h-48 object-cover rounded-lg"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={uplodeHandel}
              className="w-full"
              required
            />
          </div>

          <div className="w-64">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Category
            </label>

            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="
            w-full h-10 px-3 rounded-md border border-gray-300
            bg-white text-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500
            focus:border-blue-500
          "
            >
              <option value="">Select category</option>

              {data.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {isLoading ? <Spinner /> : "Submit News"}
          </button>
        </form>

        <Link
          to="/"
          className="inline-block mt-4 text-blue-600 hover:underline"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default CreateNewsPage;
