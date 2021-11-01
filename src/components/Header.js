import React from "react";
import { Card, CardBody } from "reactstrap";

const Header = (title, name) => {
  return (
    <div className="text-center my-5">
      <Card className="my-2 bg-warning">
        <CardBody>
          <h1>Welcome to Courses</h1>
        </CardBody>
      </Card>
    </div>
  );
};

export default Header;
