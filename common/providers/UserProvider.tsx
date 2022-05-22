import React, { createContext, useReducer } from "react";
import { CONNECTORS } from "../constants";


export interface IUserContext {
  connectorSelected: number;
  connectorName?: string;
  updateSelectedConnector?: (connectorSelected: number)  => void;
}

export const intialState = {
  connectorSelected: 0,
  connectorName: CONNECTORS[0],
}

export const UserContext = createContext<IUserContext | null>(intialState);

const ACTIONS = {
  SET_CONNECTOR_SELECTED: 'SET_CONNECTOR_SELECTED',
}

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_CONNECTOR_SELECTED:
      return {
        ...state,
        connectorSelected: action.payload,
      }
    default:
      return state;
  }
}

export const UserProvider: React.FC<React.ReactNode> = ({ children })  => {
  const [state, dispatch] = useReducer(reducer, intialState);

  const updateSelectedConnector = (connectorSelected: number) => {
    dispatch({
      type: ACTIONS.SET_CONNECTOR_SELECTED,
      payload: connectorSelected,
    });
  }

  return (
    <UserContext.Provider value={{connectorSelected: state.connectorSelected, connectorName: CONNECTORS[state.connectorSelected], updateSelectedConnector}}>
      {children}
    </UserContext.Provider>
  );
}