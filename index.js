require('./lib/mongoose');
const debug = require('debug')('app:server');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const { config } = require('./config');
const apiUsers = require('./router/users');
const apiNotes = require('./router/notes');
const notFoundHandler = require('./middlewares/notFoundHandler');
const {
  errorHandler,
  wrapErrors,
  logErrors
} = require('./middlewares/errorHandler');

const port = config.port || process.env.PORT;

// MIDDLEWARES
app.use(cors());
app.use(morgan('dev'));

// ROUTES
apiUsers(app);
apiNotes(app);

// NOT FOUND HANDLER
app.use(notFoundHandler);

// ERROR HANDLERS
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(port, () => debug(`server running on port ${port}`));
