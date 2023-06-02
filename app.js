import path from 'path';
import fs from 'fs';
import process from 'process';

process.stdin.setEncoding('utf8')

let k = 0;
let obj = {};

function a(pat, c = k++) {

    fs.readdir(pat, { recursive: true }, (err, files) => {
        if (err) {
            console.log(err);
        }


        if (files !== undefined) {
            files.forEach(item => {

                if (item !== undefined) {
                    
                    fs.stat(path.join(process.cwd(), pat, item), { recursive: true }, (err, ite) => {
                        if (err) {
                            console.log(err);
                        }

                        if (ite.isDirectory()) {

                            obj[path.join(process.cwd(), pat, item)] = c;
                            a(path.join(pat, item))
                        }

                    })
                }

            })
        }


    })

}
let name = '';
let max = 0;
a('node_modules')
setTimeout(() => {
    let i;
    for (i in obj) {
        if (obj[i] > max) {
            max = obj[i];
            name = i
        }
    }
    console.log(name, max)
    
    fs.writeFile(path.join(name,'file.txt'),'hello world' ,(err) => {
        if (err) {
          console.log(err)
        }else {
            console.log('file is create');
        }
      })
}, 2000)




