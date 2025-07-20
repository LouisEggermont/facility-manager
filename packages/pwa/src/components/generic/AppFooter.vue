<template>
  <footer>
    <p>
      Created by <a href="https://mct.be/">MCT</a> -
      {{ new Date().getFullYear() }}
    </p>
    <p>v{{ version }}</p>
  </footer>
</template>

<script setup lang="ts">
import { version } from '../../../package.json'
</script>
