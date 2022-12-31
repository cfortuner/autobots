import axios from "axios";
import { store, actions } from "./client.mjs";
import { config } from "dotenv";
import { Configuration, OpenAIApi } from "openai";
config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const runCompletion = async (prompt) => {
  try {
    const { data } = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
    });

    return data.choices[0].text;
  } catch (e) {
    throw e;
  }
};

const buildPrompt = (actions, state, task) => {
  return `
    Your a helpful assistant that can take actions on this website.
    
    You've been given access to their client store and can dispatch actions.

    Here are the actions:
    ${Object.values(actions)
      .map(
        (action) =>
          `TYPE: ${action.type}\nPAYLOAD: ${JSON.stringify(action.payload)}`
      )
      .join("\n")}

    Here is the current state:
    ${JSON.stringify(state, null, 2)}

    Please try to complete the following task using the state and actions: 
    ${task}
    
    Output the next action as valid JSON replacing the values with the correct ones:
    {
      "type": "selectFlight",
      "payload": {
        "flightId": "askldjfagasld"
      }
    }

    Next action:`;
};

console.log(actions.bookFlight.payload);

export const run = async (task) => {
  const log = [];

  const step = async (task) => {
    // get the state and the reducer
    const state = store.getState();
    const dispatch = state.dispatch;

    // build the prompt
    const prompt = buildPrompt(actions, state, task);

    // run the completion
    const output = await runCompletion(prompt);

    // parse the output for actions
    const { type, payload } = JSON.parse(output.trim());

    // check that the payload matches the zod type
    // try {
    //   actions[type].payload.parse(payload);
    // } catch (err) {
    //   return new Error(`Invalid payload for action ${type}: ${err}`);
    // }

    // dispatch the action
    const res = dispatch(type, payload);

    // add to results
    log.push(res);

    return res;
  };

  const isComplete = async () => {
    const res = await runCompletion(
      `Given the following task and log of outputs, please determine if the task is complete:
    TASK: ${task}

    LOG: ${log.join("\n")}

    Is the task complete? (true/false):
    `
    );

    return res.trim().toLowerCase() === "true";
  };

  // check if the task is complete
  let tries = 5;
  while (!(await isComplete(log)) && tries > 0) {
    await step(task);

    await new Promise((r) => setTimeout(r, 1000));
    tries -= 1;
  }
};
