/**
 * Lint staged: only check your code when necessary (works together with Husky)
 *
 * As property names, you have the file matchers.
 * As property values, you have the command(s) that will be run against the changed files.
 * Each matcher will be run in parallel, but the array values will be run in sequence.
 * We have separated TypeScript checks and ESLint checks into 2 matchers so that they can be run in parallel.
 * We have to separate prettier format of TS files and other files,
 * because we don't want ESLint to fix errors in TS files and at the same time having Prettier format the files:
 * that would results in conflicts.
 *
 * For the TypeScript (tsc) command, we don't pass filenames as TypeScript cannot be run on isolated files.
 * */

module.exports = {
  // Type check TypeScript files
  '**/*.(ts|tsx)': () => 'yarn tsc --noEmit',

  // Lint then format TypeScript and JavaScript files
  '**/*.(ts|tsx|js)': (filenames) => [
    `yarn eslint --fix ${filenames.join(' ')}`,
    `yarn prettier --write ${filenames.join(' ')}`,
  ],

  // Format MarkDown and JSON
  '**/*.(md|json)': (filenames) =>
    `yarn prettier --write ${filenames.join(' ')}`,
}
