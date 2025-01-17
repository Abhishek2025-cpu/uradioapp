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

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://casham.webhop.me/admin/allUsers",
          {
            headers: {
              Authorization: "Basic UGVhcmw6UGVhcmxQcm9kQ2hlY2tlckAxMjM5MA==",
              "Content-Type": "application/json",
            },
          }
        );

        const jsonData = response.data; // Directly parse JSON response
        setUsers(jsonData);
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
        User Details
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Location</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.phoneNumber}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.phoneNumber}</TableCell>
              <TableCell>
                <Chip
                  label={user.state ? "Active" : "Inactive"}
                  color={user.state ? "success" : "error"}
                  variant="outlined"
                />
              </TableCell>
              <TableCell>{user.last_location}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Dashboard;
