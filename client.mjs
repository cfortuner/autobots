import create from "zustand/vanilla";

class API {
  static searchFlights = async () => {};
  static bookFlight = async () => {};
}

import z from "zod";

export const actions = {
  updateFlights: {
    type: "updateFlights",
    payload: null,
  },
  searchFlights: {
    type: "searchFlights",
    payload: {
      query: "from: SFO to: LAX",
    },
  },
  selectFlight: {
    type: "selectFlight",
    payload: {
      flightId: "askldjfagasld",
    },
  },
  bookFlight: {
    type: "bookFlight",
    payload: {
      flightId: "asldfalksjdf",
    },
  },
};

const reducer = async (state, action) => {
  const payload = action.payload;
  switch (action.type) {
    case actions.updateFlights:
      await API.updateFlights(payload);
      set({ flights });
      return flights;
      break;
    case actions.searchFlights:
      const flights = await API.searchFlights(payload);
      set({ flights });
      return flights;
    case actions.selectFlight:
      set({ selectedFlight: payload.flightId });
      return flights;
    case actions.bookFlight:
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
