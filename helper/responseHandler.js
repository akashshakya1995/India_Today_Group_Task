// Response handler for get response in any file...

global.sendRes = function (res, msg, status, statusCode, data) {
  const meta = { msg, status };
  if (!data) {
    return res.status(statusCode).json({ meta });
  }
  return res.status(statusCode).json({ meta, data });
};
