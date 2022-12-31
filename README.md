# autobots

TODO
- implement server apis in server folder
- implement server api client in client.mjs
- implement completion logic
- implement isComplete to check if task is complete
- implement real client side reducer logic
- run

Entrypoint is index.js

## key ideas
- client.mjs represents a client that a application might publish
- server is the application's server which exposes it's api 
- bot.mjs is the logic to run the bot.



New idea!

Create a library that

1. runs a pipeline of prompts
2. injects a zustand store + api client into the prompt as "tools"
3. runs the pipeline.

