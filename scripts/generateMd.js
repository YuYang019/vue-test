const fs = require('fs-extra');
const path = require('path');
const globby = require('globby');
const config = require('./generateConfig');

function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}

// a <- b
function merge(a, b) {
    Object.keys(b).forEach((key) => {
        const aVal = a[key];
        const bVal = b[key];
        if (aVal && bVal && isObject(aVal) && isObject(bVal)) {
            merge(aVal, bVal);
        } else {
            a[key] = bVal;
        }
    });
}

(async () => {
    const specs = await globby('**/*.spec.js', {
        cwd: path.resolve(__dirname, '../tests/unit/specs'),
    });

    const map = {};
    specs.forEach((spec) => {
        const name = spec.replace('.spec.js', '');
        let componentPath = path.resolve(__dirname, `../src/views/${name}.vue`);

        if (!fs.existsSync(componentPath)) {
            componentPath = path.resolve(__dirname, `../src/views/${name}/index.vue`);
        }

        if (!fs.existsSync(componentPath)) {
            componentPath = path.resolve(__dirname, `../src/components/${name}.vue`);
        }

        map[name] = {
            vue: componentPath,
            spec: path.resolve(__dirname, `../tests/unit/specs/${spec}`),
        };
    });

    merge(map, config);

    const destDir = path.resolve(__dirname, '../src/md');
    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir);
    } else {
        fs.emptyDirSync(destDir);
    }
    Object.keys(map).forEach((key) => {
        const obj = map[key];
        let content = '';

        Object.keys(obj).forEach((label) => {
            const code = fs.readFileSync(obj[label]);
            content += `
\`\`\`${label}
${code}
\`\`\`

####

`;
        });

        const dest = path.join(destDir, `${key}.md`);
        fs.writeFileSync(dest, content);
    });
})();
