import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { fetchCustomers, CustomerData } from "../services/api";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useSelectedCustomer } from "../contexts/SelectedCustomerContext";
import { useLoading } from "../contexts/LoadingContext";

const Home: React.FC = () => {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [data, setData] = useState<CustomerData[]>([]);
  const { selectedCustomer, setSelectedCustomer } = useSelectedCustomer();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
     startLoading();
      try {
        const customersData: CustomerData[] = await fetchCustomers();
        setData(customersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        stopLoading();
      }
    };

    fetchData();
  }, []);

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
      // Handle if no customer is selected
      alert('Please select a customer.');
    }
  };

  return (
    <>
      <Container className="text-center" style={{ minHeight: '10vh' }}>
        <h1>Inventory distribution based on Warehouse location</h1>
      </Container>
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
        {isLoading ? (
          <Loader />
        ) : (
          <Container className="mt-5">
            <Row className="justify-content-center">
              <Col xs={6}>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="selectCustomer">
                    <Form.Control as="select" onChange={handleSelect}>
                      <option value="">Select a Customer...</option>
                      {data.map((customer) => (
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

export default Home;
