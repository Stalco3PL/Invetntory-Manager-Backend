import React, { useEffect, useState } from 'react';
import { useSelectedCustomer } from '../contexts/SelectedCustomerContext';
import { useLoading } from '../contexts/LoadingContext';
import { fetchInventory } from "../services/api";
import Loader from '../components/Loader';
import { Container, Row, Col, ListGroup, Form, InputGroup, FormControl } from 'react-bootstrap';
import { BsSearch, BsX } from 'react-icons/bs'; // Importing Bootstrap Icons for search and clear icons

const CustomerDashboard: React.FC = () => {
  const { selectedCustomer } = useSelectedCustomer();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [inventoryData, setInventoryData] = useState<{ summary:  { [key: string]: number  }, detail: { [key: string]: { [key: string]: number } } } | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      startLoading();
      try {
        const data = await fetchInventory(selectedCustomer?.customerId);
        setInventoryData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        stopLoading();
      }
    };

    fetchData();
  }, [selectedCustomer]); 

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
  };

  const details = inventoryData?.detail || {}; // Using optional chaining to handle undefined inventoryData
  const summary = inventoryData?.summary || {}; // Using optional chaining to handle undefined inventoryData

  const filteredItems = Object.keys(details).filter(item =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const clearSearch = () => {
    setSearchTerm('');
  };

  return (
    <Container fluid>
      <Row style={{ height: '25vh', overflowY: 'auto' }}>
      <h1>{selectedCustomer?.companyName}</h1>
  
     <h3>Total Inventory: {summary?.Total}</h3>
     <h3>WHL totol: {summary?.Clayson}</h3>
     <h3>Clayson total: {summary?.WHL}</h3>
      </Row>
      <Row>
        <Col lg={3} md={4} sm={6} xs={12} style={{ height: '75vh', overflowY: 'auto' }}>
          <h2>SKUs</h2>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Search..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <InputGroup.Text onClick={clearSearch} style={{ cursor: 'pointer' }}>
              <BsX />
            </InputGroup.Text>
          </InputGroup>
          {isLoading ? (
            <Loader />
          ) : (
            <ListGroup>
              {filteredItems.map(item => (
                <ListGroup.Item
                  key={item}
                  action
                  active={selectedItem === item}
                  onClick={() => handleItemClick(item)}
                >
                  {item}
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col lg={9} md={8} sm={6} xs={12}>
          <div>
            {selectedItem ? (
              <div>
                <h2>{selectedItem}</h2>
                <ul>
                  {Object.entries(details[selectedItem] || {}).map(([key, value]) => (
                    <li key={key}>
                      {key}: {value}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>Select an item to view details</p>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CustomerDashboard;
