<script setup lang="ts">
interface Props {
  type?: 'primary' | 'default' | 'danger';
  gradient?: boolean;
  pulse?: boolean;
}

withDefaults(defineProps<Props>(), {
  type: 'default',
  gradient: false,
  pulse: false
});
</script>

<template>
  <button
    class="h-button"
    :class="[
      `h-button--${type}`,
      {
        'h-button--gradient': gradient,
        'h-button--pulse': pulse
      }
    ]"
  >
    <slot>默认按钮</slot>
  </button>
</template>

<style scoped>
  .h-button {
    position: relative;
    padding: 8px 16px;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
    background: #fff;
  }

  .h-button:active {
    transform: scale(0.95);
  }

  .h-button--primary {
    background: #409eff;
    border-color: #409eff;
    color: white;
  }

  .h-button--primary:hover {
    background: #66b1ff;
    border-color: #66b1ff;
  }

  .h-button--danger {
    background: #f56c6c;
    border-color: #f56c6c;
    color: white;
  }

  .h-button--danger:hover {
    background: #f78989;
    border-color: #f78989;
  }

  .h-button--default:hover {
    border-color: #409eff;
    color: #409eff;
  }

  .h-button--gradient.h-button--primary {
    background: linear-gradient(45deg, #1989f8, #66b1ff);
    border: none;
  }

  .h-button--gradient.h-button--primary:hover {
    background: linear-gradient(45deg, #66b1ff, #1989f8);
    opacity: 0.9;
  }

  .h-button--gradient.h-button--danger {
    background: linear-gradient(45deg, #f42c2c, #f78989);
    border: none;
  }

  .h-button--gradient.h-button--danger:hover {
    background: linear-gradient(45deg, #f78989, #f42c2c);
    opacity: 0.9;
  }

  .h-button--pulse::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: inherit;
    animation: pulse 1.5s cubic-bezier(0.24, 0, 0.38, 1) infinite;
    opacity: 0;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(64, 158, 255, 0.4);
    }

    70% {
      transform: scale(1);
      box-shadow: 0 0 0 10px rgba(64, 158, 255, 0);
    }

    100% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(64, 158, 255, 0);
    }
  }
</style>
