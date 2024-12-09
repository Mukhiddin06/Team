import { Button } from "antd";
import ProductTable from "../../components/ProductTable";

const Products = () => {
  return (
    <>
      <div className="flex items-center justify-between py-4">
        <h2 className="text-[26px] font-bold">Products</h2>
        <Button size="large" icon={'+'}>Create Products</Button>
      </div>
      <ProductTable />
    </>
  );
};

export default Products;
