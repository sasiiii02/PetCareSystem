require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));
app.use("/uploads", express.static("uploads"));
app.use("/api/adoptablepets", require("./routes/adoptablePetRoutes"));
app.use("/api/adoptionform", require("./routes/adoptionFormRoutes"));
app.use("/api/foradoption", require("./routes/forAdoptionRoutes"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
