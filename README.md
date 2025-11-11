# Mastering Phoenixd

Mastering Phoenixd is a comprehensive guide and toolkit for working with the `phoenixd` daemon, designed to help developers and system administrators efficiently manage and interact with Phoenix-based Lightning Network systems.

## Features

- 📖 Step-by-step tutorials for installing and configuring `phoenixd`
- ⚡ Lightning Network payment server documentation
- 🔧 Example scripts and configuration files
- 🛠️ Troubleshooting tips and best practices
- 📚 Complete API documentation and usage examples
- 🚀 Built with Docusaurus for easy navigation and search

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/btcgdl/Mastering-phoenixd.git
   cd Mastering-phoenixd
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## Development Commands

### Local Development
Start the development server with hot reload:
```bash
npm start
```
This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build for Production
Generate static content for deployment:
```bash
npm run build
```
This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Serve Built Site Locally
Preview the production build locally:
```bash
npm run serve
```
This command serves the built website locally for testing the production build.

### Clear Cache
Clear Docusaurus cache and generated files:
```bash
npm run clear
```

## Project Structure

```
Mastering-phoenixd/
├── docs/                    # Documentation files
│   ├── 1-Install.md        # Installation guide
│   ├── 2-Config.md          # Configuration guide
│   ├── 3-Uninstall.md      # Uninstallation guide
│   └── 4-API.md            # API documentation
├── src/
│   ├── css/
│   │   └── custom.css      # Custom styling
│   └── pages/
│       ├── index.js        # Homepage component
│       └── index.module.css # Homepage styles
├── static/
│   └── img/                # Static images
├── docusaurus.config.js    # Docusaurus configuration
├── sidebars.js            # Sidebar configuration
└── package.json           # Project dependencies
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on how to get started.

## Links

- 🌐 **Live Site**: [https://btcgdl.github.io/Mastering-phoenixd/](https://btcgdl.github.io/Mastering-phoenixd/)
- 🔗 **Phoenixd Repository**: [https://github.com/ACINQ/phoenixd](https://github.com/ACINQ/phoenixd)
- 🏢 **Bitcoin GDL**: [https://btcgdl.com/](https://btcgdl.com/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you have questions or need help:

- 📖 Check the documentation at [btcgdl.github.io/Mastering-phoenixd](https://btcgdl.github.io/Mastering-phoenixd/)
- 🐛 Open an issue on GitHub
- 💬 Join our community discussions

---

Built with ❤️ by [Bitcoin GDL](https://btcgdl.com/) using [Docusaurus](https://docusaurus.io/)
