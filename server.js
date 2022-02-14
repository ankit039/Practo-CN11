const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
const express = require("express");
require('dotenv').config()

const app = express();
const port = 8000;

Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Tracing.Integrations.Express({ app }),
    ],
    tracesSampleRate: 1.0,
});

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

// All rotues is live here
app.get("/", function rootHandler(req, res) {
    res.end("Hello world!");
});

app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("Error Produced when /debug-sentry route used.");
});

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
    res.statusCode = 500;
    res.json({ errorid: res.sentry, sucesss: false }).end();
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});