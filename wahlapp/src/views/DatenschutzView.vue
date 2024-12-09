<template>
  <main>
    <!-- Überschrift -->
    <h1 class="text-3xl font-bold p-2 text-center">{{ $t('datenschutz') }}</h1>

    <!-- Gerenderter Markdown-Inhalt -->
    <div class="text-left" v-html="renderedMarkdown"></div>
  </main>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
import MarkdownIt from 'markdown-it';
import markdownItAttrs from 'markdown-it-attrs'; // Plugin importieren

// Instanz von Markdown-It erstellen
const markdown = new MarkdownIt();
markdown.use(markdownItAttrs); // Plugin aktivieren

// Zugriff auf i18n
const { t, locale } = useI18n();

// Markdown-Inhalt als reaktive computed-Eigenschaft rendern
const renderedMarkdown = computed(() => markdown.render(t('datenschutzContent')));

// Sprache wechseln (optional: für Testzwecke)
const switchLanguage = (lang) => {
  locale.value = lang;
};
</script>

<style scoped>
/* Styling für den Main-Bereich */
main {
  margin: 0 auto;
  padding: 20px;
  max-width: 655px;
}

main h2 {
  font-size: 1.5rem;
  margin-top: 1rem;
}
</style>
