import Footer from "../components/Footer";
import { useGetNewsQuery } from "../store/services/endpoint/newsEndpoint";
import { useSearchParams } from "react-router-dom";
import NewsDashboardComponents from "../components/NewsDashboardComponents";

const HomePage = () => {
  const [searchParams] = useSearchParams();
  // const category = searchParams.get("category");
  const { data, isLoading, isSuccess, isError } = useGetNewsQuery(
    searchParams.toString()
  );
  // console.log(searchParams.toString())
  return (
    <div>
      <NewsDashboardComponents
        isLoading={isLoading}
        isError={isError}
        isSuccess={isSuccess}
        data={data}
      />
      <Footer />
    </div>
  );
};

export default HomePage;
