import React from "react";
import UserCard from "./userCard";
import { useSelector } from "react-redux";
import { getUserById } from "../../../../store/users";
import LastCalls from "./lastCalls";

const UserPage = ({ userId }) => {
  const user = useSelector(getUserById(userId));
  console.log(user);

  return (
    <>
      <div className="container p-3">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <UserCard user={user} />
          </div>
          <div className="col-md-8">
            <LastCalls user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPage;
