const Logger = function () { };

Logger.prototype.info = function (logText: any) {
  console.log(`info:::::${logText}`);
};

Logger.prototype.debug = function (logText: any) {
  console.log(`debug:::::${logText}`);
};

Logger.prototype.error = function (logText: any) {
  console.error(`error:::::${logText}`);
};

export default new Logger();
