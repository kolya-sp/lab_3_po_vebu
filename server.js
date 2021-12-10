const http = require("http");
const fs = require("fs");

http.createServer(async (request, response) => {

    if(request.url == "/add" && request.method === "POST"){
       /* const buffers = [];   // буфер для получаемых данных

        // получаем данные из запроса в буфер
        for await (const chunk of request) {
            buffers.push(chunk);
        }
        // получаем строковое представление ответа
        let data = Buffer.concat(buffers).toString();
        console.log("вміст переданого" + data);

        response.end("ответ");*/
        let data = "";
        request.on("data", chunk => {
            data += chunk;
        });
        request.on("end", () => {
            fs.writeFile("data.txt", data, function(error){

                if(error) throw error; // если возникла ошибка
                console.log("Асинхронная запись файла завершена. Содержимое файла:");
				
				let data2 = fs.readFileSync("data.txt", "utf8");
				console.log(data2);  // выводим считанные данные
            });
            response.end("test");
        });
    }
    if(request.url == "/load"){
        console.log("передані дані з data.txt:");
        let data2 = fs.readFileSync("data.txt", "utf8");
        console.log(data2);  // выводим считанные данные
        response.end(data2);
    }
    if(request.url == "/admin"){
        fs.readFile("index31.html", (error, data) => response.end(data));
    }
    if(request.url == "/client"){
        fs.readFile("index32.html", (error, data) => response.end(data));
    }
}).listen(3000, ()=>console.log("Сервер запущен по адресу http://localhost:3000"));