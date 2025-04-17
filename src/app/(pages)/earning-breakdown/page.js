"use client";
import React, { useState, useEffect } from "react";
import ProducerHeader from "@/components/Header/producer";
import { Tabs, Tab, Container, Row, Col, Card, Table } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import Api from "@/components/api";

// Register required Chart.js components
Chart.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

const breadcrumb = {
  title: "My Account",
  links: [
    { name: "Home", href: "/" },
    { name: "Earnings Breakdown", href: "#" },
  ],
};

const Month = {
  1 : 'January',
  2 : 'February',
  3 : 'March',
  4 : 'April',
  5 : 'May',
  6 : 'Jun',
  7 : 'July',
  8 : 'August',
  9 : 'September',
  10 : 'October',
  11 : 'November',
  12 : 'December',
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: "top",
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Date of the Month", // Horizontal axis label
        color: "#ffffff", // Adjust color if needed
        font: {
          size: 14,
          weight: "bold",
        },
      },
    },
    // y: {
    //   title: {
    //     display: true,
    //     text: "Codes", // Vertical axis label
    //     color: "#ffffff",
    //     font: {
    //       size: 14,
    //       weight: "bold",
    //     },
    //   },
    //   beginAtZero: true, // Ensure y-axis starts at zero
    // },
  },
};

export default function EarningBreakDown() {
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [monthlyEarnings, setMonthlyEarnings] = useState([]);
  const [month, setMonth] = useState(1)
  const [year, setYear] = useState(1)

  const monthlyChartData = {
    labels: monthlyEarnings?.map((item) => item.date),
    datasets: [
      {
        label: "Code Generated",
        data: monthlyEarnings?.map((item) => item.earnings),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        // barThickness: 50,
      },
    ],
  };

  useEffect(() => {
    Api.get("/producer/earnings").then((res) => {
      setMonthlyEarnings(res?.data?.earnings)
      setTotalEarnings(res?.data?.total_earnings)
      setMonth(Month[res?.data?.month])
      setYear(res?.data?.year)
    }).catch((err) => {
      console.log("err--------", err)
    })
  }, [])

  return (
    <>
      <ProducerHeader data={{ breadcrumb }} />
      <main className="main">
        <div className="registration-area my-80">
          <Container>
            <Row>
              <Col md={12}>
                <Card className="mb-4">
                  <Card.Body>
                    <h4 style={{color:"black"}}>Total Code Generated this month : {totalEarnings}</h4>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Tabs defaultActiveKey="monthly" id="earnings-breakdown-tabs" className="earning-tabs mb-3">
              <Tab eventKey="monthly" title={`${month} ${year}`}>
                <Row>
                  <Col style={{height:"500px"}} md={12}>
                    <Bar data={monthlyChartData} options={options}/>
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
