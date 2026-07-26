# Getting Started with ChaosNexus Codex

ChaosNexus Codex is the documentation hub for the ChaosNexus framework (the site you are currently reading!). It is built using VitePress to provide a fast, static-generated documentation site with full text search and LLM-friendly endpoints.

## Prerequisites

Before building ChaosNexus Codex locally, ensure you have:
- **Node.js and pnpm**: The JavaScript runtime and package manager. (Tuned Chaos strictly prefers `pnpm`).
- **Python**: Required for certain documentation generation scripts (like generating attributions).

## Local Development

If you wish to contribute to the documentation or preview changes locally:

1. **Clone the Repository:**
   ```bash
   git clone <your-repo-url>
   cd chaosnexus-codex
   ```

2. **Install Dependencies:**
   ```bash
   pnpm install
   ```

3. **Run the Development Server:**
   ```bash
   pnpm website:dev
   ```
   This will start a local server (typically at `http://localhost:5173`) where you can preview your markdown changes with hot-module replacement (HMR).

## Building for Production

To compile the static site for deployment:

1. **Run the Build Command:**
   ```bash
   pnpm website:build
   ```
   This will generate the API documentation scripts, fetch attributions, and compile the VitePress site into the `.vitepress/dist` directory.

2. **Preview the Build:**
   To test the compiled production build locally before deployment:
   ```bash
   pnpm website:preview
   ```

## Documentation Structure
- `guide/`: Contains the core getting started guides and architectural overviews.
- `api/`: Contains generated API references.
- `.vitepress/`: Contains the site configuration (`config.ts`) and custom VitePress plugins.

## Next Steps
- Learn about attributions and licenses in the [Attributions Guide](/guide/attributions/).
