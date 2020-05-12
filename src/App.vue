<template>
    <div id="app">
        <div id="nav">
            <router-link to="/axios-test">axios 测试</router-link>
            <router-link to="/vue-router-test">vue-router 测试</router-link>
            <router-link to="/vuex-test">vuex 测试</router-link>
            <router-link to="/eventhub-test">eventhub 测试</router-link>
            <router-link to="/emit-test">emit 测试</router-link>
            <router-link to="/computed-test">computed 测试</router-link>
            <router-link to="/filter-test">filter 测试</router-link>
            <router-link to="/watch-test">watch 测试</router-link>
            <router-link to="/lifecycle-test">生命周期测试</router-link>
            <router-link to="/window-test">window 全局方法测试</router-link>
            <router-link to="/my-button-test">自定义组件测试</router-link>
        </div>
        <div class="container">
            <div class="example">
                <router-view />
            </div>
            <div class="tabs">
                <el-tabs type="border-card" v-model="activeName">
                    <el-tab-pane
                        v-for="item in tabs"
                        :name="item.label"
                        :label="item.label"
                        :key="item.label"
                    >
                        <div class="code" v-html="item.html"></div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
import marked from 'marked';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';

function wrap(code, lang) {
    return `<pre v-pre class="language-${lang}"><code>${code}</code></pre>`;
}

marked.setOptions({
    highlight(str, lang) {
        lang = lang.toLowerCase();
        if (lang === 'vue' || /\.vue$/.test(lang)) {
            lang = 'markup';
        } else {
            lang = 'javascript';
        }
        const code = Prism.highlight(str, Prism.languages[lang], lang);
        return wrap(code, lang);
    },
});

export default {
    data() {
        return {
            activeName: 'vue',
            tabs: [],
        };
    },
    watch: {
        $route: {
            handler(val) {
                const { name } = val;
                const path = `${name}.md`;
                import('@/md/' + path).then((res) => {
                    this.tabs = [];
                    this.activeName = 'vue';

                    const md = res.default;
                    const arr = md.split('####');

                    arr.forEach((code) => {
                        code = code.trim();
                        const match = code.match(/^```([\w|.|/|@]+)\n/);
                        if (match) {
                            const label = match[1];
                            const html = marked(code);
                            this.tabs.push({
                                label,
                                html,
                            });
                        }
                    });
                });
            },
            immediate: true,
        },
    },
};
</script>

<style lang="less">
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

.container {
    display: flex;
    .example {
        width: 40%;
    }
    .tabs {
        width: 60%;
        font-size: 14px;
        pre {
            margin: 0;
        }
        pre[class*='language-'] {
            padding: 1.7em;
            border-radius: 5px;
        }
    }
}

#nav {
    padding: 30px;
    text-align: left;

    a {
        margin: 5px 15px;
        display: inline-block;
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
