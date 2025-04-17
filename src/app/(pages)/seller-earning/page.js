"use client";
import React, { useState , useEffect} from "react";
import SellerHeader from "@/components/Header/seller";
import { Tabs, Tab, Container, Row, Col, Card, Table } from "react-bootstrap";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from "chart.js";

// Register required Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

const breadcrumb = {
  title: "My Account",
  links: [
    { name: "Home", href: "/" },
    { name: "Earnings Breakdown", href: "#" },
  ],
};

const monthlyEarnings = [
  { month: "January", earnings: 500 },
  { month: "February", earnings: 700 },
  { month: "March", earnings: 450 },
  { month: "April", earnings: 800 },
  { month: "May", earnings: 650 },
  { month: "Jun", earnings: 450 },
  { month: "July", earnings: 800 },
  { month: "August", earnings: 650 },
];

const yearlyEarnings = [
  { year: 2019, earnings: 4000 },
  { year: 2020, earnings: 5000 },
  { year: 2021, earnings: 7000 },
  { year: 2022, earnings: 4000 },
  { year: 2023, earnings: 5000 },
  { year: 2024, earnings: 7000 },
];

const historicalEarnings = [
  { date: "2023-01-01", earnings: 200 },
  { date: "2023-02-01", earnings: 300 },
  { date: "2023-03-01", earnings: 150 },
  { date: "2023-04-01", earnings: 400 },
  { date: "2023-05-01", earnings: 600 },
  { date: "2023-06-01", earnings: 150 },
  { date: "2023-07-01", earnings: 400 },
  { date: "2023-08-01", earnings: 600 },
  { date: "2023-09-01", earnings: 600 },
];

// Chart Data Configurations
const monthlyChartData = {
  labels: monthlyEarnings.map((item) => item.month),
  datasets: [
    {
      label: "Monthly Earnings ($)",
      data: monthlyEarnings.map((item) => item.earnings),
      backgroundColor: "rgba(54, 162, 235, 0.6)",
      borderColor: "rgba(54, 162, 235, 1)",
      borderWidth: 1,
    },
  ],
};

const yearlyChartData = {
  labels: yearlyEarnings.map((item) => item.year),
  datasets: [
    {
      label: "Yearly Earnings ($)",
      data: yearlyEarnings.map((item) => item.earnings),
      fill: false,
      backgroundColor: "rgba(75, 192, 192, 0.6)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 2,
    },
  ],
};

const historicalChartData = {
  labels: historicalEarnings.map((item) => item.date),
  datasets: [
    {
      label: "Historical Earnings ($)",
      data: historicalEarnings.map((item) => item.earnings),
      backgroundColor: [
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#4BC0C0",
        "#9966FF",
      ],
    },
  ],
};

export default function EarningBreakDown() {
  const [totalEarnings, setTotalEarnings] = useState(5000);
  const [bucket, setBucket] = useState([]);

  useEffect(() => {
    const savedBucket = JSON.parse(localStorage.getItem("bucket")) || [];
    setBucket(savedBucket);
  }, [])



  return (
    <>
      <SellerHeader data={{ breadcrumb }} bucketCount={bucket?.length}/>
      <main className="main">
        <div className="registration-area my-80">
          <Container>
            <Row>
              <Col md={12}>
                <Card className="mb-4">
                  <Card.Body>
                    <h3 style={{color:"black"}}>Total Earnings: ${totalEarnings}</h3>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Tabs defaultActiveKey="monthly" id="earnings-breakdown-tabs" className="earning-tabs mb-3">
              {/* Monthly Earnings Tab */}
              <Tab eventKey="monthly" title="Monthly Earnings">
                <Row>
                  <Col md={6}>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Month</th>
                          <th>Earnings ($)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {monthlyEarnings.map((item, index) => (
                          <tr key={index}>
                            <td>{item.month}</td>
                            <td>${item.earnings}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Col>
                  <Col md={6}>
                    <Bar data={monthlyChartData} />
                  </Col>
                </Row>
              </Tab>

              {/* Yearly Earnings Tab */}
              <Tab eventKey="yearly" title="Yearly Earnings">
                <Row>
                  <Col md={6}>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Year</th>
                          <th>Earnings ($)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {yearlyEarnings.map((item, index) => (
                          <tr key={index}>
                            <td>{item.year}</td>
                            <td>${item.earnings}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Col>
                  <Col md={6}>
                    <Line data={yearlyChartData} />
                  </Col>
                </Row>
              </Tab>

              {/* Historical Earnings Tab */}
              <Tab eventKey="historical" title="Historical Earnings">
                <Row>
                  <Col md={6}>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Earnings ($)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {historicalEarnings.map((item, index) => (
                          <tr key={index}>
                            <td>{item.date}</td>
                            <td>${item.earnings}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Col>
                  <Col md={6}>
                    <Pie data={historicalChartData} />
                  </Col>
                </Row>
              </Tab>
            </Tabs>
          </Container>
        </div>
      </main>
    </>
  );
}
