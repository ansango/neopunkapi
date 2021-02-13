const success = (res, msg) => {
  res.status(200).json(msg);
};

const error = (res) => {
  res.status(500).json({ msg: "Internal Server Error" });
};

const notfound = (res, msg) => {
  res.status(404).json(msg);
};

const forbidden = (res) => {
  res.status(403).json({ msg: "Permission denied" });
};

module.exports = {
  success,
  error,
  notfound,
  forbidden,
};
