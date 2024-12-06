# Node.js HTTP Server: Double Response on Premature Request Termination

This repository demonstrates an uncommon bug in Node.js HTTP servers where the response might be sent twice if the client disconnects before the server finishes processing the request.

## Bug Description
The issue stems from a missing check to ensure that a response is only sent once. If a client abruptly terminates the connection, the server might still send the response, leading to duplicate responses or unexpected behavior.

## How to Reproduce
1. Clone this repository.
2. Run `node bug.js` to start the server.
3. Use a tool like `curl` or a browser to make a request to `http://localhost:3000`. 
4. Interrupt the request before it completes (e.g., by killing the curl process or closing the browser tab).

You'll observe that the server might still log a 'Response sent successfully!' message, indicating that the response was sent even after the client disconnected.

## Solution
The solution involves adding a flag to track whether the response has already been sent.  This prevents sending the response multiple times.

## Additional Considerations
This type of error highlights the importance of proper error handling and event management in Node.js applications, particularly when dealing with network requests and long-running processes.