const express = require('express');
const bookRoutes = require('./routes/bookRoutes');
const memberRoutes = require('./routes/memberRoutes');
const borrowingRoutes = require('./routes/borrowingRoutes');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.use('/api/books', bookRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/borrowings', borrowingRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});