// import React from "react";
import { Form, message, Modal } from "antd";
import { useState } from "react";
import { VerifyAccount } from "../../apicalls/transactions";
import { useSelector } from "react-redux";
import { SendRequest } from "../../apicalls/requests";

function NewRequestModal({ showNewRequestModal,setShowNewRequestModal }) {
  const [isVerified, setIsVerified] = useState("");
  const [form] = Form.useForm();
  const { user } = useSelector((state) => state.users);

  const verifyAccount = async () => {
    console.log("connect");
    try {
      // dispatch(ShowLoading());
      const response = await VerifyAccount({
        receiver: form.getFieldValue("reciever"),
      });
      console.log(response);
      // dispatch(HideLoading());
      if (response.success) {
        setIsVerified("true");
      } else {
        setIsVerified("false");
      }
    } catch (error) {
      // dispatch(HideLoading());
      setIsVerified("false");
    }
  };

  const onFinish = async (values) => {
    console.log("values", values);
    try {
      if(values.amount > user.balance){
        message.error("Insufficient balance");
        return;
      }
      const payload = {
        ...values,
        sender: user._id,
        // reciever: '67a52b0ee6b6d3ceff98f43d',
        status: "success",
        reference: values.reference || "no reference",
      };
      const response = await SendRequest(payload);
      if (response.success) {
        setShowNewRequestModal(false);
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
      console.log(error);
    }
  };
  return (
    <div>
      <Modal
        title="Transfer Funds"
        open={showNewRequestModal}
        onOk={() => setShowNewRequestModal(false)}
        onCancel={() => setShowNewRequestModal(false)}
        footer={null}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <div className="flex gap-2 items-center">
            <Form.Item label="Account Number" name="reciever" className="w-100">
              <input type="text" />
            </Form.Item>
            <button
              className="primary-contained-btn mt-1"
              type="button"
              onClick={verifyAccount}
            >
              VERIFY
            </button>
          </div>
          {isVerified === "true" && (
            <div>
              <h1 className="text-sm">Account Verified!</h1>
            </div>
          )}
          {isVerified === "false" && (
            <div>
              <h1 className="text-sm">Account is not Verified!</h1>
            </div>
          )}

          <Form.Item
            label="Amount"
            name="amount"
            rules={[
              {
                required: true,
                message: "Please input your amount!",
              },
              {
                max: user.balance,
                message: "Insufficient Balance",
              },
            ]}
          >
            <input type="number" max={user.balance} />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <textarea type="text" />
          </Form.Item>

          <div className="flex justify-end gap-1">
            <button className="primary-outlined-btn">Cancel</button>

            {isVerified === "true" && (
              <button className="primary-contained-btn">request</button>
            )}
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default NewRequestModal;
