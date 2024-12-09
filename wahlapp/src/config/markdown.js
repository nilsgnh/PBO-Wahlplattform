import MarkdownIt from 'markdown-it';
import markdownItAttrs from 'markdown-it-attrs';

const markdown = new MarkdownIt();
markdown.use(markdownItAttrs);

// Globale Regeln für Überschriften
const defaultRender = markdown.renderer.rules.heading_open || function (tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options);
};

markdown.renderer.rules.heading_open = (tokens, idx, options, env, self) => {
  const token = tokens[idx];
  const tag = token.tag; // z.B. "h1", "h2", "h3"
  let classes = "";

  if (tag === 'h2') {
    classes = 'font-bold text-xl py-3';
  } else if (tag === 'h3') {
    classes = 'font-bold text-xl py-3';
  } else if (tag === 'h4') {
    classes = 'font-bold text-xl py-3';
  }

  token.attrPush(['class', classes]);
  return defaultRender(tokens, idx, options, env, self);
};

export default markdown;
