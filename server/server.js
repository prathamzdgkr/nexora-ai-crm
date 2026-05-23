const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
// Add this near your other routes (like app.use('/api/leads', leadRoutes))
const userRoutes = require('./routes/userRoutes');


const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("FlowCRM API Running");
});


// ROUTES
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/leads", require("./routes/leadRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
);