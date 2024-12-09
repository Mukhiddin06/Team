import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useState } from "react";
import { useLoginMutation } from "../../hooks/useAuth";
import { MaskedInput } from "antd-mask-input";
import { LoginType } from "../../types";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate, isPending } = useLoginMutation();
  const navigate = useNavigate();

  const handleSubmit = (values: LoginType) => {
    const phone = values.phone_number
      .split("")
      .filter((item) => item !== "")
      .join("");
    mutate(
      { ...values, phone_number: phone },
      {
        onSuccess: () => {
          navigate("/", { replace: true });
        },
        onError: () => {
          toast.error("Failed to login. Please try again.");
        },
      }
    );
  };

  return (
    <div className="flex items-center justify-center h-[100vh] bg-[#244BC5] relative">
      <Toaster position="top-right" reverseOrder={false} />
      <img
        className="absolute z-10 w-full h-full top-0"
        src="/bg-auth.png"
        alt="bg login img"
        width={"100%"}
        height={"100%"}
      />
      <div className="max-w-[300px] z-50 w-full">
        <img
          className="w-[119px]  h-[97px] object-cover mx-auto mb-[50px]"
          src="/login-icon.svg"
          alt="login icon"
          width={119}
          height={97}
        />
        <Form
          autoComplete="off"
          name="authentication"
          layout="vertical"
          onFinish={handleSubmit}
          style={{ width: "100%" }}
          className="!text-white"
        >
          <Form.Item
            label="Phone Number"
            name="phone_number"
            rules={[
              { required: true, message: "Please enter your phone number!" },
              {
                pattern: /^\+998 \d{2} \d{3} \d{2} \d{2}$/,
                message: "Please enter a valid phone number!",
              },
            ]}
          >
            <MaskedInput
              className="!bg-transparent text-white"
              mask={"+998 00 000 00 00"}
              size="large"
              placeholder="+998 xx xxx xx xx"
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Enter password" },
              {
                min: 6,
                message: "Password must be at least 6 characters long",
              },
            ]}
          >
            <Input
              className="!bg-transparent text-white"
              size="large"
              type={showPassword ? "text" : "password"}
              suffix={
                showPassword ? (
                  <EyeOutlined
                    className="text-white"
                    onClick={() => setShowPassword((prev) => !prev)}
                  />
                ) : (
                  <EyeInvisibleOutlined
                    className="text-white"
                    onClick={() => setShowPassword((prev) => !prev)}
                  />
                )
              }
            />
          </Form.Item>
          <Form.Item>
            <Button
              size="large"
              style={{ width: "100%" }}
              type="primary"
              className="bg-[#FFFFFF] text-[#244BC5] font-semibold hover:!bg-[#fff]/80 hover:!text-[#244BC5]"
              htmlType="submit"
              loading={isPending}
            >
              LOGIN
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
