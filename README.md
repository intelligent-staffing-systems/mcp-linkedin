# mcp-linkedin

MCP server for managing LinkedIn posts - create, update, and manage posts to share expertise and GitHub projects.

## Overview

This MCP (Model Context Protocol) server enables programmatic management of LinkedIn posts. The primary use case is to help share technical expertise, showcase GitHub projects, and engage with a professional audience through LinkedIn's platform.

## User Story

As a technical professional, I want to:
- Create LinkedIn posts that link to my GitHub projects
- Update existing posts to reflect project changes
- Manage my LinkedIn content programmatically
- Share my expertise and educational content with my professional network

This tool is designed to help educate and demonstrate expertise to a LinkedIn audience through consistent, high-quality content sharing.

## Status

✅ **API Integration Verified** - Successfully tested LinkedIn Posts API with OAuth 2.0
🚧 **In Progress** - Building MCP server implementation

**Recent Milestones:**
- Created LinkedIn Developer App with OpenID Connect + Share on LinkedIn products
- Implemented OAuth 2.0 3-legged flow
- Successfully posted to LinkedIn via curl and Node.js
- Documented comprehensive API reference

## Planned Features

(To be refined in Issue #1)

- Post creation with text and links
- Media attachment (images, videos, documents)
- Post updates and edits
- Post deletion and management
- OAuth 2.0 authentication flow
- Integration with LinkedIn's Posts API

## LinkedIn API

This MCP will utilize LinkedIn's REST API:
- Base URL: `https://api.linkedin.com/rest/posts`
- Authentication: OAuth 2.0
- Required permissions: `w_member_social` scope
- API Documentation: [LinkedIn Posts API](https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/posts-api)

## Development Philosophy

1. Start with clear user stories based on LinkedIn API capabilities
2. Refine requirements through discussion and iteration
3. Build incrementally with well-defined issues and branches
4. Test thoroughly with real-world use cases

## Getting Started

### Prerequisites

1. Create a LinkedIn Developer App at https://www.linkedin.com/developers/apps
2. Add these products to your app:
   - "Sign In with LinkedIn using OpenID Connect"
   - "Share on LinkedIn"
3. Configure OAuth redirect URI (e.g., `https://localhost:3000/callback`)

### Setup

1. Clone the repository:
```bash
git clone https://github.com/intelligent-staffing-systems/mcp-linkedin.git
cd mcp-linkedin
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example` and fill in your values):
```bash
cp .env.example .env
```

4. Test the integration:
```bash
npm test
```

### Environment Variables

See `.env.example` for required configuration:
- `LINKEDIN_CLIENT_ID` - Your app's client ID
- `LINKEDIN_CLIENT_SECRET` - Your app's client secret
- `LINKEDIN_REDIRECT_URI` - OAuth callback URL
- `LINKEDIN_PERSON_ID` - Your LinkedIn person URN (from userinfo endpoint)
- `LINKEDIN_ACCESS_TOKEN` - OAuth access token (60-day expiry)

## Documentation

- [LinkedIn API Reference](./LINKEDIN_API_REFERENCE.md) - Comprehensive API documentation
- [Issue #1](https://github.com/intelligent-staffing-systems/mcp-linkedin/issues/1) - User story refinement

## Contributing

Lucas Draney (@ldraney)

## License

MIT
