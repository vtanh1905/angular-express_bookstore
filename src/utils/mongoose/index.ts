import mongoose from 'mongoose';

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://root:123456@localhost:3001/assign-tabcorp?authSource=admin');
  console.log("Connect Database Successfully")
}