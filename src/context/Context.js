import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null, //If there is user in localstorage:3000, it vl take the user or it vl return null.
  isFetching: false,
  error: false,
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {     //here, children is all components in client side.
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE); // we r using state and dispatch  inorder to update the INITIAL STATE.

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);// whenever the state of user changes file this useeffect.

  return (
    <Context.Provider   // we r using context as Context.provider.
      value={{           // value is used to update the state in children.
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,     // dispatch is used in order to start.success,failure the process the state.
      }}
    >
      {children}
    </Context.Provider>
  );
};
// atlast we r exporting it and using it in the index.js(client).