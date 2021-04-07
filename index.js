require('./lib/mongoose');
const debug = require('debug')('app:server');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const app = express();
const { config } = require('./config');
const apiUsers = require('./router/users');
const apiNotes = require('./router/notes');
const authApi = require('./router/auth');
const notFoundHandler = require('./middlewares/notFoundHandler');
const {
  errorHandler,
  wrapErrors,
  logErrors
} = require('./middlewares/errorHandler');

const port = config.port || process.env.PORT;

// MIDDLEWARES
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(morgan('dev'));

// ROUTES
apiUsers(app);
apiNotes(app);
authApi(app);

// NOT FOUND HANDLER
app.use(notFoundHandler);

// ERROR HANDLERS
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(port, () => debug(`server running on port ${port}`));
