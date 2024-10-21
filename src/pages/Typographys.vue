<template>

<NixCodeBlock :code="exampleCode" language="html" />
</template>

<script setup lang="ts">
import NixCodeBlock from '@/components/typography/NixCodeBlock.vue';

const exampleCode = 
`<template>
  <div>
    <h1>Hello World!</h1>
  </div>
</template>
`.trim(); // Trim to remove unnecessary spaces

</script>