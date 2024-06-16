const { dbConnect, dbClose, url } = require("./DBconnection/mongoDB.js");
const mongoose = require("mongoose");

mongoose.connect(url);

const teacherSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  salary: Number,
},{versionKey:false});  //because unnessasorily __v = 0 database ma add taatu tu

const findInDB = async () => {
  const teacher = mongoose.model("teachers", teacherSchema);  
  let data = await teacher.find();
  console.log(data);
};
// findInDB()

const insertInDB = async () => {
  //this insert methos is improved because it only data as per schema by not allow other data type then mentioned
  const teacher = mongoose.model("teachers", teacherSchema);
  const data = new teacher({
    name: "Jainam",
    age: 20,
    gender: "male",
    salary: 25000,
  });
  const result = await data.save();
  console.log(result);
};
// insertInDB()

const updateInDB = async ()=>{
  const teacher = mongoose.model("teachers", teacherSchema);
  let result = await teacher.updateOne({name:"Jainam"},{$set: {name:"Jainam Patel"}})
  console.log(result);
}
// updateInDB()

const deleteInDB = async ()=>{
  const teacher = mongoose.model("teachers", teacherSchema);
  let result = await teacher.deleteOne({name:"Jainam Patel"})
  console.log(result);
}

// deleteInDB()