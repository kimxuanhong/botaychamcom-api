const log4js = require('log4js');

log4js.configure({
    appenders: { botaychamcom: { type: 'dateFile', filename: 'logs/botaychamcom.log', maxLogSize: 20971520, backups: 20 }, console: { type: 'console' } },
    categories: { default: { appenders: ['botaychamcom', 'console'], level: 'info' } }
});

const logger = log4js.getLogger("botaychamcom");

module.exports = logger;