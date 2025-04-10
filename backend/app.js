// Modules
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('./lib/logger');
const cors = require('cors');

logger.info('Environment Mode: ' + process.env.NODE_ENV);

// Routes
const applicationRouter = require("./routes/applicationRoutes.js");
const dashboardRouter = require("./routes/dashboardRoutes.js");
const agentsRouter = require("./routes/agentRoutes.js");
const clientsRouter = require("./routes/clientRoutes.js");
const requirementsRouter = require("./routes/requirementRoutes.js");
const authRouter = require("./routes/authRoutes.js");
const ownerRouter = require("./routes/ownerRoutes.js");
const propertyRoutes = require("./routes/propertyRoutes.js");
const accountRoutes = require("./routes/accountRoutes.js");

// Validators
const jwtValidator = require("./validators/jwtValidator.js");

// Application Configurations
const app = express();

if (process.env.NODE_ENV != 'production') {
  app.use(require('morgan')('dev'));
  require('dotenv').config();
}

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(
  cors({
    origin: process.env.ALLOW_CORS?.split(','),
  })
);
logger.info('Allowed origins-' + process.env.ALLOW_CORS);

app.use("/api/auth", authRouter);
app.use("/api/application", jwtValidator, applicationRouter);
app.use("/api/dashboard", jwtValidator, dashboardRouter);
app.use("/api/agents", jwtValidator, agentsRouter);
app.use("/api/clients", jwtValidator, clientsRouter);
app.use("/api/requirements", jwtValidator, requirementsRouter);
app.use("/api/owners", jwtValidator, ownerRouter);
app.use("/api/properties", jwtValidator, propertyRoutes);
app.use("/api/account", jwtValidator, accountRoutes);

logger.info('Routes are configured.');

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  logger.error('original URL :', req.originalUrl);
  logger.error(err.message, err);

  // render the error page
  res.status(err.status || 500);
  res.send({
    success: false,
    message: err.message,
  });
});
logger.info('Application error handler attached');

logger.info('Application configuration applied successfully');
module.exports = app;
