import { store, actions } from "./client.mjs";

const runCompletion = () => {
  // call oai
  return "";
};

const buildPrompt = (actions, state) => {
  return ```
    Your a helpful assistant that can take actions on this website.
    
    You've been given access to their client store and can dispatch actions.

    Here are the actions:
    ${actions.map((action) => action.type).join("\n")}

    Here is the current state:
    ${JSON.stringify(state, null, 2)}

    Please try to complete the following task using the state and actions: 
    ${task}

    Please enter the next action you would like to take as a JSON in this form:
    {
        "type": "updateFlights",
        "payload": ${actions.updateFlights.payload.shape}
    }

    Next action:
    ```;
};

const log = [];
export const run = (async = (task) => {
  const step = (task) => {
    // get the state and the reducer
    const state = store.getState();
    const dispatch = state.dispatch;

    // build the prompt
    const prompt = buildPrompt(actions, state, task);

    // run the completion
    const output = runCompletion(prompt);

    // parse the output for actions
    const { type, payload } = JSON.parse(output);

    // check that the payload matches the zod type
    try {
      actions[type].payload.parse(payload);
    } catch (err) {
      return new Error(`Invalid payload for action ${type}: ${err}`);
    }

    // dispatch the action
    const res = dispatch(type, payload);

    // add to results
    log.push(res);

    return res;
  };

  // check if the task is complete
  while (!isComplete(log)) {
    step(task);

    // get next task
    // something here...
  }
});
