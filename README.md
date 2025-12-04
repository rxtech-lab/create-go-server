# create-go-server

[![CI](https://github.com/rxtech-lab/create-go-server/actions/workflows/ci.yml/badge.svg)](https://github.com/rxtech-lab/create-go-server/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/rxtech-lab/create-go-server/branch/main/graph/badge.svg)](https://codecov.io/gh/rxtech-lab/create-go-server)

A CLI tool to quickly scaffold a production-ready Go web server with best practices built-in.

## Features

- 🚀 **Fast Setup** - Get started with a single command
- 🏗️ **Modern Stack** - Fiber, GORM, Wire DI, OpenAPI
- 🔧 **Hot Reload** - Development-friendly with auto-reload
- 🐳 **Docker Ready** - Includes docker-compose.yaml for local development
- ☸️ **Kubernetes Support** - Optional K8s manifests
- 🔄 **CI/CD Ready** - GitHub Actions workflows included
- 📝 **OpenAPI First** - API-first development with code generation
- 🧪 **Testing Setup** - Testing utilities and examples included
- 🔐 **Type-safe** - Strict server mode for compile-time safety
- 📦 **Dependency Injection** - Wire for clean dependency management

## Installation

```bash
npm create go-server
# or
pnpm create go-server
# or
yarn create go-server
```

## Usage

### Interactive Mode

```bash
npm create go-server
```

The CLI will prompt you for:
- GitHub repository URL
- Project name
- Docker repository
- Backend framework (Fiber)
- ORM framework (GORM)
- Database (PostgreSQL)
- Whether to use strict server mode
- Whether to include Kubernetes files
- Whether to include CI files

### Non-interactive Mode

Use the `-y` flag to skip all prompts and use default values:

```bash
npm create go-server -- -y
```

## Generated Project Structure

```
your-project/
├── api/                    # OpenAPI specifications
├── cmd/                    # Application entry points
│   └── server/            # Main server application
├── internal/              # Private application code
│   ├── api/              # Generated API code
│   ├── config/           # Configuration management
│   ├── database/         # Database connections and migrations
│   ├── dto/              # Data transfer objects
│   ├── models/           # Database models
│   ├── server/           # HTTP server implementation
│   ├── service/          # Business logic
│   ├── testutil/         # Testing utilities
│   └── utils/            # Utility functions
├── k8s/                   # Kubernetes manifests (optional)
├── tools/                 # Build tools and generators
├── .env.example          # Environment variables template
├── .gitignore
├── docker-compose.yaml   # Local development setup
├── go.mod
├── Makefile              # Build commands
└── README.md             # Project documentation
```

## Development

### Prerequisites

- Node.js 18.x or 20.x
- pnpm 8.x

### Setup

```bash
# Clone the repository
git clone https://github.com/rxtech-lab/create-go-server.git
cd create-go-server

# Install dependencies
pnpm install

# Build the project
pnpm build

# Run tests
pnpm test

# Run tests with coverage
pnpm coverage
```

### Local Development

```bash
# Build and link locally
pnpm build:local

# Now you can use it anywhere
create-go-server -y
```

### Adding New Templates

1. Create a new file in `src/templates/` folder and name it as `somename.some_ext.tmpl`
2. Add an entry in `src/templates/templates.yaml.tmpl` file
3. Rebuild the project with `pnpm build`

Templates are rendered using [Nunjucks](https://mozilla.github.io/nunjucks/getting-started.html), which is similar to Jinja2 in Python.

### Template Variables

Available variables in templates:
- `githubRepository` - GitHub repository URL
- `projectName` - Project name
- `dockerRepository` - Docker repository name
- `backendFramework` - Backend framework (currently only "fiber")
- `ormFramework` - ORM framework (currently only "gorm")
- `databaseFramework` - Database framework (currently only "postgres")
- `useStrictServer` - Boolean for strict server mode
- `useKubernetes` - Boolean for Kubernetes files
- `useCI` - Boolean for CI files

### Hooks

Hooks allow you to run commands after file generation:

```yaml
- path: go.mod.tmpl
  output: go.mod
  hooks:
    afterAllEmit:
      type: shell
      command: make generate
```

Available hooks:
- `afterEmit` - Called after each file is emitted
- `afterAllEmit` - Called after all files are emitted

## CI/CD

The project includes GitHub Actions workflows:

- **CI** (`ci.yml`) - Runs tests, builds, and validates generated projects
- **Coverage** (`coverage.yml`) - Generates and uploads code coverage reports
- **Publish** (`publish.yml`) - Publishes to npm on release

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT

## Support

If you encounter any issues or have questions, please [open an issue](https://github.com/rxtech-lab/create-go-server/issues).
