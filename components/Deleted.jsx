import React from "react";

function convertTimestampToObject(datetime) {
  const milliseconds = datetime.seconds * 1000 + datetime.nanoseconds / 1000000;
  const date = new Date(milliseconds);
  const now = new Date();

  const diffInMilliseconds = now - date;
  console.log("seconds", diffInMilliseconds);
  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  console.log("minutes", diffInMinutes);
  if (isNaN(diffInMinutes) || diffInMinutes <= 2) {
    return "now";
  } else if (diffInMinutes > 2 && diffInMinutes <= 59) {
    return `${diffInMinutes} minutes ago`;
  } else if (diffInMinutes > 59) {
    return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`;
  }
}

function sortArray(array) {
  console.log(array);
  return array.sort((a, b) => {
    const dateA =
      a.datetime instanceof Date ? a.datetime : new Date(a.datetime);
    const dateB =
      b.datetime instanceof Date ? b.datetime : new Date(b.datetime);
    return dateB.getTime() - dateA.getTime(); // Sort based on datetime in descending order
  });
}

function Deleted({ todos }) {
  return (
    <div className="relative">
      <div className="absolute -top-2 left-[90px] w-[120px] bg-red-900 px-2 text-xl font-bold text-center rounded-md">
        Deleted
      </div>
      <div className="border bg-slate-900 text-white w-[300px]">
        <div className="flex flex-col p-[20px] pt-10 gap-2">
          {sortArray(todos)?.map((todo, i) => (
            <div
              key={i}
              className="border border-cyan-500 flex flex-row justify-between items-center gap-1 px-3"
            >
              <div className="flex-1 py-2 text-xs">{todo.desc}</div>
              <div>{convertTimestampToObject(todo.datetime)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Deleted;
