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