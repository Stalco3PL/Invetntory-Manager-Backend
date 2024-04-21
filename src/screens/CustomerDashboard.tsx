import React, { useEffect, useState } from 'react';
import { Container, Row, Col, ListGroup, InputGroup, FormControl } from 'react-bootstrap';
import { BsX } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useSelectedCustomer } from '../contexts/SelectedCustomerContext';
import { useLoading } from '../contexts/LoadingContext';
import { fetchInventory } from "../services/api";

import PieChartComponent from '../components/PieChartComponent';
import BarChartComponent from '../components/BarChartComponent';
import Loader from '../components/Loader';



const CustomerDashboard: React.FC = () => {
    const { selectedCustomer } = useSelectedCustomer();
    const { isLoading, startLoading, stopLoading } = useLoading();
    const [inventoryData, setInventoryData] = useState<{ summary: { [key: string]: number }, detail: { [key: string]: { [key: string]: number } } } | null>(null);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const navigate = useNavigate();

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
        <Container fluid style={{ minHeight: '85vh'}}>
            <Row style={{ height: '30vh', overflowY: 'auto' }}>
                <h1>{selectedCustomer?.companyName}</h1>
                {isLoading ? (
                    <Loader />
                ) : (
                    <>
                        <Col>
                            <h4>Total Inventory: {summary?.Total}</h4>
                            <h4>WHL total: {whlCount}</h4>
                            <h4>Clayson total: {claysonCount}</h4>
                        </Col>
                        <Col>
                        <div style={{
                                width: '100%',
                                height: '24vh', // Set the height as per your requirement
                            }}>
                                <BarChartComponent barChartData={barChartData} />
                            </div>
                        </Col>
                    </>
                )}
            </Row>
            <hr/>
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
                        <Loader  />

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
                {window.innerWidth <= 768 ? <hr/> : <></>}

                <Col lg={9} md={8} sm={6} xs={12}>
    <div>
        {selectedItem ? (
            <div>
                <h2>{selectedItem}</h2>
                <ul>
                    {Object.entries(details[selectedItem] || {}).map(([key, value]) => {
                        if (key === "Clayson") {
                            claysonData = value;
                        } else {
                            whlData = value;
                        }
                        return (
                            <li key={key}>
                                {key}: {value}
                            </li>
                        );
                    })}
                </ul>
            </div>
        ) : (
            <p>Select an item to view details</p>
        )}
        {selectedItem && (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '50vh'
            }}>
                <PieChartComponent pieChartData={{ data: [claysonData, whlData] }} />
            </div>
        )}
    </div>
</Col>





            </Row>
        </Container>
    );
};

export default CustomerDashboard;
