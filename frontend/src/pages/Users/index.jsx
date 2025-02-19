import React from 'react'

import { message, Table } from "antd";
import { GetAllUsers, UpdateUserVerifiedStatus } from "../../apicalls/users";
// import { useDispatch } from 'react-redux';
import PageTitle from '../../components/pageTitle';

const Users = () => {
   const [users, setUsers] = React.useState([]);
  //  const dispatch = useDispatch();

   const getData = async () => {
     try {
      //  dispatch(ShowLoading());
       const response = await GetAllUsers(); // Assuming this is an API call
      //  dispatch(HideLoading()); // HideLoading is not imported, but assumed to exist

       if (response.success) {
         setUsers(response.data);
       } else {
         message.error(response.message);
       }
     } catch (error) {
      //  dispatch(HideLoading()); // HideLoading is not imported, but assumed to exist
       message.error(error.message);
     }
   };

   const updateStatus = async (record, isVerified) => {
     try {
      //  dispatch(ShowLoading());

       const response = await UpdateUserVerifiedStatus({
         selectedUser: record._id,
         isVerified,
       });

      //  dispatch(HideLoading());

       if (response.success) {
         message.success(response.message);
         getData(); // Refresh data after successful update
       } else {
         message.error(response.message);
       }
     } catch (error) {
      //  dispatch(HideLoading());
       message.error(error.message);
     }
   };

   const columns = [
     {
       title: "First Name",
       dataIndex: "firstName",
     },
     {
       title: "Last Name",
       dataIndex: "lastName",
     },
     {
       title: "Email",
       dataIndex: "email",
     },
     {
       title: "Phone",
       dataIndex: "phoneNumber",
     },
     {
       title: "verified",
       dataIndex: "isVerified",
       render: (text) => {
         return text ? "Yes" : "No";
       },
     },
     {
       title: "Actions",
       dataIndex: "actions",
       render: (text, record) => {
         return (
           <div className="flex gap-1">
             {record.isVerified ? (
               <button
                 className="primary-outlined-btn"
                 onClick={() => updateStatus(record, false)}
               >
                 Suspend
               </button>
             ) : (
               <button
                 className="primary-outlined-btn"
                 onClick={() => updateStatus(record, true)}
               >
                 Activate
               </button>
             )}
           </div>
         );
       },
     },
   ];

   React.useEffect(() => {
     getData();
   }, []);
  return (
    <div>
      <PageTitle title='Users' />
      <Table columns={columns} dataSource={users} className='mt-2' />
    </div>
  )
}

export default Users