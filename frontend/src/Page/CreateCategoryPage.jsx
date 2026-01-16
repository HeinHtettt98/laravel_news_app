import React, { useState } from "react";
import { useStoreCategoryMutation } from "../store/services/endpoint/categoryEndpoint";
import { Spinner } from "@chakra-ui/react";

const CreateCategoryPage = () => {
  const [name, setName] = useState("");
  const [storeCategory, { isLoading, isSuccess, error, isError }] =
    useStoreCategoryMutation();

  // generate slug from name
  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await storeCategory({
      name,
      slug: name.toLocaleLowerCase(),
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Create Category
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category Name
            </label>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="e.g. Breaking News"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Error */}
          {isError && <p className="text-sm text-red-500">There is something wrong</p>}
          {isSuccess && <p className="text-sm text-green-500">There is something True</p>}



          {/* Button */}
          <button
            type="submit"
            // disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 rounded-lg transition disabled:opacity-60"
          >
            {isLoading ? <Spinner /> : "Create Category"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCategoryPage;
