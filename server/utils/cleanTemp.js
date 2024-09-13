import fs from "fs"; 

export const cleanTemp = (file) => {
  if (file) {
    fs.unlink(file.path, function (err) {
      if (err) throw err;
      else console.log('Saved!');
    });
  }
}