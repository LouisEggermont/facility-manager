<template>
  <div class="hello">
    <h1>{{ $t('navigation.observations') }}</h1>
    <h1>{{ $t('close') }}</h1>
    <h1>{{ $t('logout') }}</h1>
    <h1>{{ $t('myaccount') }}</h1>
    <!-- No translation in NL, takes the default from EN -->
    <h1>{{ $t('school') }}</h1>
    <!-- No translation, uses the key itself -->
  </div>
</template>
<script lang="ts" setup></script>
