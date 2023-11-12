import mongoose from "mongoose";

export async function connectToTheDatabase() {
    await mongoose
        .connect(process.env.DATABASE_CONNECT_URL)
        .then((): void => {
            console.log("Database connection successful");
        })
        .catch((error: any) => {
            console.log("Database error: " + error.message);
        });
};

export async function disconnectToTheDatabase() {
    await mongoose.connection.close()
}