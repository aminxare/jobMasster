const runAtTime = (time, cb) => {
  const secondDate =
    time instanceof Date ? time.getTime() : new Date(time).getTime();
  const timeNumber = secondDate - new Date().getTime();

  return setTimeout(() => {
    cb();
  }, timeNumber);
};

const stopRunAtTime = (timeOut) => {
  clearTimeout(timeOut);
  console.log("Stopped");
};

exports.runAtTime = runAtTime;
exports.stopRunAtTime = stopRunAtTime;