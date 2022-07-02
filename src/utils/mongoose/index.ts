import mongoose from "mongoose";

main().catch((err) => console.log(err));

async function main() {
  const USERNAME: string = "root";
  const PASSWORD: string = "123456";
  const HOSTNAME: string = "mongodb";
  const PORT: number = 27017;
  const DB_NAME: string = "expressjs-inversity-practise";
  await mongoose.connect(
    `mongodb://${USERNAME}:${PASSWORD}@${HOSTNAME}:${PORT}/${DB_NAME}?authSource=admin`
  );
  console.log("Connect Database Successfully");
}
