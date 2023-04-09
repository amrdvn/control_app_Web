module.exports = {
  customSyntax: 'postcss-html',
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended-vue',
    'stylelint-config-prettier',
  ],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    "selector-max-empty-lines": 0,
    "selector-pseudo-element-no-unknown": [
      true,
      {
        "ignorePseudoElements": ["v-deep"]
      }
    ],
    "selector-anb-no-unmatchable": null
  },
}
