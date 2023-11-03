const DbServers = {
  DEV: "AWS1-WDB-D01",
  TEST: "AWS1-WDB-TAG01",
  QA: "AWS1-WDB-U01",
  PSUP: "AWS1-WDB-PS01",
  PROD: "AWS1-WDB-AG10"
};

const ENV = {
  DEV: "DEV",
  TEST: "TEST",
  QA: "QA",
  PSUP: "PSUP",
  PROD: "PROD"
}

const LogLevel = {
  FATAL: 'fatal',
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug',
};


export { LogLevel, DbServers, ENV };