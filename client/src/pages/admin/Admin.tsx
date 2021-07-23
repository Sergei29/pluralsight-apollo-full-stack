import React, { useContext } from "react";
import { AuthContext } from "../../graphql/AuthProvider";
import UserList from "../../components/UserList";

const Admin = () => {
  const { isAdmin } = useContext(AuthContext);
  return isAdmin() ? (
    <div className="container">
      <div className="row">
        <UserList />
      </div>
    </div>
  ) : null;
};

export default Admin;
