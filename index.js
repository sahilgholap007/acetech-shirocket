const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json()); // Parse JSON bodies

// Route to fetch Shiprocket orders
app.get('/api/orders', async (req, res) => {
  try {
    const { page = 1, per_page = 350 } = req.query;

    // Fetch data from Shiprocket API
    const response = await axios.get(
      `https://apiv2.shiprocket.in/v1/external/orders?page=${page}&per_page=${per_page}`,
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjU1NzUwMDgsInNvdXJjZSI6InNyLWF1dGgtaW50IiwiZXhwIjoxNzM1ODE1MDQ0LCJqdGkiOiJ5NEppRHJQRjRGZDRVTEtFIiwiaWF0IjoxNzM0OTUxMDQ0LCJpc3MiOiJodHRwczovL3NyLWF1dGguc2hpcHJvY2tldC5pbi9hdXRob3JpemUvdXNlciIsIm5iZiI6MTczNDk1MTA0NCwiY2lkIjo0MzA2ODE5LCJ0YyI6MzYwLCJ2ZXJib3NlIjpmYWxzZSwidmVuZG9yX2lkIjowLCJ2ZW5kb3JfY29kZSI6IiJ9.ytjwNJ4BRfC91kWfAZWetulcYiAnkDP2PqUE9FjXYSQ`,
        },
      }
    );

    // Forward the response to the frontend
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Error fetching orders' });
  }
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
