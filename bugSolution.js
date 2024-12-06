const http = require('http');

const server = http.createServer((req, res) => {
  let sentResponse = false;

  req.on('end', () => {
    if (!sentResponse) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Hello, world!');
      sentResponse = true;
    }
  });

  req.on('close', () => {
    if (!sentResponse) {
      console.log('Request closed before response sent');
      sentResponse = true; // Important: Prevents sending response later
    }
  });

  req.on('error', (err) => {
    console.error('Request error:', err);
    if (!sentResponse) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
      sentResponse = true;
    }
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