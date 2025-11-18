import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserRentals } from "../features/rentals/rentalsSlice";
import { Table, Title, Loader, Center, Paper, Text, Badge } from "@mantine/core";

const RentalsPage = () => {
  const dispatch = useDispatch();
  const { list: rentals, loading, error } = useSelector((state) => state.rentals);

  useEffect(() => {
    dispatch(fetchUserRentals());
  }, [dispatch]);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background:
          "linear-gradient(135deg, #10b981, #047857, #065f46, #059669)",
        backgroundSize: "400% 400%",
        animation: "gradientAnimation 15s ease infinite",
      }}
    >
      <style>
        {`
          @keyframes gradientAnimation {
            0% {background-position: 0% 50%;}
            50% {background-position: 100% 50%;}
            100% {background-position: 0% 50%;}
          }
        `}
      </style>

      <Paper
        shadow="xl"
        radius="lg"
        p="xl"
        style={{
          backdropFilter: "blur(14px)",
          background: "rgba(255, 255, 255, 0.12)",
          border: "1px solid rgba(255, 255, 255, 0.25)",
          width: "95%",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          padding: "40px",
          overflowX: "auto",
        }}
      >
        <Title order={1} align="center" style={{ color: "white", fontSize: "3rem", fontWeight: 700, marginBottom: "1.5rem" }}>
          My Rentals
        </Title>

        {loading && (
          <Center>
            <Loader color="white" size="xl" />
          </Center>
        )}

        {error && (
          <Text color="red" align="center" size="lg">
            {error}
          </Text>
        )}

        {!loading && rentals?.length > 0 && (
          <Table
            highlightOnHover
            striped
            verticalSpacing="sm"
            style={{ background: "rgba(255, 255, 255, 0.6)", borderRadius: "12px", overflow: "hidden" }}
          >
            <thead style={{ background: "rgba(0,0,0,0.6)" }}>
              <tr>
                <th style={{ color: "white" }}>ID</th>
                <th style={{ color: "white" }}>Plate Number</th>
                <th style={{ color: "white" }}>Model</th>
                <th style={{ color: "white" }}>Capacity</th>
                <th style={{ color: "white" }}>Driver</th>
                <th style={{ color: "white" }}>License</th>
                <th style={{ color: "white" }}>Start Date</th>
                <th style={{ color: "white" }}>End Date</th>
                <th style={{ color: "white" }}>Price</th>
              </tr>
            </thead>
            <tbody>
              {rentals.map((rental) => (
                <tr key={rental.id} style={{ fontSize: "1rem", transition: "0.3s" }}>
                  <td>{rental.id}</td>
                  <td>{rental.bus.plateNumber}</td>
                  <td>{rental.bus.model}</td>
                  <td>{rental.bus.capacity}</td>
                  <td>{rental.bus.driverName}</td>
                  <td>{rental.bus.licenseNumber}</td>
                  <td>{rental.startDate}</td>
                  <td>{rental.endDate}</td>
                  <td>${rental.price}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        {!loading && rentals?.length === 0 && (
          <Text align="center" color="white" size="lg">
            No rentals found.
          </Text>
        )}
      </Paper>
    </div>
  );
};

export default RentalsPage;
