const http = require('http');

const server = http.createServer((req, res) => {
  // Without this check, the response will be sent twice
  // if the request ends prematurely (e.g., client disconnects)
  let sentResponse = false;

  req.on('end', () => {
    if (!sentResponse) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Hello, world!');
      sentResponse = true;
    }
  });

  req.on('error', (err) => {
    console.error('Request error:', err);
  });

  res.on('finish', () => {
    console.log('Response sent successfully!');
  });

  res.on('error', (err) => {
    console.error('Response error:', err);
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});