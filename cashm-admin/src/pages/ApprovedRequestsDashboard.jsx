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

const ApprovedRequestsDashboard = () => {
  const [approvedRequests, setApprovedRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApprovedRequests = async () => {
      try {
        const response = await axios.get(
          "https://casham.webhop.me/admin/approved-requests",
          {
            headers: {
              Authorization: "Basic UGVhcmw6UGVhcmxQcm9kQ2hlY2tlckAxMjM5MA==",
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Approved Requests Response data:", response.data); // Log the response data

        const jsonData = response.data; // Directly parse JSON response
        setApprovedRequests(jsonData);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedRequests();
  }, []);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 800, margin: "auto", mt: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Approved Requests Details
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Request ID</TableCell>
            <TableCell>Requestor</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {approvedRequests.map((request) => (
            <TableRow key={request.id}>
              <TableCell>{request.id}</TableCell>
              <TableCell>{request.requestor}</TableCell>
              <TableCell>
                <Chip
                  label={request.status ? "Approved" : "Pending"}
                  color={request.status ? "success" : "warning"}
                  variant="outlined"
                />
              </TableCell>
              <TableCell>{request.details}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ApprovedRequestsDashboard;
