export const formatDateTime = (timestamp) => {
  const date = new Date(timestamp);

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedTime = `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;

  const day = date.getDate();
  const month = date.getMonth() + 1; // Month is zero-based, so we add 1
  const year = date.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  const formattedDateTime = `${formattedTime} ${formattedDate}`;
  return formattedDateTime; // Output: 16:20 25/4/2024
};

export function generateRandomNumber() {
  return Math.floor(Math.random() * 5); // Generates a random integer between 0 and 4
}

export function getStatusColor(status) {
  switch (status) {
    case "Delayed":
      return "#FF5733"; // Red or orange color for delayed status
    case "Departed":
      return "#008000"; // Green color for departed status
    case "On time":
      return "#4169E1"; // Blue color for on time status
    case "Boarding":
      return "#FFD700"; // Yellow or orange color for boarding status
    default:
      return "#05203c"; // Default color
  }
}

export function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  // Formatting the time
  const formattedTime = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

  return formattedTime;
}

export function getTimeFromDateString(dateString) {
  // Create a new Date object using the dateString
  const dateObject = new Date(dateString);

  // Get the hours, minutes, and seconds from the dateObject
  const hours = dateObject.getUTCHours();
  const minutes = dateObject.getUTCMinutes();
  const seconds = dateObject.getUTCSeconds();

  // Format the time
  const formattedTime = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

  return formattedTime;
}