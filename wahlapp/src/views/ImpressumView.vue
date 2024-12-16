<script setup>
import { useI18n } from 'vue-i18n';
import { computed, getCurrentInstance } from 'vue';

// Zugriff auf die globale Instanz
const { proxy } = getCurrentInstance();
const { t } = useI18n();

// Markdown-Inhalt als reaktive computed-Eigenschaft rendern
const renderedMarkdown = computed(() => proxy.$markdown.render(t('impressumContent')));
</script>

<template>
  <main>
    <h1 class="text-3xl font-bold p-2 text-center">{{ $t('impressum') }}</h1>
    <div class="text-left" v-html="renderedMarkdown"></div>
  </main>
</template>


<style scoped>
/* Styling für den Main-Bereich */
main {
  margin: 0 auto;
  padding: 20px;
  max-width: 655px;
}
</style>
