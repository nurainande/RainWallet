import { useSelector } from "react-redux";
import PageTitle from "../../components/pageTitle";

function Home() {
  const { user } = useSelector((state) => state.users);
  return (
    <div>
      <PageTitle
        title={`Hello ${user.firstName} ${user.lastName}, Welcome to the SHEYWALLET`}
      />
      <div
        className="bg-tertiary p-2 w-50 br-3 flex flex-col gap-1"
        style={{ background: "green" }}
      >
        <div className="flex justify-between">
          <h1 className="text-md text-white">Account Number</h1>
          <h1 className="text-md text-white">{user._id}</h1>
        </div>
        <div className="flex justify-between">
          <h1 className="text-md text-white">Balance</h1>
          <h1 className="text-md text-white">{user.balance || 0}</h1>
        </div>
      </div>

      <div className="card p-2 w-50 br-3 flex flex-col gap-1">
        <div className="flex justify-between">
          <h1 className="text-md text-black">Firstname</h1>
          <h1 className="text-md text-black">{user.firstName}</h1>
        </div>
        <div className="flex justify-between">
          <h1 className="text-md text-black">lastname</h1>
          <h1 className="text-md text-black">{user.lastName}</h1>
        </div>
        <div className="flex justify-between">
          <h1 className="text-md text-white">Balance</h1>
          <h1 className="text-md text-white">{user.balance || 0}</h1>
        </div>
      </div>
    </div>
  );
}

export default Home;
