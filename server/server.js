import dotenv from "dotenv"
import express from "express"
import cors from "cors";
import cafeRoutes from "./routes/cafes.js";
import userRoutes from "./routes/user.js";
import authRoute from "./routes/auth.js"
import errorHandler from './middleware/errorHandler.js';

dotenv.config();
const app = express();

// middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API Running TEST");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});

// routes
app.use("/admin/cafes", cafeRoutes);
app.use("/admin/users", userRoutes);

//public routes 
app.use("/api/auth", authRoute)

// Error handler
app.use(errorHandler);