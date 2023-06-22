import React from "react";

function convertTimestampToObject(datetime) {
  const milliseconds = datetime.seconds * 1000 + datetime.nanoseconds / 1000000;
  const date = new Date(milliseconds);
  const now = new Date();

  const diffInMilliseconds = now - date;
  //console.log("seconds", diffInMilliseconds);
  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  //console.log("minutes", diffInMinutes);
  if (isNaN(diffInMinutes) || diffInMinutes <= 1) {
    return "now";
  } else if (diffInMinutes > 1 && diffInMinutes <= 59) {
    return `${diffInMinutes} minutes ago`;
  } else if (diffInMinutes > 59) {
    return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`;
  }
}

function sortArray(array) {
  //console.log(array);
  return array.sort((a, b) => {
    const dateA =
      a.datetime instanceof Date ? a.datetime : new Date(a.datetime);
    const dateB =
      b.datetime instanceof Date ? b.datetime : new Date(b.datetime);

    const timeA = dateA.getTime();
    const timeB = dateB.getTime();

    if (!isNaN(timeA) && !isNaN(timeB)) {
      return timeB - timeA;
    } else if (!isNaN(timeA)) {
      return -1;
    } else if (!isNaN(timeB)) {
      return 1;
    } else {
      return dateB - dateA;
    }
  });
}

function Deleted({ todos }) {
  return (
    <div className="relative">
      <div className="absolute -top-2 left-[90px] w-[120px] bg-red-600 px-2 text-xl font-bold text-center rounded-md">
        Deleted
      </div>
      <div className="border bg-slate-900 text-white w-[300px]">
        <div className="flex flex-col p-[20px] pt-10 gap-2">
          {sortArray(todos)?.map((todo, i) => (
            <div
              key={i}
              className="border border-red-500 flex flex-row justify-between items-center gap-1 px-3 scale-80 transition-all duration-200 hover:scale-110 hover:border-red-500"
            >
              <div className="flex-1 py-2 text-xs">{todo.desc}</div>
              <div className="text-xs">
                {convertTimestampToObject(todo.datetime)}
              </div>
            </div>
          ))}
        </div>
        <div className="px-[20px] pb-[10px] text-xs text-red-600">
          *Permanently deleted after 24hrs
        </div>
      </div>
    </div>
  );
}

export default Deleted;
