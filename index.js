import fs from "fs";
import path from "path";
import Yargs from "yargs";


const userPath = process.argv[2];
const option = Yargs(process.argv.slice(2)).argv;
const regularEx = /\[([^\]]+)]\((https?:\/\/[^\s)]+)\)/g;


export const extentFile = (file)=>{
    const ext = path.extname(file);
    if(ext === '.md'){
        return readFile(file);
    }else{ console.log('No es un archivo md')}
}

//función para leer documento
export const readFile = (extentFile)=>{
    try{
        if(fs.existsSync(extentFile)){
        const data = fs.readFileSync(extentFile, 'utf8')
        
        return readLinks(data)
    };
        
    }catch(err){
        console.log(err)
    }
}

//Función para leer y extraer links
export const readLinks =(extentFile) =>{
    const lines = extentFile.split('\n'); //separa en lineas el documento
    let arrayLinks = [];
    for(let i = 0; i < lines.length; i++){
        const line = lines[i];
        const links = line.matchAll(regularEx);
        const match = regularEx.test(line);
        if(match){
            for(const link of links){
                const data = {
                    text: link[1],
                    href: link[2],
                    file: userPath,
                    line: i + 1,  
                };
                arrayLinks.push(data);
            }
        }
    }
    return arrayLinks;
}


//Función jefe
export const mdLinks = (file)=>{
    return new Promise((resolve, reject)=>{
        const links = extentFile(file);
        if(option.validate){
            resolve(validateLinks(links));
        }else{
            resolve(links);
        }
        reject();
        
    })
}

mdLinks(userPath).then((results)=> console.table(results));