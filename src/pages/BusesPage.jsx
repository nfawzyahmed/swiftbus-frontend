import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBuses } from "../features/buses/busesSlice";
import { createRental, resetStatus } from "../features/rentals/rentalsSlice";
import {
  Table,
  Title,
  Loader,
  Center,
  Badge,
  Paper,
  Text,
  Button,
} from "@mantine/core";
import dayjs from "dayjs";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { useNavigate } from 'react-router-dom';

const BusesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list: buses, loading, error } = useSelector((state) => state.buses);
  const { loading: rentalLoading, error: rentalError, success: rentalSuccess } = useSelector(
    (state) => state.rentals
  );

  const [selectedBus, setSelectedBus] = useState(null);
  const [modalOpened, setModalOpened] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    dispatch(fetchBuses());
  }, [dispatch]);

  useEffect(() => {
    if (rentalSuccess) {
      alert("Rental confirmed!");
      setModalOpened(false);
      dispatch(resetStatus());
    }
    if (rentalError) {
      alert(rentalError);
      dispatch(resetStatus());
    }
  }, [rentalSuccess, rentalError, dispatch]);

  const openModal = (bus) => {
    setSelectedBus(bus);
    setStartDate("");
    setEndDate("");
    setModalOpened(true);
  };

  const handleConfirm = () => {
    if (!startDate || !endDate) {
      alert("Please select start and end dates");
      return;
    }

    const start = dayjs(startDate);
    const end = dayjs(endDate);
    const days = end.diff(start, "day") + 1; // inclusive
    if (days <= 0) {
      alert("End date must be after start date");
      return;
    }

    const rentalData = {
      client: { id: 1 },
      bus: { id: selectedBus.id },
      startDate: start.format("YYYY-MM-DD"),
      endDate: end.format("YYYY-MM-DD"),
      price: 20 * days,
      status: "APPROVED",
    };

    dispatch(createRental(rentalData));
  };

  const calculatePrice = () => {
    if (!startDate || !endDate) return 20;
    const start = dayjs(startDate);
    const end = dayjs(endDate);
    const days = end.diff(start, "day") + 1;
    return days > 0 ? 20 * days : 20;
  };

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
          height: "95%",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          padding: "40px",
          overflowY: "auto",
        }}
      >
        <Title order={1} align="center" style={{ color: "white", fontSize: "3rem", fontWeight: 700, marginBottom: "1.5rem" }}>
          Available Buses
        </Title>

        <Text align="center" color="white" size="lg" style={{ marginBottom: "2rem" }}>
          Choose from the list of currently available buses below
        </Text>

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

        {!loading && buses?.length > 0 && (
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
                <th style={{ color: "white" }}>Status</th>
                <th style={{ color: "white" }}>Driver</th>
              </tr>
            </thead>

            <tbody>
              {buses.map((bus) => (
                <tr
                  key={bus.id}
                  style={{ fontSize: "1rem", transition: "0.3s", cursor: "pointer" }}
                  onClick={() => openModal(bus)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.01)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.85)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <td>{bus.id}</td>
                  <td>{bus.plateNumber}</td>
                  <td>{bus.model}</td>
                  <td>{bus.capacity}</td>
                  <td>
                    <Badge color={bus.status === "AVAILABLE" ? "green" : "red"} size="sm" radius="sm">
                      {bus.status}
                    </Badge>
                  </td>
                  <td>
                    {bus.driver ? (
                      <Badge color="blue" size="sm" radius="sm" variant="light">
                        {bus.driver.name} ({bus.driver.experienceYears} yrs)
                      </Badge>
                    ) : (
                      <Badge color="gray" radius="sm" size="sm">
                        No Driver Assigned
                      </Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Paper>
      {/* My Rentals Button */}
      <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
        <Button
          size="md"
          color="blue"
          onClick={() => navigate("/rentals")}
          style={{
            borderRadius: "25px",   // more rounded
            padding: "8px 20px",    // extra padding
            fontWeight: 600,
            boxShadow: "0 3px 6px rgba(0,0,0,0.16)", // subtle shadow
            textTransform: "uppercase",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          My Rentals
        </Button>
      </div>
      {/* Simple Rental Dialog */}
      <Dialog open={modalOpened} onClose={() => setModalOpened(false)} fullWidth maxWidth="xs">
        <DialogTitle>Rent Bus #{selectedBus?.id}</DialogTitle>
        <DialogContent>
          <label style={{ fontSize: "0.85rem", marginBottom: "4px", display: "block" }}>Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={{ width: "100%", padding: "5px 8px", fontSize: "0.85rem", marginBottom: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
          />

          <label style={{ fontSize: "0.85rem", marginBottom: "4px", display: "block" }}>End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={{ width: "100%", padding: "5px 8px", fontSize: "0.85rem", marginBottom: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
          />

          <Text size="sm" weight={500}>
            Price: ${calculatePrice()}
          </Text>
        </DialogContent>

        <DialogActions>
          <Button size="sm" color="gray" onClick={() => setModalOpened(false)}>
            Cancel
          </Button>
          <Button size="sm" color="green" onClick={handleConfirm} loading={rentalLoading}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BusesPage;
