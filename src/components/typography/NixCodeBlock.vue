<template>
    <pre :class="['language-' + language]">
        <code v-html="highlightedCode"></code>
        <pre><code class="language-css">p { color: red }</code></pre>
    </pre>
</template>
  
<script setup lang="ts">
import { ref, onMounted, watch, defineProps } from 'vue';
import Prism from 'prismjs'; // Or use highlight.js if you prefer
// import 'prismjs/themes/prism.css';

const props = defineProps({
  code: {
    type: String,
    required: true
  },
  language: {
    type: String,
    default: 'javascript'
  }
});

const highlightedCode = ref('');

onMounted(() => {
  highlightCode();
});

watch(() => props.code, () => {
  highlightCode();
});

const highlightCode = () => {
  highlightedCode.value = Prism.highlight(props.code, Prism.languages[props.language], props.language);
//   console.log(highlightedCode.value);
};
</script>
  
<style scoped>
  
  pre {
    background-color: #f5f5f5;
    padding: 10px;
    border-radius: 5px;
    overflow-x: auto;
  }
  

</style>
  