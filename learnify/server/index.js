const express = require("express");
const app = express();

const userRoutes = require("./Routes/User");
const profileRoutes = require("./Routes/Profile");
const paymentRoutes = require("./Routes/Payments");
const courseRoutes = require("./Routes/Courses");
const contactRoutes = require("./Routes/Contact");

const database = require("./Config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const cloudinaryConnect = require("./Config/cloudinary");
require("dotenv").config();
const fileUpload = require("express-fileupload");

const PORT = process.env.PORT || 7000;

// database Connect 
database.dbConnect();
// cloudinary connect 
cloudinaryConnect.cloudinaryConnect();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp",
    })
);

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/contact", contactRoutes);

// default routes 
app.get("/", (req, resp) => {
    return resp.send(`<h1>This is home page baby</h1>`);
});

app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
});