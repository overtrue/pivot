# Pivot I18n Guidance for GitHub Copilot

This file contains guidance for GitHub Copilot when working with internationalization (i18n) in the Pivot project.

## I18n Implementation Rules

1. **Flat Structure**: Always use a flat structure for language files. Do not use nested objects.
   ```ts
   // CORRECT
   const en = {
     "Hello": "Hello",
     "Welcome to Pivot": "Welcome to Pivot"
   };

   // INCORRECT
   const en = {
     common: {
       hello: "Hello"
     },
     welcome: {
       title: "Welcome to Pivot"
     }
   };
   ```

2. **English Keys**: Always use the English text as the key in language files.
   ```ts
   // CORRECT
   const en = {
     "Required": "Required"
   };
   const zh = {
     "Required": "必填"
   };

   // INCORRECT
   const en = {
     "required_label": "Required"
   };
   const zh = {
     "required_label": "必填"
   };
   ```

3. **Component Usage**: Always use the `useI18n` hook and `t()` function for any user-facing text.
   ```tsx
   // CORRECT
   import { useI18n } from '@/lib/i18n//I18nProvider';

   const MyComponent = () => {
     const { t } = useI18n();
     return <div>{t('Hello')}</div>;
   };

   // INCORRECT
   const MyComponent = () => {
     return <div>Hello</div>;
   };
   ```

4. **Format Strings**: When using variables in translated strings, use %s placeholders and replace them.
   ```tsx
   // CORRECT
   const message = t('Hello, %s!').replace('%s', name);

   // INCORRECT
   const message = `${t('Hello')}, ${name}!`;
   ```

5. **Adding New Translations**: When adding new text, always add translations for both English and Chinese.
   ```ts
   // In en.ts
   "New Feature": "New Feature",

   // In zh.ts
   "New Feature": "新功能",
   ```
