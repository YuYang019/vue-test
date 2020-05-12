<template>
    <button class="my-btn" :disabled="disabled" @click="handleClick" :class="classes">
        <!-- 默认插槽 -->
        <slot></slot>
        <!-- 具名插槽 -->
        <slot name="foo"></slot>
        <!-- 作用域插槽 -->
        <slot name="bar" :user="user"></slot>
    </button>
</template>

<script>
export default {
    name: 'MyButton',
    props: {
        size: {
            type: String,
            default: 'medium',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            user: {
                name: 'Tony',
            },
        };
    },
    computed: {
        classes() {
            return {
                disabled: this.disabled,
                [this.sizeClasses]: true,
            };
        },
        sizeClasses() {
            const size = ['small', 'medium', 'large'];
            let finalSize;
            if (size.indexOf(this.size) === -1) {
                finalSize = 'medium';
            } else {
                finalSize = this.size;
            }
            return `size--${finalSize}`;
        },
    },
    methods: {
        handleClick(e) {
            this.$emit('click', e);
        },
    },

};
</script>

<style lang="less" scoped>
    .my-btn {
        box-sizing: border-box;
        background: #fff;
        border: 1px solid #ccc;
        color: #333;
        padding: 0 20px;
        outline: none;
        transition: all .1s ease;

        &.disabled {
            cursor: not-allowed;
            background: rgba(0, 0, 0, 0.1)
        }

        &:active {
            border-color: #409EFF;
        }

        &.size--small {
            font-size: 12px;
            height: 24px;
            line-height: 24px;
        }
        &.size--medium {
            font-size: 13px;
            height: 32px;
            line-height: 32px;
        }
        &.size--large {
            height: 40px;
            font-size: 14px;
            line-height: 40px;
        }
    }
</style>
