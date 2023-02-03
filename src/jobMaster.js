const { schedule, validate } = require('node-cron')
const EventEmitter = require('events');
const { executeAllJobs } = require("./utils");

const getKeys = function() {
  let keys = [];
  for (k of this.jobs.keys()) {
    keys.push(k);
  }

  return keys;
}

const remove = function(key) {
  this.jobs.delete(key);
  this.emit("remove", key);
  return this;
}

const start = function() {
  this.task = schedule(this.cronExpression, (now) =>
    executeAllJobs(this.jobs, now)
  );
  this.task.start();
  this.emit('start');

  return this;
}

const set = function(key, newJobs) {
  newJobs = !Array.isArray(newJobs) ? [newJobs] : newJobs;
  this.jobs.set(key, newJobs);
  this.emit("add", key);

  return this;
};

const stop = function() {
  this.task.stop();
  return this;
}

const get = function(key) {
  return this.jobs.get(key);
}

const jobMaster = (cronExpression) => {
  if(!validate(cronExpression)) throw new Error('Wrong cron expression');

  const autoRunner = {
    task: null,
    cronExpression,
    jobs: new Map(),

    start,
    stop,
    set,
    get,
    getKeys,
    remove,
  };

  return Object.assign(new EventEmitter(), autoRunner);
};

exports.jobMaster = jobMaster;
