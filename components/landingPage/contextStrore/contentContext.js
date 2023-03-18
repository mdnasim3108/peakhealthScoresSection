import React from 'react';
const ContentContext = React.createContext({ contentNumber: 0, moveContent: () => { }, resetContent: () => { } })
export default ContentContext;