import { create } from "zustand";

class API {
  static searchFlights = async () => {};
  static bookFlight = async () => {};
}

import z from "zod";

export const actions = {
  updateFlights: {
    type: "updateFlights",
    payload: z.undefined(),
  },
  searchFlights: {
    type: "searchFlights",
    payload: z.object({
      query: z.string(),
    }),
  },
  bookFlight: {
    type: "bookFlight",
    payload: z.object({
      flightId: z.string(),
    }),
  },
};

const reducer = async (state, action) => {
  const payload = action.payload;
  switch (action.type) {
    case Action.updateFlights:
      await API.updateFlights(payload);
      set({ flights });
      return flights;
      break;
    case Action.searchFlights:
      const flights = await API.searchFlights(payload);
      set({ flights });
      return flights;
    case Action.bookFlight:
      return await API.bookFlight(state.selectedFlight);
    default:
      break;
  }
};

export const store = create((set) => ({
  selectedFlight: null,
  flights: [],
  dispatch: (args) => set((state) => reducer(state, args)),
}));
