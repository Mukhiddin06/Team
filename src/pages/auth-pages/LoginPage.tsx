import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useState } from "react";
import { useLoginMutation } from "../../hooks/useAuth";
import { MaskedInput } from "antd-mask-input";
import { LoginType } from "../../types";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate, isPending } = useLoginMutation();

  const handleSubmit = (values: LoginType) => {
    const phone = values.phone_number
      .split("")
      .filter((item) => item !== "")
      .join("");
    mutate({ ...values, phone_number: phone });
  };
  return (
    <div className="flex items-center justify-center h-[100vh] ">
      <div className="max-w-[300px] w-full">
        <Form
          name="authentication"
          layout="vertical"
          onFinish={handleSubmit}
          style={{ width: "100%" }}
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
              size="large"
              type={showPassword ? "text" : "password"}
              suffix={
                showPassword ? (
                  <EyeOutlined
                    onClick={() => setShowPassword((prev) => !prev)}
                  />
                ) : (
                  <EyeInvisibleOutlined
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
              className="btn"
              htmlType="submit"
              loading={isPending}
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
