import React from "react";
import { useQuery } from "@apollo/client";
import { GET_GREETING } from "./graphql/queries";
import "./App.css";

const App: React.FC = () => {
  const { loading, error, data } = useQuery(GET_GREETING);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <div className="App">
      <h1>Apollo Client</h1>
      {data && data.greeting && <p>{data.greeting}</p>}
    </div>
  );
};

export default App;
