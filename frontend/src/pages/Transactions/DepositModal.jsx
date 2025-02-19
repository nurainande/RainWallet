// import React from "react";
import { Form, message, Modal } from "antd";
import { DepositFunds } from "../../apicalls/transactions";
import StripeCheckout from "react-stripe-checkout";
// import { useState } from "react";

function DepositModal({ showDepositModal, setShowDepositModal,reloadData }) {
    // const [amount,setAmount] = useState(10)
    const [form] = Form.useForm();

    console.log(form.getFieldValue("amount"));
    const onToken = async(token) => {
      console.log("Token received:", token);
      try {
        const response = await DepositFunds({
          token,
          amount: form.getFieldValue("amount")
          // amount: 10,
        });
        console.log(response);
        if(response.success){
          reloadData();
          message.success(response.message)
        }
      } catch (error) {
        message.error(error.message)
      }
        // console.log(token)
    }
  return (
    <div>
      <Modal
        title="Deposit"
        open={showDepositModal}
        onCancel={() => setShowDepositModal(false)}
        footer={null}
      >
        <div className="flex-col gap-1">
          <Form layout="vertical" form={form}>
            <Form.Item
              label="Amount"
              name="amount"
              rules={[
                {
                  required: true,
                  message: "Please input amount!",
                },
              ]}
            >
              <input type="number" />
            </Form.Item>

            <div className="flex justify-end">
              <button className="primary-outlined-btn">Cancel</button>

              <StripeCheckout
                token={onToken}
                currency="USD"
                amount={form.getFieldValue("amount") * 100}
                shippingAddress
                billingAddress
                stripeKey="pk_test_51Ozc4MP6msDdqKdeHgaWa4wobYSq6iFiCvxUuMIoKjurPbD5ab0ro74XkKKc2pfFQS6XlOCrcyGF7GrdXo3xJXfy00uNgwJPLS"
              >
                <button className="primary-contained-btn">Deposit</button>
              </StripeCheckout>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
}

export default DepositModal;
