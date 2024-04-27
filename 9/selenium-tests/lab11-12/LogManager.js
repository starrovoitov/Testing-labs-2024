const fs = require('fs');

class LogManager {
    constructor(logFilePath) {
        this.logFilePath = logFilePath;
    }

    initialize() {
        if (!fs.existsSync(this.logFilePath)) {
            fs.writeFileSync(this.logFilePath, '');
        }
    }

    error(error) {
        fs.appendFileSync(this.logFilePath, `[ERROR] ${new Date().toISOString()}: ${error}\n`);
        console.error(`[ERROR] ${new Date().toISOString()}: ${error}`);
    }
}

module.exports = LogManager;
