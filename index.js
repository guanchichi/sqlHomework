const cors = require("cors");
const express = require('express');
const app = express();
const port = 3307;

const userRoutes = require('./routes/userRoutes');

app.use(express.json());
app.use('/api', userRoutes);
app.use(cors());
app.use(express.urlencoded({ extended: true }));


app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

app.listen(port, () => {
  console.log(`後端伺服器聆聽在 port ${port}...`);
});


