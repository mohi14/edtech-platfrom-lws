const useDateFormater = (dateString) => {
  const date = new Date(dateString);
  const formattedDate = `${date.getDate()} ${date.toLocaleString("default", {
    month: "short",
  })} ${date.getFullYear()} ${formatAMPM(date)}`;

  function formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    const strTime = `${hours}:${minutes}`;
    return strTime + " " + ampm;
  }

  return formattedDate;
};

export default useDateFormater;
