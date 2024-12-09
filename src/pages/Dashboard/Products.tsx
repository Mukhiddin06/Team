import { useGetProductsQuery } from "../../hooks/useDashboard";

const Products = () => {
  const { data = [] } = useGetProductsQuery();

  return <div>Products</div>;
};

export default Products;
