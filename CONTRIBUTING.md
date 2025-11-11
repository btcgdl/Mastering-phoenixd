# Contributing to Mastering Phoenixd

We welcome contributions! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## Development Workflow

1. **Fork the repository**
2. **Create your feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes and test locally**
   ```bash
   npm start
   ```
4. **Build and verify**
   ```bash
   npm run build
   ```
5. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

## Development Setup

### Prerequisites

- Node.js 18+ and npm
- Git

### Local Setup

1. **Clone your fork:**
   ```bash
   git clone https://github.com/your-username/Mastering-phoenixd.git
   cd Mastering-phoenixd
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm start
   ```

## Code Guidelines

### Documentation

- Use clear, concise language
- Include code examples where helpful
- Follow the existing documentation structure
- Test all code examples before submitting

### Styling

- Follow the existing CSS patterns in `src/css/custom.css`
- Maintain consistency with the green Lightning Network theme
- Ensure responsive design works on mobile devices

### Commit Messages

- Use clear, descriptive commit messages
- Start with a verb (Add, Fix, Update, Remove, etc.)
- Keep the first line under 50 characters
- Add more details in the body if needed

Example:
```
Add API endpoint documentation for payments

- Include request/response examples
- Add error handling scenarios
- Update sidebar navigation
```

## Pull Request Process

1. **Ensure your code follows the guidelines above**
2. **Update documentation if you're changing functionality**
3. **Test your changes locally:**
   - Run `npm start` to test development build
   - Run `npm run build` to test production build
   - Run `npm run serve` to test the built site
4. **Write a clear PR description explaining your changes**
5. **Link any related issues**

## Reporting Issues

When reporting issues, please include:

- **Environment details** (OS, Node.js version, npm version)
- **Steps to reproduce** the issue
- **Expected behavior**
- **Actual behavior**
- **Screenshots** if applicable

## Documentation Structure

```
docs/
├── 1-Install.md        # Installation guide
├── 2-Config.md          # Command flags reference  
├── 3-Uninstall.md      # Uninstallation guide
└── 4-API.md            # API documentation
```

When adding new documentation:

- Follow the numbered naming convention
- Update `sidebars.js` to include new pages
- Ensure proper cross-references between documents

## Questions?

If you have questions about contributing:

- 📖 Check the [documentation](https://btcgdl.github.io/Mastering-phoenixd/)
- 🐛 Open an issue on GitHub
- 💬 Join our community discussions

Thank you for contributing to Mastering Phoenixd! 🚀
