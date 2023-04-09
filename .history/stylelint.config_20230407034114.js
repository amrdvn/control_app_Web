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
    "block-no-empty": 2,
        "color-no-invalid-hex": 2,
        "declaration-colon-space-after": [2, "always"],
        "declaration-colon-space-before": [2, "never"],
        "function-comma-space-after": [2, "always"],
        "function-url-quotes": [2, "double"],
        "media-feature-colon-space-after": [2, "always"],
        "media-feature-colon-space-before": [2, "never"],
        "media-feature-name-no-vendor-prefix": 2,
        "number-leading-zero": [2, "never"],
        "number-no-trailing-zeros": 2,
        "property-no-vendor-prefix": 2,
        "rule-no-duplicate-properties": 2,
        "rule-no-single-line": 2,
        "rule-trailing-semicolon": [2, "always"],
        "selector-list-comma-newline-after": [2, "always-multi-line"],
        "selector-no-id": 2,
        "string-quotes": [2, "double"],
        "value-no-vendor-prefix": 2
  },
}
