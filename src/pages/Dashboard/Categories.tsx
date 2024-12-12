import { LoadingOutlined } from "@ant-design/icons";
import NotFound from "../../components/NotFound/NotFound";
import {
  useAddCategoriesQuery,
  useDeleteCategoryQuery,
  useGetCategoriesQuery,
  useUpdateCategoryQuery,
} from "../../hooks/useCategories";
import { CategoryTypes } from "../../types";
import { FormEvent, useEffect, useState } from "react";
import { Button, Drawer, Form, Input } from "antd";
import toast, { Toaster } from "react-hot-toast";
import { data } from "react-router-dom";

const Categories = () => {
  const [categoriesData, setCategoriesData] = useState<CategoryTypes[]>([]);
  const { data: categories = [], isPending, isError } = useGetCategoriesQuery();

  const { mutate: addCategory } = useAddCategoriesQuery();
  const { mutate: deleteCategory } = useDeleteCategoryQuery();
  const { mutate: updateCategory } = useUpdateCategoryQuery();

  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [categoryName, setCategoryName] = useState<string | undefined>("");

  const [updatedId, setUpdatedId] = useState<number | undefined>(undefined);

  const [formType, setFormType] = useState<"add" | "update">("add");

  const closeDrawer = () => {
    setOpenDrawer(false);
  };

  const handleAddCategory = () => {
    if (categoryName && categoryName.trim() === "") {
      alert("Plaese write the name of the category");
      return;
    }
    const newCategory = {
      name: categoryName,
    };

    if (formType == "add") {
      addCategory(newCategory, {
        onSuccess: () => {
          toast.success("Category added successfully!");
          setOpenDrawer(false);
          setCategoryName("");
        },
        onError: () => {
          toast.error(`Error adding category`);
        },
      });
    } else if (formType == "update") {
      const findcategory = categoriesData.find(
        (category: CategoryTypes) => category.id === updatedId
      );

      if (findcategory) {
        const newData = {
          id: updatedId,
          data: {
            name: categoryName,
          },
        };
        updateCategory(newData, {
          onSuccess: () => {
            toast.success("Category updated successfully!");
            setOpenDrawer(false);
            setCategoryName("");
          },
          onError: () => {
            toast.error(`Error updating category`);
          },
        });
      }
    }
  };

  const handleDelete = (id: number) => {
    deleteCategory(id, {
      onSuccess: () => {
        toast.success("Category deleted successfully!");
      },
      onError: () => {
        toast.error(`Error deleting category`);
      },
    });
  };

  const handleUpdate = (updatedCategory: CategoryTypes) => {
    if (updatedCategory) {
      setCategoryName(updatedCategory?.name);
      setUpdatedId(updatedCategory?.id);
    }
    setFormType("update");
    setOpenDrawer(true);
  };

  useEffect(() => {
    if (categories) setCategoriesData(categories?.data?.categories);
  }, [categories]);

  return (
    <div className="h-full w-full">
      <Toaster position="top-right" reverseOrder={false} />
      {isPending ? (
        <div className="w-full flex items-center justify-center h-full">
          <LoadingOutlined className="text-[60px]" />
        </div>
      ) : isError ? (
        <p>Error...</p>
      ) : categoriesData ? (
        <>
          <div className="w-full">
            <div className="flex items-center justify-between w-full">
              <h2 className="text-[26px] font-bold">Categories</h2>
              <Button
                size="large"
                icon={"+"}
                onClick={() => setOpenDrawer(true)}
              >
                Create category
              </Button>
            </div>
            <div className="mt-5 w-[30%] space-y-2">
              {categoriesData.map((category: CategoryTypes) => (
                <div
                  className="flex w-full justify-between  gap-2"
                  key={category?.id}
                >
                  <p key={category.id}>{category.name}</p>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => {
                        if (category) {
                          handleUpdate(category);
                        }
                      }}
                    >
                      Update
                    </Button>
                    <Button
                      onClick={() => {
                        if (category?.id) {
                          handleDelete(category?.id);
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Drawer
            title="Create category"
            placement="right"
            closable={false}
            onClose={closeDrawer}
            open={openDrawer}
          >
            <Form autoComplete="off" onFinish={handleAddCategory}>
              <h4>Category name</h4>
              <Input
                className="mt-5 text-black"
                size="large"
                allowClear
                type="text"
                placeholder="Electronics"
                value={categoryName}
                onChange={(e) =>
                  setCategoryName((e.target as HTMLInputElement).value)
                }
              />
              <Button
                size="large"
                htmlType="submit"
                className="mt-5 w-full bg-[#000]/80 text-white"
              >
                Create
              </Button>
            </Form>
          </Drawer>
        </>
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default Categories;
