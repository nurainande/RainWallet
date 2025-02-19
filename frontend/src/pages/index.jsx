// import React from 'react'
import {Col, Form, message, Row, Select} from 'antd'
import { RegisterUser } from '../apicalls/users';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate()
  const onFinish = async (values) => {
    try {
      const response = await RegisterUser(values);
      console.log(response);

      if (response.success) {
        message.success(response.message);
        navigate("/login");
      } else {
        message.error(response.message);
        console.log(response.message);
      }
    } catch (error) {
      message.error(error.message);
      console.log(error.message);
    }
  };
  return (
    <div className="m-3">
      <div className="flex-item">
        <h1 className="text-2xl">SHEYWALLET - REGISTER</h1>
        <h1 className="text-sm underline">Already a member, Login</h1>
      </div>
      <hr />
      <Form layout="vertical" onFinish={onFinish}>
        <Row gutter={10}>
          <Col span={6}>
            <Form.Item label="First Name" name="firstName">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Last Name" name="lastName">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="email" name="email">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Mobile" name="phoneNumber">
              <input type="text" />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label="Identification Type" name="identificationType">
              <Select>
                <option value="NATIONAL ID">National ID</option>
                <option value="PASSPORT">Passport</option>
                <option value="DRIVING LICENSE">Driving License</option>
                <option value="SOCIAL CARD">Social Security Card (SSN)</option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              label="Identification Number"
              name="identificationNumber"
            >
              <input type="text" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Address" name="address">
              <textarea type="text" />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item label="Password" name="password">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Confirm Password" name="confirmPassword">
              <input type="text" />
            </Form.Item>
          </Col>
        </Row>

        <div className="flex justify-end">
          <button className="primary-contained-btn" type="submit">
            Register
          </button>
        </div>
      </Form>
    </div>
  );
}

export default Register