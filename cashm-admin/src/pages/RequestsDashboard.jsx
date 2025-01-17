import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
} from "@mui/material";

const RequestsDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://casham.webhop.me/admin/requests",
          {
            headers: {
              Authorization: "Basic UGVhcmw6UGVhcmxQcm9kQ2hlY2tlckAxMjM5MA==",
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Response data:", response.data); // Log the response data

        const jsonData = response.data; // Directly parse JSON response
        setRequests(jsonData);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 800, margin: "auto", mt: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Requests Details
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Request ID</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request.id}>
              <TableCell>{request.id}</TableCell>
              <TableCell>{request.amount}</TableCell>
              <TableCell>
                <Chip
                  label={request.status ? "Completed" : "Pending"}
                  color={request.status ? "success" : "warning"}
                  variant="outlined"
                />
              </TableCell>
              <TableCell>{request.updatedFor}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RequestsDashboard;
