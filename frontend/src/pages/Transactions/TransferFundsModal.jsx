// import React from "react";
import { Form, message, Modal } from "antd";
import { useState } from "react";
import { TranseferFunds, VerifyAccount } from "../../apicalls/transactions";
import { useDispatch, useSelector } from "react-redux";

function TransferFundsModal({
  showTransferFundsModal,
  setShowTransferFundsModal,
  //   reloadData,
}) {
  const [isVerified, setIsVerified] = useState("");
  const [form] = Form.useForm();
    const { user, ReloadUser } = useSelector((state) => state.users);
    const dispatch = useDispatch();

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
    console.log('values',values)
    try {
      const payload = {
        ...values,
        sender: user._id,
        // reciever: '67a52b0ee6b6d3ceff98f43d',
        status: "success",
        reference: values.reference || "no reference"
      };
      const response = await TranseferFunds(payload)
      if(response.success) {
        setShowTransferFundsModal(false)
        message.success(response.message)
        dispatch(ReloadUser(true))
      }else{
        message.error(response.message)
      }

    } catch (error) {
        message.error(error.message);
      console.log(error)
    }
  }
  return (
    <div>
      <Modal
        title="Transfer Funds"
        open={showTransferFundsModal}
        onOk={() => setShowTransferFundsModal(false)}
        onCancel={() => setShowTransferFundsModal(false)}
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

          <Form.Item label="Reference" name="reference">
            <textarea type="text" />
          </Form.Item>

          <div className="flex justify-end gap-1">
            <button className="primary-outlined-btn">Cancel</button>
            
            {isVerified === "true" && (
              <button className="primary-contained-btn">Transfer</button>
            )}
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default TransferFundsModal;
