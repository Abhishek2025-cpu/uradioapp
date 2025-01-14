import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.pilling.in/api/dashboard', {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2OTY5Njk2OTY5IiwiaWF0IjoxNzM2NzcyMDE0fQ.9zbl1chXoKqYIFhgh9SAmmZHpJzELYlOSZl4VAcJUWc`,
          },
        });
        console.log('API Response:', response.data);
        setData(response.data);
        setLoading(false);
      } catch (err) {
        if (err.response) {
          console.error('Response error:', err.response.data);
          setError(`Error: ${err.response.data.message}`);
        } else if (err.request) {
          console.error('Request error:', err.request);
          setError('Network error: Failed to reach the server.');
        } else {
          console.error('Unknown error:', err.message);
          setError('An unknown error occurred.');
        }
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      {data && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Bookings</Typography>
                <Typography variant="h4">{data.Bookings}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Reviews</Typography>
                <Typography variant="h4">{data.Reviews}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Upcoming</Typography>
                <Typography variant="h4">{data.Upcoming}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Home;
