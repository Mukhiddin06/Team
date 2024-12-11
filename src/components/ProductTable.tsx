import React, { useState } from "react";
import { Button, Table } from "antd";
import type { TableColumnsType } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { ProductType } from "../types";
import { useGetProductsQuery } from "../hooks/useDashboard";
import { TableProps } from "antd/lib";

const columns: TableColumnsType<ProductType> = [
  {
    title: "#",
    dataIndex: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Price",
    dataIndex: "price",
  },
  {
    title: "Actions",
    render: (_, record) => {
      return (
        <div className="flex items-center space-x-4">
          <Button type="default" onClick={() => console.log(record)}>
            <EllipsisOutlined className="scale-125" />
          </Button>
          <Button type="default" onClick={() => console.log(record)}>
            <EditOutlined className="scale-125" />
          </Button>
          <Button type="default" onClick={() => console.log(record)}>
            <DeleteOutlined className="scale-125" />
          </Button>
        </div>
      );
    },
    className: "flex items-end justify-center text-center" 
  },
];

const ProductTable: React.FC = () => {
  const [current, setCurrent] = useState<number | undefined>(1);
  const { data = [], isPending } = useGetProductsQuery({
    page: current ? current : 1,
    limit: 5,
    search: "",
  });

  const onChange: TableProps<ProductType>["onChange"] = (pagination) => {
    setCurrent(pagination.current);
  };

  return (
    <Table<ProductType>
      columns={columns}
      loading={isPending}
      dataSource={data.products}
      pagination={{ total: data.count, pageSize: 5, current: current }}
      onChange={onChange}
    />
  );
};

export default ProductTable;
