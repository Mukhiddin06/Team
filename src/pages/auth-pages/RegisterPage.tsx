import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { MaskedInput } from 'antd-mask-input';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import toast, { Toaster } from 'react-hot-toast';
import { SignupType } from '../../types';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../../hooks/useAuth';


const RegisterPage: React.FC = () => {
  const [form] = Form.useForm();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { mutate, isPending } = useRegisterMutation();

  const handleSubmitRegister = (values: SignupType) => {
    const phone = values.phone_number
      .split("")
      .filter((item) => item !== " ")
      .join("");
    mutate(
      { ...values, phone_number: phone },
      {
        onSuccess: () => {
          navigate("/login", { replace: true });
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
      <div className='max-w-[300px] z-50 w-full'>
        <img
          className="w-[119px]  h-[97px] object-cover mx-auto mb-[50px]"
          src="/login-icon.svg"
          alt="login icon"
          width={119}
          height={97}
        />
        <Form
          autoComplete='off'
          layout="vertical"
          form={form}
          onFinish={handleSubmitRegister}
        >
          <Form.Item
            label="First Name"
            name="first_name"
            rules={[{ required: true, message: "Enter First Name" }]}>
            <Input placeholder="Enter First Name" />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="last_name"
            rules={[{ required: true, message: "Enter Last Name" }]}>
            <Input placeholder="Enter Last Name" />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phone_number"
            rules={[
              { required: true, message: "Please enter your phone number!" },
              {
                pattern: /^\+998 \d{2} \d{3} \d{2} \d{2}$/,
                message: "Please enter a valid phone number!",
              },
            ]}>
            <MaskedInput
              mask={"+998 00 000 00 00"}
              size="middle"
              placeholder="+998 xx xxx xx xx"
            />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Enter Email" }]}>
            <Input placeholder="Enter Email" />
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
            ]}>
            <Input
              placeholder="Enter Password"
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
              style={{ width: "100%" }}
              type="primary"
              className="btn"
              htmlType="submit"
              loading={isPending}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
        <Link to={"/login"} className="block text-white text-end">Have an Account ?</Link>
      </div>
    </div>
  )
}

export default RegisterPage
