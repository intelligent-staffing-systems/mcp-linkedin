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

🚧 **Work in Progress** - Currently refining user stories and feature requirements.

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

(Documentation to be added as development progresses)

## License

(To be determined)
