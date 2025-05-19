import js from '@eslint/js';                   // konfigurasi ESLint default untuk JavaScript
import globals from 'globals';                 // daftar global variables yang sudah umum (misal browser)
import reactHooks from 'eslint-plugin-react-hooks';  // plugin khusus untuk aturan React Hooks
import reactRefresh from 'eslint-plugin-react-refresh';  // plugin React Refresh untuk pengembangan dengan fast refresh
import tseslint from 'typescript-eslint';      // tools ESLint untuk TypeScript

export default tseslint.config(
  { ignores: ['dist'] },  // abaikan folder 'dist' dari proses linting
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],  
    // menggunakan aturan dasar ESLint untuk JS & aturan rekomendasi dari typescript-eslint

    files: ['**/*.{ts,tsx}'],  // target file yang akan di-lint adalah file ts & tsx

    languageOptions: {
      ecmaVersion: 2020,        // menggunakan syntax JS modern sampai ES2020
      globals: globals.browser, // menambahkan variabel global environment browser (window, document, dll)
    },

    plugins: {
      'react-hooks': reactHooks,      // aktifkan plugin react-hooks
      'react-refresh': reactRefresh,  // aktifkan plugin react-refresh
    },

    rules: {
      ...reactHooks.configs.recommended.rules,  // terapkan aturan rekomendasi react-hooks (seperti exhaustive deps)
      'react-refresh/only-export-components': [
        'warn',                     // beri peringatan jika tidak hanya ekspor komponen di file React
        { allowConstantExport: true }, // boleh ekspor konstanta selain komponen juga
      ],
    },
  }
);
