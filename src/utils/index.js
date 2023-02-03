const executeAllJobs = (jobs, now) =>
  jobs?.forEach((job, key) => job.forEach((cb) => cb(now, key)));

exports.executeAllJobs = executeAllJobs;