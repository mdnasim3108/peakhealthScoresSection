import React from 'react';
const ContentContext = React.createContext({ contentNumber: 0, moveContent: () => { }, resetContent: () => {},showSignUp:true,hideSignUp:()=>{}})
export default ContentContext;