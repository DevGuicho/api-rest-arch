const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const { config } = require('./config');

const port = config.port || process.env.PORT;

// MIDDLEWARES
app.use(cors());
app.use(morgan('dev'));

app.listen(port, () => console.log(`server running on port ${port}`));
