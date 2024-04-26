const fs = require('fs');

class LogManager {
    constructor(logFilePath) {
        this.logFilePath = logFilePath;
    }

    initialize() {
        // Проверяем существование файла логов, если нет - создаем его
        if (!fs.existsSync(this.logFilePath)) {
            fs.writeFileSync(this.logFilePath, '');
        }
    }

    error(error) {
        // Логируем ошибку в файл
        fs.appendFileSync(this.logFilePath, `[ERROR] ${new Date().toISOString()}: ${error}\n`);
        // Вывод в консоль
        console.error(`[ERROR] ${new Date().toISOString()}: ${error}`);
    }

    close() {
        // Можно добавить какие-то дополнительные действия перед закрытием, если необходимо
    }
}

module.exports = LogManager;
