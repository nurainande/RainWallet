import { message, Table, Tabs } from "antd";
import PageTitle from "../../components/pageTitle";
import { useEffect, useState } from "react";
import NewRequestModal from "./NewRequestModal";
import { GetAllRequestByUser, UpdateRequestStatus } from "../../apicalls/requests";
import { useSelector } from "react-redux";
import moment from 'moment'

const { TabPane } = Tabs;

function Requests() {
  const [data,setData] = useState([])
  const [showNewRequestModal, setShowNewRequestModal] = useState(false);
  const {user} =useSelector(state=>state.users)

  const getData = async () => {
      try {
        // dispatch(ShowLoading());
        const response = await GetAllRequestByUser();
        console.log(response)
        if (response.success) {
            const sendData = response.data.filter(item => item.sender._id === user._id);
            console.log(sendData)
            const recievedData = response.data.filter(
              (item) => item.reciever._id === user._id
            );
            console.log(recievedData)

          setData({
            sent: sendData,
            recieved: recievedData,
          });

          console.log(data)
        }
        // dispatch(HideLoading());
      } catch (error) {
        // dispatch(HideLoading());
        message.error('error.message');
      }
    };

  const updateStatus = async (record, status) => {
    try {
      if(status==='accepted' && record.amount>user.balance){
        message.error('Insufficient balance')
        return
      } else{
        // dispatch(ShowLoading());

        const response = await UpdateRequestStatus({
          ...record,
          status,
        });

        // dispatch(HideLoading());

        if (response.success) {
          message.success(response.message);
          getData();
        } else {
          message.error(response.message);
        }
      }
    } catch (error) {
      // dispatch(HideLoading());
      message.error(error.message);
    }
  };

    const columns = [
      {
        title: "Request ID",
        dataIndex: "_id",
      },
      {
        title: "Sender",
        dataIndex: "sender",
        render(sender) {
          return sender.firstName + " " + sender.lastName;
        },
      },
      {
        title: "Reciever",
        dataIndex: "reciever",
        render(reciever) {
          return reciever.firstName + " " + reciever.lastName;
        },
      },
      {
        title: "Amount",
        dataIndex: "amount",
      },
      {
        title: "Date",
        dataIndex: "date",
        render(text, record) {
          return moment(record.createdAt).format("DD-MM-YY hh:mm:ss A");
        },
      },
      {
        title: "Status",
        dataIndex: "status",
      },
      {
        title: "Action",
        dataIndex: "action",
        render: (text, record) => {
          if (record.status === "pending" && record.reciever._id === user._id) {
            return (
              <div className="flex gap-1">
                <h1
                  className="text-sm underline"
                  onClick={() => updateStatus(record, "rejected")}
                >
                  Reject
                </h1>
                <h1
                  className="text-sm underline"
                  onClick={() => updateStatus(record, "accepted")}
                >
                  Accept
                </h1>
              </div>
            );
          }
        },
      },
    ];

    

    useEffect(() => {
      getData();
    }, []);
  return (
    <div>
      <div className="flex justify-between">
        <PageTitle title="Requests" />
        <button
          className="primary-outlined-btn"
          onClick={() => setShowNewRequestModal(true)}
        >
          Request Funds
        </button>
      </div>

      <Tabs defaultActiveKey="1">
        <TabPane tab="Sent" key="1">
          {/* Content for Sent requests */}
          <Table columns={columns} dataSource={data.sent} />
        </TabPane>
        <TabPane tab="Received" key="2">
          {/* Content for Received requests */}
          <Table columns={columns} dataSource={data.recieved} />
          {/* Recieved */}
        </TabPane>
      </Tabs>

      {showNewRequestModal && (
        <NewRequestModal
          showNewRequestModal={showNewRequestModal}
          setShowNewRequestModal={setShowNewRequestModal}
          reloadData={getData}
        />
      )}
    </div>
  );
}

export default Requests;
