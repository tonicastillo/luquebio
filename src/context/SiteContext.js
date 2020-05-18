import React from 'react';

const defaultState = {};
const SiteContext = React.createContext(defaultState);

const SiteContextProvider = ({ children }) => {
  return <SiteContext.Provider>{children}</SiteContext.Provider>;
};

export default SiteContext;

export { SiteContextProvider };