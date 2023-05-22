function generateRandomEmail() {
    const emailLength = 6;
    const emailChars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let email = '';
  
    for (let i = 0; i < emailLength; i++) {
      const randomIndex = Math.floor(Math.random() * emailChars.length);
      email += emailChars[randomIndex];
    }
  
    email += '@example.com'; 
  
    return email;
  }
export default generateRandomEmail;