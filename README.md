# autobots

New idea!

Create a library that

1. runs a pipeline of prompts
2. injects a zustand store + api client into the prompt as "tools"
3. runs the pipeline.

## Notes

# autobots

## Problem

Public company APIs and browser automation aren't enough for developers build personal assistants that can do complex tasks for you across multiple systems.

ex. search and book a flight, invite a friend to a discord server, add a document to a calendar event.

These all require multi-step user interactions that are hard to automate. They also require a lot of context to be maintained between steps and across systems (owned by different companies).

why aren't companies willing to make apis for their uis?

## Idea

To build a personal assistant you need something like

- a loop to run the assistant
- a way to complete a task
- a way to interact with external systems

Normally, you would interact with external systems through public APIs or browser automation.

_But what if you could have direct access to functions and state on the external system's server?_

This would allow you to do things like

```
You're a personal assistant that is trying to book me a google flight.

You have access to the following functions
{{google_flight_functions}}

Task:
{{user_input}

Output a series of steps to book a flight with the functions:
```

```
google_flight_functions = {
    searchFlights: searchFlights(searchQuery)
    bookFlight: bookFlight(flightOption)
}
```

Client Side

```
// take user input
userInput = "Hey can you book me a flight for next saturday?

// here the library should figure out in what context it should run this (google's apis), upload the prompt and input to the google bot service and run the server side library
const output = await library.runAssistant(BOOK_FLIGHT_PROMPT, userInput)

// do something cool with output...
```

Server side

```
const api = getGoogleFlightBotApi()

handleBot((bot) => {

   // assuming bot is authed as user

const variables = {
   google_flight_functions: api
   user_input: bot.input
}

   // run the assistant and provide the api inputs

const output = await library.runAssistant(bot, variables)

return output

}))


```

## What is this?

autobots is a way to AI LLM bot
provide a more fine-grained / powerful api to my bot so it can act like me.
how we can start to deploy agents that can work for us / work on complex multi step tasks

he app developer doesn't even need to supply the prompts
only the server / business logic
the ai assistant developer and user supplies the prompts and chains
uploads them to the server
library handles running the assistant on the server and supplying it with the server business logic as 'tools' the bot can user in that context
so in theory, the user's bot can do anything the server/app developer allows
and the bot can do anything it wants, prompted by the user

promptable.js will help with the actually chaining / prompting / api integrations
but promptable.js should be sufficient to implement lots of stuff without this
but i do think some component is needed to give the bots more powerful controls

the magic happens in the run assistant part on the server
in that, chains / completions will be run, google apis will be called and a final output will be generated
you could actually just build that today with some fake google functions.

The key bits around this idea are a client - server library that can run the prompts/chains/bot and handle authorizing the bot

this backend lib can handle supplying the assistant with powerful context's that the bot can operate in
then the developer can use both to create their assistant 🙂
the big challenge is how to incentivize companies to actually implement a service for bots to use
which just runs all the time
and you can say, he i'd like this thing to happen everyday at this time
and it will figure out how to do it (initially you'll have to like prompt it and guide it / maybe add functionality yourself)
but as developers add more features, it will know how to do it
then with a library like what i'm proposing it can be run on backend servers
to give it more power

Once you create your app (let’s say you want it to run autonomously and do work for you.

Like a personal assistant bot
How does it do work for you?
One option is to implement apis/integrations like serp, notion, Google flights, headless browsers right?
Then compose prompts with tools to get work done
But these are actually kinda limited
It’s hard to replicate what we do in UIs
Ex. Create invite link to our discord, send it to friend in messenger
You need a really robust headless browser to do this ^ or some public client state api for each website that your bot can interact with
But what if, instead of companies creating these bot apis (which would be hard to incentivize)

we flip the problem.

Upload your bot directly to the company server (just a set of text prompts and chains files (maybe yaml))

Then the company can run a library which runs completions, injecting elevated functionality that the company provides directly into your bots prompts.

Ex

Your a bot that needs to book me a flight, and you can do it by calling these functions:

You get these actions to do it

- searchFlights
- bookFlightForUser

Book me a flight next Saturday morning to SF:
This could actually run on the server of the company.

Then, when the task is complete, the library can send back some output logging what happened during the session

On the client side, the personal assistant can show the output to the user or use it to go off and complete a task in a totally different system
Probably overkill/overly complex, but i think it might work as a way to get around the lack of a standardized programatic ui for bots.
A simpler approach would be to just get companies to publish a api that looks like a client side application but this is a lot of work and also kinda fragile and suffers from cold start problem
