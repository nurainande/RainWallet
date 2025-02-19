// import React from 'react'
import {Col, Form, message, Row} from 'antd'
import { loginUser } from '../../apicalls/users';
// import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {
  // const navigate = useNavigate()

  // const keyToken= localStorage.getItem('token')
  // if(keyToken){
  //   return <Navigate to="/" />
  // }
  const onFinish = async (values) => {
    try {
      const response = await loginUser(values);
      // console.log(response)

      if (response.success) {
        message.success(response.message);
        localStorage.setItem('token', response.data);
        window.location.href = "/";
        // navigate("/");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  return (
    <div className="m-3">
      <div className="flex-item">
        <h1 className="text-2xl">SHEYWALLET - Login</h1>
        <h1 className="text-sm underline">Not a member, Register</h1>
      </div>
      <hr />
      <Form layout="vertical" onFinish={onFinish}>
        <Row gutter={10}>
          <Col span={6}>
            <Form.Item label="email" name="email">
              <input type="text" />
            </Form.Item>
          </Col>
          

          <Col span={6}>
            <Form.Item label="Password" name="password">
              <input type="password" />
            </Form.Item>
          </Col>
        
        </Row>

        <div className="flex justify-end">
          <button className="primary-contained-btn" type="submit">
            Login
          </button>
        </div>
      </Form>
    </div>
  );
}

export default Login