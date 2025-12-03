# create-trading-strategy

This package will help you to create a `Trading Strategy` for [Argo Trading](https://github.com/rxtech-lab/argo-trading)

## Installation

```bash
pnpm create trading-strategy
```

## Usage

### Dry Run

```bash
DRY_RUN=true pnpm create trading-strategy
```

## Development

### Add new template

1. Create a new file in `src/templates` folder and name it as `somename.some_ext.tmpl`.
2. Add an entry in `templates.yaml.tmpl` file.

The template will be rendered using [nunjucks](https://mozilla.github.io/nunjucks/getting-started.html) which similar to
`jinja2` in python.

### Hooks

Hooks are designed to be used in the `templates` to add some dynamic logic.

1. `afterEmit` hook will be called after the file is emitted.
