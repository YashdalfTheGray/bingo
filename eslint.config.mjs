import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      'public/**/*.css',
      'public/**/*.js',
      'public/**/*.map',
      'public/**/*.json',
      'public/**/*.txt',
      'public/artifacts',
      'docs/output.html',
      '**/.eslint*',
      'public/**/*.css',
      'public/**/*.js',
      'public/**/*.map',
      'public/**/*.json',
      'public/**/*.txt',
      'public/artifacts',
      'docs/output.html',
      '**/.eslint*',
      '**/*~',
      '**/.fuse_hidden*',
      '**/.directory',
      '**/.Trash-*',
      '**/.nfs*',
      '**/.DS_Store',
      '**/.AppleDouble',
      '**/.LSOverride',
      '**/Icon',
      '**/._*',
      '**/.DocumentRevisions-V100',
      '**/.fseventsd',
      '**/.Spotlight-V100',
      '**/.TemporaryItems',
      '**/.Trashes',
      '**/.VolumeIcon.icns',
      '**/.com.apple.timemachine.donotpresent',
      '**/.AppleDB',
      '**/.AppleDesktop',
      '**/Network Trash Folder',
      '**/Temporary Items',
      '**/.apdisk',
      '**/logs',
      '**/*.log',
      '**/npm-debug.log*',
      '**/yarn-debug.log*',
      '**/yarn-error.log*',
      '**/lerna-debug.log*',
      '**/report.[0-9]*.[0-9]*.[0-9]*.[0-9]*.json',
      '**/pids',
      '**/*.pid',
      '**/*.seed',
      '**/*.pid.lock',
      '**/lib-cov',
      '**/coverage',
      '**/*.lcov',
      '**/.nyc_output',
      '**/.grunt',
      '**/bower_components',
      '**/.lock-wscript',
      'build/Release',
      '**/node_modules/',
      '**/jspm_packages/',
      '**/typings/',
      '**/*.tsbuildinfo',
      '**/.npm',
      '**/.eslintcache',
      '**/.node_repl_history',
      '**/*.tgz',
      '**/.yarn-integrity',
      '**/.env',
      '**/.env.test',
      '**/.cache',
      '**/.next',
      '**/.nuxt',
      '**/dist/',
      '**/.out',
      '**/.storybook-out',
      '.vuepress/dist',
      '**/.serverless/',
      '**/.fusebox/',
      '**/.dynamodb/',
      '**/tmp/',
      '**/temp/',
      '**/[._]*.s[a-v][a-z]',
      '**/[._]*.sw[a-p]',
      '**/[._]s[a-rt-v][a-z]',
      '**/[._]ss[a-gi-z]',
      '**/[._]sw[a-p]',
      '**/Session.vim',
      '**/Sessionx.vim',
      '**/.netrwhist',
      '**/tags',
      '**/[._]*.un~',
      '**/.vim',
      '.vscode/*',
      '!.vscode/settings.json',
      '!.vscode/tasks.json',
      '!.vscode/launch.json',
      '!.vscode/extensions.json',
      '**/.history',
    ],
  },
  ...compat.extends(
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'prettier',
  ),
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 5,
      sourceType: 'script',

      parserOptions: {
        project: true,
        tsconfigRootDir: '/home/yash/git-yash/bingo',
      },
    },

    rules: {
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/no-base-to-string': 'off',

      '@typescript-eslint/no-floating-promises': [
        'error',
        {
          ignoreVoid: true,
          ignoreIIFE: true,
        },
      ],

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
        },
      ],

      '@typescript-eslint/no-explicit-any': [
        'error',
        {
          ignoreRestArgs: true,
        },
      ],
    },
  },
];
