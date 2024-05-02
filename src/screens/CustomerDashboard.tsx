import React, { useEffect, useState } from 'react';
import { Container, Row, Col, ListGroup, InputGroup, FormControl, Card, Form, Button } from 'react-bootstrap';
import { BsX } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useSelectedCustomer } from '../contexts/SelectedCustomerContext';
import { useLoading } from '../contexts/LoadingContext';
import { fetchInventory } from "../services/api";

import PieChartComponent from '../components/PieChartComponent';
import BarChartComponent from '../components/BarChartComponent';
import Loader from '../components/Loader';
import InventorySummary from '../components/InventorySummary';



const CustomerDashboard: React.FC = () => {
    const { selectedCustomer } = useSelectedCustomer();
    const { isLoading, startLoading, stopLoading } = useLoading();
    const [inventoryData, setInventoryData] = useState<{ summary: { [key: string]: number }, detail: { [key: string]: { [key: string]: number } } } | null>(null);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [inputValue, setInputValue] = useState(''); // State for the input field value

    const navigate = useNavigate();

    const handleInputAction = () => {
        console.log("Add action with input:", inputValue);
        // Add your API call or action logic here.
    };

    useEffect(() => {
        const fetchData = async () => {
            startLoading();
            try {
                const data = await fetchInventory(selectedCustomer?.customerId);
                setInventoryData(data);
            } catch (error) {
                console.error("Error fetching data:", error);
                toast.error("Error fetching data:")
                navigate("/")
            } finally {
                stopLoading();
            }
        };

        fetchData();
    }, [selectedCustomer]);

    const details = inventoryData?.detail || {};
    const summary = inventoryData?.summary || {};

    const filteredItems = Object.keys(details).filter(item =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const clearSearch = () => {
        setSearchTerm('');
    };

    const claysonCount = summary.Clayson || 0;
    const whlCount = summary.WHL || 0;

    let claysonData = 0;
    let whlData = 0;

    const barChartData = {
        data: [claysonCount, whlCount],
    };
    return (
        <Container fluid style={{ minHeight: '85vh' }}>
            <Row style={{ height: '30vh', overflowY: 'auto' }}>
                <h1>{selectedCustomer?.companyName}</h1>
                {isLoading ? (
                    <Loader />
                ) : (
                    <>
                        <Col md={6} sm={3}>
                        <InventorySummary summary={summary as { Total: number; Clayson: number; WHL: number; }} />
                       </Col>
                        <Col md={6} style={{maxHeight: '24vh'}} >
                                <BarChartComponent barChartData={barChartData} />
                        </Col>
                    </>
                )}
            </Row>
            <hr />
            <Row>
                <Col lg={3} md={4} sm={6} xs={12} style={{ maxHeight: '70vh', overflowY: 'auto' }}>
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
                        <div className="m-5" >
                            <Loader />

                        </div>
                    ) : (

                        <ListGroup style={{ height: window.innerWidth <= 768 ? '30vh' : '100%', overflowY: 'auto' }} >
                            {filteredItems.map(item => (
                                <ListGroup.Item
                                    key={item}
                                    action
                                    active={selectedItem === item}
                                    onClick={() => setSelectedItem(item)}
                                >
                                    {item}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}

                </Col>
                {window.innerWidth <= 768 ? <hr /> : <></>}

                <Col lg={9} md={8} sm={6} xs={12} style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                    <div>
                        {selectedItem ? (       <div className="mb-2" style={{ display: 'flex', flexWrap: 'wrap', justifyContent:"space-between" }}>
            <div >
                <h2>{selectedItem}</h2>
                <ListGroup >
                    {Object.entries(details[selectedItem] || {}).map(([key, value]) => {
                        if (key === 'Clayson') {
                            claysonData = value;
                        } else {
                            whlData = value;
                        }
                        return (
                            <ListGroup.Item key={key}>
                                {key}: {typeof value === 'number' ? value.toLocaleString() : value}
                            </ListGroup.Item>
                        );
                    })}
                    <>
                        <ListGroup.Item>
                            Clayson's Percentage: {(claysonData / (claysonData + whlData) * 100).toFixed(2)}%
                        </ListGroup.Item>
                        <ListGroup.Item>
                            WHL's Percentage: {(whlData / (claysonData + whlData) * 100).toFixed(2)}%
                        </ListGroup.Item>
                    </>
                </ListGroup>
            </div>
            <div style={{  display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                <Form >
                    <Form.Group className="mb-3" controlId="thresholdInput">
                        <Form.Label>Threshold</Form.Label>
                        <FormControl
                            placeholder="Enter a number"
                            aria-label="Item Threshold"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <Button variant="primary" className="mt-2" onClick={handleInputAction}>
                            ADD
                        </Button>
                    </Form.Group>
                </Form>
            </div>
        </div>
                        ) : (
                            <p>Select an item to view details</p>
                        )}
                        {selectedItem && (<>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                height: '30rem'
                            }}>
                                <PieChartComponent pieChartData={{ data: [claysonData, whlData] }} />

                            </div>

                                </>
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default CustomerDashboard;
