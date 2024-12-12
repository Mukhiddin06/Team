import { LoadingOutlined } from "@ant-design/icons";
import NotFound from "../../components/NotFound/NotFound";
import { useGetCategoriesQuery } from "../../hooks/useCategories";
import { CategoryTypes } from "../../types";
import { useEffect, useState } from "react";

const Categories = () => {
  const [categoriesData, setCategoriesData] = useState<CategoryTypes[]>([]);
  const { data: categories = [], isPending, isError } = useGetCategoriesQuery();

  useEffect(() => {
    if (categories) setCategoriesData(categories?.data?.categories);
  }, [isPending]);

  return (
    <div className="w-[30%] bg-gray-200 h-full rounded">
      {isPending ? (
        <LoadingOutlined />
      ) : isError ? (
        <p>Error...</p>
      ) : categoriesData ? (
        categoriesData.map((category: CategoryTypes) => (
          <p key={category.id}>{category.name}</p>
        ))
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default Categories;
