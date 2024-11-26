const http = require('http');
const url = require('url');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        // Serve the HTML form
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Calculator</title>
            </head>
            <body>
                <h1>Simple Calculator</h1>
                <form method="POST" action="/">
                    <label for="num1">Number 1:</label>
                    <input type="number" id="num1" name="num1" required>
                    <br>
                    <label for="operation">Operation:</label>
                    <select id="operation" name="operation" required>
                        <option value="+">+</option>
                        <option value="-">-</option>
                        <option value=""></option>
                        <option value="/">/</option>
                    </select>
                    <br>
                    <label for="num2">Number 2:</label>
                    <input type="number" id="num2" name="num2" required>
                    <br>
                    <button type="submit">Calculate</button>
                </form>
            </body>
            </html>
        `);
    } else if (req.method === 'POST') {
        // Handle form submission
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const formData = querystring.parse(body);
            const num1 = parseFloat(formData.num1);
            const num2 = parseFloat(formData.num2);
            const operation = formData.operation;

            let result;
            switch (operation) {
                case '+':
                    result = num1 + num2;
                    break;
                case '-':
                    result = num1 - num2;
                    break;
                case '*':
                    result = num1 * num2;
                    break;
                case '/':
                    result = num2 !== 0 ? num1 / num2 : 'Cannot divide by zero';
                    break;
                default:
                    result = 'Invalid operation';
            }

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Calculator Result</title>
                </head>
                <body>
                    <h1>Calculator Result</h1>
                    <p>Result: ${result}</p>
                    <a href="/">Go back</a>
                </body>
                </html>
            `);
        });
    } else {
        res.writeHead(405, { 'Content-Type': 'text/plain' });
        res.end('Method Not Allowed');
    }
});

const PORT = 3005;
server.listen(PORT, () => {
    console.log(Server is running on http://localhost:${PORT});
});