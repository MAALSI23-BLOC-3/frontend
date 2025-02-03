import React, { useEffect, useState } from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import { useAuth } from "../providers/authProvider";
import { Navigate, redirect } from "react-router";

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

const Login: React.FC = () => {
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const { user } = useAuth();

  if (user) {
    console.log("User is logged in, redirecting to home page");
    Navigate({ to: "/" });
  }

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);

    if (redirectUrl) {
      Navigate({ to: redirectUrl });
    } else {
      Navigate({ to: "/" });
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redir = params.get("redir");
    console.log("Redirect URL parameter:", redir);
    setRedirectUrl(redir);
  }, []);

  return (
    <>
      <h2>Se Connecter</h2>
      <Form
        name="basic"
        layout="horizontal"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Rentrer votre e-mail",
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Mot de passe"
          name="password"
          rules={[{ required: true, message: "Rentrer votre mot de passe" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Se connecter
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Login;
