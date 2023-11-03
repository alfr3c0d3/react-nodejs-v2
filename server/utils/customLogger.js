import logger from 'logger';
import { existsSync, mkdirSync } from "fs";
import { LogLevel } from './constants.js';

const createLogger = (logName = 'log', logInConsole = true) => {
  if (!existsSync('./logs'))
    mkdirSync('./logs');

  const myLogger = logger.createLogger(`./logs/${logName}-${new Date().toLocaleString('en-CA', { dateStyle: 'short' })}.json`);

  myLogger.format = (level, date, message) => {
    message = message.parse();

    const obj = level === LogLevel.ERROR || level === LogLevel.FATAL ? { exception: message } : { message };

    if (logInConsole)
      level === LogLevel.ERROR || level === LogLevel.FATAL ? console.error(date.toLocaleString(), obj) : console.log(date.toLocaleString(), obj);

    return { level: level.toUpperCase(), timestamp: date.toLocaleString(), ...obj }.stringify();
  };

  return myLogger;
};

const Logger = createLogger();

export { Logger };