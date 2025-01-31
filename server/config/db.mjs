import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MON_URL,{
            dbName: "wessKree"
        });
        console.log(`DB Connected`);
    } catch (error) {
        console.error(`DB Error: ${error.message}`);
        process.exit(1);
    }
};

// mongoose.connection.on('connected', () => {
//     console.log('DB connected');
// });

mongoose.connection.on('error', (err) => {
    console.log(`DB connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
    console.log('DB disconnected');
});

export default connectDB;