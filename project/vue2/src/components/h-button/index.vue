<template>
  <button
    class="h-button"
    :class="[
      `h-button--${type}`,
      `h-button--${size}`,
      {
        'is-disabled': disabled,
        'is-round': round
      }
    ]"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'HButton',
  props: {
    type: {
      type: String,
      default: 'default',
      validator: value => ['default', 'primary', 'success', 'warning', 'danger'].includes(value)
    },
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large'].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick(e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style scoped>
.h-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid transparent;
  outline: none;
  transition: all 0.3s;
  user-select: none;
  font-weight: 500;
  border-radius: 4px;
}

.h-button:hover {
  opacity: 0.8;
}

.h-button:active {
  opacity: 0.9;
}

.h-button.is-disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.h-button.is-round {
  border-radius: 20px;
}

.h-button--small {
  padding: 8px 16px;
  font-size: 12px;
}

.h-button--medium {
  padding: 10px 20px;
  font-size: 14px;
}

.h-button--large {
  padding: 12px 24px;
  font-size: 16px;
}

.h-button--default {
  background: #fff;
  border-color: #dcdfe6;
  color: #606266;
}

.h-button--primary {
  background: #409eff;
  border-color: #409eff;
  color: #fff;
}

.h-button--success {
  background: #67c23a;
  border-color: #67c23a;
  color: #fff;
}

.h-button--warning {
  background: #e6a23c;
  border-color: #e6a23c;
  color: #fff;
}

.h-button--danger {
  background: #f56c6c;
  border-color: #f56c6c;
  color: #fff;
}
</style>