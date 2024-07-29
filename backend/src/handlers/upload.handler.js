const fs = require('fs');
const path = require('path');
const util = require('util');
const pump = util.promisify(require('stream').pipeline);

async function uploadFile(req, res) {
    const data = await req.file();
    console.log(data);

    if (!data || !data.filename) {
        res.status(404).send({ message: 'No file uploaded or file name is missing !' });
        return;
    }
    const filename = data.filename.replace(/\s+/g, '-');
    const filePath = path.join(global.appRoot, "uploads/images", filename);
    const fileUrl = `${process.env.HOST}/uploads/${filename}`;

    try {
        await pump(data.file, fs.createWriteStream(filePath));
        res.send({
            message: 'File uploaded successfully',
            url: fileUrl,
            filename: filename
        })

    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error uploading file' });
    }

    // if(!data || !data.filename){
    //     res.status(404).send({message: 'No file uploaded or file name is missing !'});
    //     return;
    // }

    // const name = data.fields.name.value;
    // const filename = name.replace(/\s+/g, '-');
    // const extension = data.filename.substring(data.filename.lastIndexOf("."));
    // const fullFilename = filename + extension;
    // console.log(fullFilename);

    // // const filename = name.replace(/\s+/g, '-');
    // const filePath = path.join(global.appRoot,"uploads/images", fullFilename);
    // const fileUrl = `${process.env.HOST}/uploads/${fullFilename}`;

    // try{
    //     await pump(data.file, fs.createWriteStream(filePath));
    //     res.send({
    //         message:'File uploaded successfully',
    //         url:fileUrl,
    //         filename:filename
    //     })

    // }catch(err){
    //     console.error(err);
    //     res.status(500).send({message:'Error uploading file'});
    // }
}

async function uploadFiles(req, res) {
    const files = req.files; // Danh sách các tệp tin được tải lên
    console.log(files);
    if (!files || files.length === 0) {
      res.status(404).send({ message: 'No files uploaded' });
      return;
    }
  
    const uploadedFiles = [];
  
    for (const file of files) {
      const filename = file.name.replace(/\s+/g, '-');
      const filePath = path.join(global.appRoot, 'uploads/images', filename);
      const fileUrl = `${process.env.HOST}/uploads/${filename}`;
  
      try {
        await pump(file.data, fs.createWriteStream(filePath));
        uploadedFiles.push({
          filename: filename,
          url: fileUrl
        });
      } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error uploading files' });
        return;
      }
    }
  
    res.send({
      message: 'Files uploaded successfully',
      files: uploadedFiles
    });
  }
module.exports = {
    uploadFile,
    uploadFiles,

}