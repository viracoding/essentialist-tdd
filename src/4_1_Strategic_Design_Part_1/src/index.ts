import application from "./bootstrap";

const port = Number(process.env.PORT || 3000);

application.start(port);