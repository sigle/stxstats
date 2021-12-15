# Implemented changes

- Stacks UI: implemented stacks - a responsive box to display stats information
- SideBarMenu Component: Completed, added footer items in a separate page
- SideBarMenu Mobile: created sidebar for mobile
- Dialog - Implemented dialog for sidebar mobile functionality
# Outstanding

- API: Link with overview chart and information
- Fix overall alignments

# stxstats client

A next.js static website showing stats from the Stacks blockchain.

## Getting Started

First create a `.env.local` file with the following environment variables:

```
API_URL="<your-api-url>"
```

Then, run the development server:

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Codebase

Here is a list of the technologies we use:

- [Next.js](https://nextjs.org/): React framework
- [Stitches](https://stitches.dev/): CSS-in-JS lib
- [Radix](https://www.radix-ui.com/): UI components
- [Radix icons](https://icons.modulz.app/): Icons components
- [Visx](https://airbnb.io/visx/): Charting library
