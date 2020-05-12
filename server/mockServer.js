const fs = require('fs');
const path = require('path');

module.exports = function mockServer(req, res, next) {
    let filePath = req.path;
    filePath = filePath.charAt(0) === '/' ? `../mock${filePath}` : `../mock/${filePath}`;

    const file = path.join(__dirname, `${filePath}.json`);
    const fileExist = fs.existsSync(file);
    if (fileExist && process.env.MOCK === 'true') {
        try {
            // 模拟延迟加载
            setTimeout(() => {
                res.type('json');
                res.send(fs.readFileSync(file, 'utf-8'));
            }, 300);
            return;
        } catch (e) {
            console.log(e);
        }
    }

    next();
};
