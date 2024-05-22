const { log, dir } = require('console');
const fs = require('fs');
const path = require('path');
const dirPath = path.join(__dirname,'Temp');
const filePath = path.join(dirPath,'myfile.txt')


if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}





fs.writeFileSync(filePath,'Name : Patel Het Rajeshkumar \n')

//or

fs.writeFile(filePath,'Name : Patel Het Rajeshkumar \n',(err)=>{
    if(err)
        console.log("File not created");
})






fs.appendFileSync(filePath,'Enrolment Num. : 22BECE30273 \n')
fs.appendFileSync(filePath,'Div : D\n')

//or

fs.appendFile(filePath,'Enrolment Num. : 22BECE30273 \n',(err)=>{
    if(err)
        console.warn('File not updated');
})
fs.appendFile(filePath,'Div : D\n',(err)=>{
    if(err)
        console.warn('File not updated');
})






const t1 = fs.readFileSync(filePath).toString();
console.log(t1);

//or

fs.readFile(filePath,'utf8',(err,data)=>{
    console.log(data);
})






fs.renameSync(filePath,path.join(dirPath,'MyFile.txt'))

//or

fs.rename(filePath,path.join(dirPath,'MyFile.txt'),(err)=>{
    if(err)
        console.log('File not renamed');
})





// fs.unlinkSync(filePath)  //will delete mentioned file




// fs.mkdir(path.join(dirPath,'TempTemp'),((err)=>{
//   if(err)
//     console.log("Directory doesn't created");
// }))


// const t2 = fs.readdirSync("C:\\Users\\hetp8\\OneDrive\\Desktop\\NodeJS");
// console.log(t2);

        //or

// fs.readdir("C:\\Users\\hetp8\\OneDrive\\Desktop\\NodeJS",(err,data)=>{
//     if(err)
//         console.log("Failed to read");
//     else
//         console.log(data);
// })


// fs.rmdirSync(path.join(dirPath,'TempTemp'));

//or

// fs.rmdir(path.join(dirPath,'TempTemp'),(err)=>{        
//     if(err)
//         console.log("Directory not removed");
// })



fs.renameSync(path.join(dirPath,'TempTemp') , path.join(dirPath,'myTemp'));

//or

fs.rename(path.join(dirPath,'myTemp'),path.join(dirPath,'TempTemp'),(err)=>{
    if(err)
        console.log("File not renamed");
})