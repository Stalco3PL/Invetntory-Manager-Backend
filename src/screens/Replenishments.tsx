import React, {  ChangeEvent, FormEvent } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useSelectedCustomer } from "../contexts/SelectedCustomerContext";
import { toast } from "react-toastify";
import { useCustomers } from "../contexts/CustomerContext";


const Replenishments: React.FC = () => {
    const { selectedCustomer, setSelectedCustomer } = useSelectedCustomer();
    const { customersData, isCustomersLoading } = useCustomers();
    const navigate = useNavigate();
  
    const handleSelect = (event: ChangeEvent) => {
      const target = event.target as HTMLSelectElement;
      const selectedCustomerString = target.value;
      const selectedCustomerObject = JSON.parse(selectedCustomerString);
      setSelectedCustomer(selectedCustomerObject);
      console.log(selectedCustomer)
    };
  
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
  
      if (selectedCustomer !== null) {
        navigate(`Dashboard/${selectedCustomer.companyName}`);
      } else {
        toast.error("Please select a customer");
      }
    };
  
  return (
    <>
      <Container className="text-center" >
        <h1>Replenishments</h1>
      </Container>
      <div className="d-flex justify-content-center " style={{ minHeight: '90vh' }}>
        {isCustomersLoading ? (
          <Loader />
        ) : (
          <Container >
            <Row className="justify-content-center">
              <Col md={6} xs={10}>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="selectCustomer">
                    <Form.Control as="select" onChange={handleSelect}>
                      <option value="">Select a Customer...</option>
                      {customersData && customersData.map((customer) => (
                        <option key={customer.customerId} value={JSON.stringify(customer)}>
                          {customer.companyName}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                  <Row className="justify-content-center">
                    <Col xs="auto">
                      <Button variant="primary" type="submit" className="mt-3">
                        Select
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Container>
        )}
      </div>
    </>
  );
};

export default Replenishments;
