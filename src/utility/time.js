export const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
  
    const hours = date.getUTCHours(); // Use getUTCHours() instead of getHours()
    const minutes = date.getUTCMinutes(); // Use getUTCMinutes() instead of getMinutes()
    const formattedTime = `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
  
    const day = date.getUTCDate(); // Use getUTCDate() instead of getDate()
    const month = date.getUTCMonth() + 1; // Month is zero-based, so we add 1
    const year = date.getUTCFullYear(); // Use getUTCFullYear() instead of getFullYear()
    const formattedDate = `${day}/${month}/${year}`;
  
    const formattedDateTime = `${formattedTime} ${formattedDate}`;
    return formattedDateTime; // Output: 16:20 25/4/2024
  };
  
  export function generateRandomNumber() {
    return Math.floor(Math.random() * 5); // Generates a random integer between 0 and 4
  }
  
  
  export function getCurrentTime() {
    const now = new Date();
    const hours = now.getUTCHours(); // Use getUTCHours() instead of getHours()
    const minutes = now.getUTCMinutes(); // Use getUTCMinutes() instead of getMinutes()
    const seconds = now.getUTCSeconds(); // Use getUTCSeconds() instead of getSeconds()
  
    // Formatting the time
    const formattedTime = `${hours < 10 ? "0" + hours : hours}:${
      minutes < 10 ? "0" + minutes : minutes
    }:${seconds < 10 ? "0" + seconds : seconds}`;
  
    return formattedTime;
  }
  
  export function getTimeFromDateString(dateString) {
    // Create a new Date object using the dateString
    const dateObject = new Date(dateString);
  
    // Get the hours, minutes, and seconds from the dateObject in UTC
    const hours = dateObject.getUTCHours(); // Use getUTCHours() instead of getHours()
    const minutes = dateObject.getUTCMinutes(); // Use getUTCMinutes() instead of getMinutes()
    const seconds = dateObject.getUTCSeconds(); // Use getUTCSeconds() instead of getSeconds()
  
    // Format the time
    const formattedTime = `${hours < 10 ? "0" + hours : hours}:${
      minutes < 10 ? "0" + minutes : minutes
    }:${seconds < 10 ? "0" + seconds : seconds}`;
  
    return formattedTime;
  }
  