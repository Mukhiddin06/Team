import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import type { TableColumnsType } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { BrandsType } from "../types";
import { useGetBrandsQuery } from "../hooks/useBrands";
import { TableProps } from "antd/lib";

const columns: TableColumnsType<BrandsType> = [
  {
    title: "#",
    dataIndex: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Description",
    dataIndex: "description",
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
    className: "flex items-end justify-center text-center",
  },
];

const BrandTable: React.FC = () => {
  const [current, setCurrent] = useState<number | undefined>(1);
  const [brands, setBrands] = useState<BrandsType[]>([]);
  const { data = [], isPending } = useGetBrandsQuery({
    page: current ? current : 1,
    limit: 5,
    search: "",
  });


  useEffect(() => {
    if(data){
      setBrands(
        data?.brands?.map((item: BrandsType) => ({
          key: item.id,
         ...item,
        }))?? []
      );
    }
  }, [isPending]);

  const onChange: TableProps<BrandsType>["onChange"] = (pagination) => {
    setCurrent(pagination.current);
  };

  return (
    <Table<BrandsType>
      columns={columns}
      loading={isPending}
      dataSource={brands}
      pagination={{ total: data?.count, pageSize: 5, current: current }}
      onChange={onChange}
    />
  );
};

export default BrandTable;
