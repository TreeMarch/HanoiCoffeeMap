require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API Running TEST");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});

const cafeRoutes = require("./routes/cafes");
const userRoutes = require("./routes/user");


// Routes
app.use("/admin/cafes", cafeRoutes);
app.use("/admin/users", userRoutes);