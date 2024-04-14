import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";


const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);


  return (
    <>
      <h1>This is HOME page!</h1>
      <Link to="/add">
      </Link>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1>Loaded!!</h1>
        <Button variant="primary">Add a Vehicle</Button>

        </>
      )}
    </>
  );
};

export default Dashboard;
