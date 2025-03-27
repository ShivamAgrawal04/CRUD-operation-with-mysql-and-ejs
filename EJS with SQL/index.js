import express from "express";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import ejsMate from "ejs-mate";
import compression from "compression";
import methodOverride from "method-override";

import { createUserTableDB } from "./models/user.model.js";
import userRoutes from "./routes/user.routes.js";

const app = express();
app.use(compression());
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

// app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/css",
  express.static(path.join(__dirname, "public/css"), {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith(".css")) {
        res.setHeader("Content-Type", "text/css");
      }
    },
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.use(express.json());

app.use("/api/v1/users", userRoutes);

app.get("/", (req, res) => {
  console.log(__dirname);

  res.render("index");
});

const port = process.env.PORT;
if (!port) throw new Error("port must be specified");

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  createUserTableDB();
});
