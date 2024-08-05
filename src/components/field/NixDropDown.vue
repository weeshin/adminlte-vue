<template>
    <component :is="renderDropdown" />
</template>
  
<script setup lang="ts">
import { ref, computed, h, defineProps, defineEmits, watch } from 'vue';

const props = defineProps<{
  modelValue: string;
  options: { value: string; label: string }[];
  label?: string;
  validateField: (value: string) => string | null;
}>();

const emit = defineEmits(['update:modelValue']);

const selectedText = ref('');
const filterText = ref('');
const showMenu = ref(false);
const validationError = ref<string | null>(null);

const filteredOptions = computed(() => {
  if (!filterText.value) return props.options;
  return props.options.filter(option =>
    option.label.toLowerCase().includes(filterText.value.toLowerCase())
  );
});

const validate = () => {
  validationError.value = props.validateField(props.modelValue);
};

watch(() => props.modelValue, validate);

const onInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  filterText.value = value;
  selectedText.value = "";
};

const onSelect = (value: string) => {
  emit('update:modelValue', value);
  selectedText.value = value;
  filterText.value = "";
  showMenu.value = false;
};
  
const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};

const onFocus = () => {
  showMenu.value = true;
};

const onBlur = () => {
  setTimeout(() => {
    showMenu.value = false;
  }, 200);
};

const renderDropdown = () => {
  const label = props.label ? h('label', { class: 'form-label' }, props.label) : null;  

  const inputWrapper = h('div', { class: 'input-wrapper', style: 'position: relative;' }, [
    h('input', {
      type: 'text',
      class: 'form-control',
      value: filterText.value || props.options.find(option => option.value === selectedText.value)?.label,
      onInput,
      onFocus,
      onBlur,
      placeholder: 'Select an option',
      style: 'border-radius: 0.25rem; padding-right: 2rem;' // add padding-right for icon space
    }),
    h('i', {
      class: `fas ${showMenu.value ? 'fa-caret-up' : 'fa-caret-down'}`,
      onClick: toggleMenu,
      style: 'cursor: pointer; position: absolute; right: 10px; top: 50%; transform: translateY(-50%);'
    })
  ]);

  const options = filteredOptions.value.map(option =>
    h('li', { class: 'dropdown-item', onClick: () => onSelect(option.value) }, option.label)
  );

  const dropdownMenu = h('ul', {
    class: ['dropdown-menu', `${showMenu.value ? 'show' : ''}`],
    style: 'width: 100%;'
  }, options);

  const validationErrorNode = validationError.value
    ? h('div', { class: 'invalid-feedback' }, validationError.value)
    : null;

  const icon = h('i', {
    class: `fas ${showMenu.value ? 'fa-caret-up' : 'fa-caret-down'}`,
    onClick: toggleMenu,
    style: 'cursor: pointer; position: absolute; right: 10px; top: 50%; transform: translateY(-50%);'
  });

  return h('div', { class: 'form-group position-relative' }, [
      label,
      inputWrapper,
      dropdownMenu,
      validationErrorNode
  ]);


};
</script>
  
<style scoped>
.form-group {
  position: relative;
  display: inline-block;
  width: 100%;
}

.input-group {
  display: flex;
  align-items: center;
}

.selected-text {
  margin-right: 10px;
  white-space: nowrap;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  display: none;
  float: left;
  min-width: 100%;
  padding: 0.5rem 0;
  margin: 0.125rem 0 0;
  font-size: 1rem;
  color: #212529;
  text-align: left;
  list-style: none;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
}

.show {
  display: block;
}

.dropdown-item {
  display: block;
  width: 100%;
  padding: 0.25rem 1.5rem;
  clear: both;
  font-weight: 400;
  color: #212529;
  text-align: inherit;
  white-space: nowrap;
  background-color: transparent;
  border: 0;
}

.form-control {
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.invalid-feedback {
  display: block;
  width: 100%;
  margin-top: 0.25rem;
  font-size: 0.875rem;
  color: #dc3545;
}

.fas {
  font-size: 1.25rem;
}
</style>
  