import { app } from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./db/index.js";

dotenv.config({ path: ".env" });

const PORT = process.env.PORT || 8000;

// app.listen(PORT);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} `);
    });

    server.on("error", (err) => {
      console.error("Server failed to start:", err.message);
      process.exit(1);
    });
  })
  .catch((err) => console.log("DB Connection Error", err));
