const timeFormatter = (time:string) => {
const [hours, minutes, seconds] = time.split(":");

const date = new Date();
date.setHours(parseInt(hours), parseInt(minutes), parseInt(seconds));

const time12 = date.toLocaleTimeString("en-US", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});
return time12;
};

export default timeFormatter;