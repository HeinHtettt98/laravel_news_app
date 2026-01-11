import React from "react";
import { useNewsByUserQuery } from "../store/services/endpoint/userEndpoint";
import NewsDashboardComponents from "../components/NewsDashboardComponents";
import { useSearchParams } from "react-router-dom";

const UserManagePostPage = () => {
  const [searchParams] = useSearchParams();
  const { data, isLoading, isSuccess, isError } = useNewsByUserQuery(searchParams.toString());
  return (
    <div>
      <NewsDashboardComponents
        isLoading={isLoading}
        isError={isError}
        isSuccess={isSuccess}
        data={data}
      />
    </div>
  );
};

export default UserManagePostPage;
