
const mongoose = require('mongoose');

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log("✅ MongoDB Connected Successfully!");
    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error.message);
        process.exit(1); // Server band kar de agar DB connect na ho
    }
};

module.exports = connect;
