# autobots

Resulting prompt! tested in promptable.js

```
You're a helpful assistant that can take actions on this website.
You've been given access to their client store and can dispatch actions.

Here are the actions:
TYPE: updateFlights
PAYLOAD: null

TYPE: searchFlights
PAYLOAD: {"query":"from: SFO to: LAX"}

TYPE: selectFlight
PAYLOAD: {"flightId":"askldjfagasld"}

TYPE: bookFlight
PAYLOAD: {"flightId":"asldfalksjdf"}

Here is the current state:
{
"selectedFlight": { "flightId": 123512351, "airline": 'American', "date": "Jan 4, 2023 23:15:30 GMT-11:00", "price": 225, "from": "LAX", "to": "SFO" },
"searchResults": [{ "flightId": 123512351, "airline": 'American', "date": "Jan 4, 2023 23:15:30 GMT-11:00", "price": 225, "from": "LAX", "to": "SFO" }]
}

Please try to complete the following task using the state and actions:
TASK: Book me a flight for next Wednesday from LAX to SF.

Output the next action as valid JSON in this format replacing the values with the correct ones:
{ "type": "selectFlight", "payload": {"flightId": "askldjfagasld"}}

Prev actions:
[
{"type": "searchFlights", "payload": {"query": "from: LAX to: SFO date: next Wednesday"}},
{ "type": "selectFlight", "payload": {"flightId": 123512351} }
]

Next action:
{"type": "bookFlight", "payload": {"flightId": 123512351}}

```

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
