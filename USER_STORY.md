# MCP-LinkedIn User Story

**Last Updated**: 2025-11-10
**Status**: Refined based on LinkedIn API research and testing
**Related Issue**: [#1](https://github.com/intelligent-staffing-systems/mcp-linkedin/issues/1)

---

## Primary User Persona

**Lucas Draney** - Technical professional and developer who wants to share expertise and GitHub projects with a professional LinkedIn audience.

### Goals
- Educate LinkedIn network about technical topics
- Showcase GitHub projects and open-source contributions
- Build professional brand through consistent content
- Automate posting workflow to save time
- Maintain authentic voice while leveraging automation

### Pain Points
- Manual posting is time-consuming
- Hard to maintain consistent posting schedule
- Difficulty linking GitHub projects with rich previews
- No programmatic way to manage LinkedIn content
- Want to post when projects are ready, not when manually available

---

## Core User Stories

### MVP (Phase 1) - Essential Posting

#### US-1: Create Text Post
**As a** technical professional
**I want to** create a LinkedIn post with text content
**So that** I can share insights and updates with my network

**Acceptance Criteria:**
- MCP tool accepts text commentary (up to ~3000 characters)
- Supports hashtags (#coding, #javascript)
- Supports mentions (@connections)
- Post visibility configurable (PUBLIC, CONNECTIONS, LOGGED_IN)
- Returns post URN and success confirmation
- Post appears on my LinkedIn profile immediately

**API Endpoint**: `POST /rest/posts`
**Status**: ✅ Verified working (curl + JavaScript)

---

#### US-2: Create Post with GitHub Link
**As a** developer
**I want to** create a LinkedIn post with a link to my GitHub project
**So that** my network can easily discover and explore my work

**Acceptance Criteria:**
- MCP tool accepts commentary + GitHub URL
- Optionally accepts custom title and description (overrides auto-preview)
- LinkedIn renders link preview with project details
- Returns post URN
- Post shows rich preview card with repository info

**API Endpoint**: `POST /rest/posts` with `content.article` object
**Status**: 🔬 Needs testing

---

#### US-3: Retrieve My Posts
**As a** content creator
**I want to** retrieve my recent LinkedIn posts
**So that** I can review what I've shared and track engagement

**Acceptance Criteria:**
- MCP tool returns list of my posts
- Supports pagination (limit, offset)
- Returns post URN, commentary, timestamp, visibility
- Optionally includes engagement metrics (if available)

**API Endpoint**: `GET /rest/posts?author=urn:li:person:{id}&q=author`
**Status**: 🔬 Needs testing

---

#### US-4: Delete Post
**As a** content manager
**I want to** delete a LinkedIn post by its URN
**So that** I can remove outdated or incorrect content

**Acceptance Criteria:**
- MCP tool accepts post URN
- Confirms deletion before proceeding
- Returns success status
- Post removed from LinkedIn profile
- Idempotent (deleting already-deleted post doesn't error)

**API Endpoint**: `DELETE /rest/posts/{urn}`
**Status**: 🔬 Needs testing

---

### Phase 2 - Content Management

#### US-5: Update Existing Post
**As a** content curator
**I want to** edit an existing LinkedIn post
**So that** I can correct mistakes or update information

**Acceptance Criteria:**
- MCP tool accepts post URN and new commentary
- Supports updating call-to-action labels
- Supports updating landing page URL
- Returns success confirmation
- Edited post shows updated content on LinkedIn

**API Endpoint**: `POST /rest/posts/{urn}` with `X-RestLi-Method: PARTIAL_UPDATE`
**Status**: 🔬 Needs testing

---

#### US-6: Create Post with Image
**As a** visual storyteller
**I want to** create a LinkedIn post with an image
**So that** I can share screenshots, diagrams, or visual content

**Acceptance Criteria:**
- MCP tool accepts local image path (PNG, JPG)
- Uploads image via Images API
- Creates post with image URN
- Image displays in LinkedIn post
- Supports alt text for accessibility

**API Endpoints**:
1. Images API (upload) → get URN
2. `POST /rest/posts` with `content.media.id`

**Status**: 📋 Planned

---

#### US-7: Get Post Analytics
**As a** content strategist
**I want to** see engagement metrics for my posts
**So that** I can understand what resonates with my audience

**Acceptance Criteria:**
- MCP tool returns likes, comments, shares, impressions
- Returns engagement by post URN
- Optionally returns aggregate stats

**API Endpoint**: 🔍 Not documented - needs research
**Status**: ❓ Unknown if supported

---

### Phase 3 - Automation & Scheduling

#### US-8: Schedule Post for Future
**As a** busy professional
**I want to** schedule a LinkedIn post for a specific date/time
**So that** I can maintain consistent posting without manual intervention

**Acceptance Criteria:**
- MCP tool accepts post content + future timestamp
- Stores scheduled post locally or in database
- Automatically publishes at specified time
- Sends confirmation when published
- Allows canceling scheduled posts
- Handles timezone correctly

**API Support**: ❌ LinkedIn API does **NOT** support native scheduling
**Implementation**: Must build custom scheduler (cron, queue, etc.)
**Status**: 🎯 **High Priority** - Build custom solution

**Technical Approach:**
- Store scheduled posts in local database (SQLite/JSON)
- Use cron job or Node.js scheduler to check pending posts
- Publish via standard Posts API when time arrives
- Implement retry logic for failed posts
- Log all scheduling events

---

#### US-9: Draft Post Management
**As a** content planner
**I want to** save draft posts without publishing
**So that** I can prepare content in advance and refine before sharing

**Acceptance Criteria:**
- MCP tool saves draft locally
- Lists all draft posts
- Edit draft posts
- Publish draft when ready
- Delete draft

**API Support**: ❌ LinkedIn API does **NOT** support draft storage
**Implementation**: Must build local draft storage
**Status**: 📋 Planned - Custom solution required

---

#### US-10: Bulk Post from GitHub Activity
**As an** active open-source contributor
**I want to** automatically create LinkedIn posts from GitHub events (releases, PRs, stars)
**So that** my network stays informed about my contributions

**Acceptance Criteria:**
- Monitor GitHub webhooks or RSS for specific events
- Auto-generate post commentary based on event type
- Include link to GitHub resource
- Allow customization of post templates
- Opt-in/opt-out for specific event types

**API Support**: Not applicable (external integration)
**Status**: 🚀 Future enhancement

---

## Authentication & Authorization

### US-AUTH: OAuth 2.0 Flow
**As a** MCP user
**I want to** authenticate once and have the MCP manage my LinkedIn access
**So that** I don't need to manually handle tokens

**Requirements:**
- ✅ 3-legged OAuth flow implemented
- ✅ Obtain `w_member_social` scope via "Share on LinkedIn" product
- ✅ Obtain `openid`, `profile`, `email` via "Sign In with LinkedIn using OpenID Connect"
- 🔄 Token refresh before expiry (60-day lifetime)
- 🔄 Secure token storage in `.env` or encrypted file
- 🔄 Auto-refresh tokens when expired

**Status**: ✅ OAuth flow working, token refresh needs implementation

---

## MCP Tool Interface Design

Based on user stories, the MCP should expose these tools:

### Core Tools (MVP)
1. `linkedin_create_post(commentary, visibility="PUBLIC")` → US-1
2. `linkedin_create_post_with_link(commentary, url, title?, description?)` → US-2
3. `linkedin_get_my_posts(limit=10, offset=0)` → US-3
4. `linkedin_delete_post(post_urn)` → US-4

### Content Management Tools (Phase 2)
5. `linkedin_update_post(post_urn, new_commentary)` → US-5
6. `linkedin_create_post_with_image(commentary, image_path, alt_text?)` → US-6
7. `linkedin_get_post_analytics(post_urn)` → US-7 (if API supports)

### Scheduling Tools (Phase 3) ⚡ HIGH PRIORITY
8. `linkedin_schedule_post(commentary, publish_at, visibility="PUBLIC")` → US-8
9. `linkedin_list_scheduled_posts()` → US-8
10. `linkedin_cancel_scheduled_post(schedule_id)` → US-8
11. `linkedin_save_draft(commentary, metadata?)` → US-9
12. `linkedin_list_drafts()` → US-9
13. `linkedin_publish_draft(draft_id)` → US-9

### Authentication Tools
14. `linkedin_get_auth_url()` → Start OAuth flow
15. `linkedin_exchange_code(authorization_code)` → Complete OAuth
16. `linkedin_refresh_token()` → Renew access token
17. `linkedin_get_user_info()` → Get person URN and profile data

---

## Technical Constraints

### LinkedIn API Limitations
- ❌ **No native post scheduling** - must build custom scheduler
- ❌ **No draft API** - must store drafts locally
- ❌ **Rate limits undocumented** - implement exponential backoff
- ❌ **Analytics API unclear** - may not be available for personal posts
- ✅ **60-day token expiry** - need refresh mechanism
- ✅ **Batch operations not supported** - one post at a time

### MCP Implementation Constraints
- Must run as Node.js MCP server
- Must integrate with Claude Desktop via stdio transport
- Must handle OAuth tokens securely
- Must persist state (scheduled posts, drafts) locally
- Must be resilient to network failures and retries

---

## Success Metrics

### MVP Success (Phase 1)
- [ ] Successfully create text posts via MCP
- [ ] Successfully create posts with GitHub links
- [ ] Retrieve and display user's posts
- [ ] Delete posts by URN

### Phase 2 Success
- [ ] Edit existing posts
- [ ] Upload images and create posts with media
- [ ] View basic engagement metrics (if API supports)

### Phase 3 Success (Scheduling) 🎯
- [ ] Schedule posts for future publication
- [ ] View all scheduled posts
- [ ] Cancel scheduled posts before publication
- [ ] Automatic publishing at scheduled time
- [ ] Error handling and retry for failed publications
- [ ] Save and manage draft posts locally

### User Experience Success
- [ ] MCP responds within 2 seconds for simple operations
- [ ] Clear error messages for failed operations
- [ ] OAuth flow completes without manual token management
- [ ] No data loss for scheduled or draft posts
- [ ] Posts appear correctly formatted on LinkedIn

---

## Open Questions & Research Needed

1. ✅ ~~Does LinkedIn API support post scheduling?~~ → **NO, must build custom**
2. ✅ ~~Does LinkedIn API support drafts?~~ → **NO, must build custom**
3. ❓ Are analytics available for personal posts (not just organization posts)?
4. ❓ What are actual rate limits for Posts API?
5. ❓ Can we retrieve engagement metrics (likes, comments, shares)?
6. ❓ Does the API support video uploads? (Docs say yes, needs testing)
7. ❓ Does the API support document uploads? (Docs say yes, needs testing)
8. ❓ Can we edit posts after publishing? (Docs say yes, needs testing)

---

## Architecture Decisions

### Post Scheduling Implementation
Since LinkedIn doesn't support native scheduling, we'll build:

**Option 1: Cron-based Scheduler** (Recommended)
- Store scheduled posts in SQLite database
- Cron job checks every minute for posts due
- Publishes via Posts API when time arrives
- Pros: Simple, reliable, works offline
- Cons: Requires MCP server to be running continuously

**Option 2: Cloud Function Scheduler**
- Store scheduled posts in cloud database
- Use AWS Lambda/GCP Cloud Functions with scheduler
- Pros: Always available, no local server needed
- Cons: More complex, requires cloud setup

**Decision**: Start with Option 1 (local cron), add Option 2 later if needed

### Draft Storage
- Use local JSON file or SQLite
- Schema: `{id, commentary, url?, title?, description?, created_at, updated_at}`
- Encrypt sensitive content
- Backup to `.drafts/` directory

---

## Dependencies & Prerequisites

### LinkedIn Developer Setup
- ✅ LinkedIn Developer App created
- ✅ "Sign In with LinkedIn using OpenID Connect" product added
- ✅ "Share on LinkedIn" product added
- ✅ OAuth redirect URI configured

### MCP Server Requirements
- Node.js 18+
- `@modelcontextprotocol/sdk-nodejs`
- `dotenv` for environment variables
- `better-sqlite3` or similar for scheduling database
- `node-cron` for scheduling jobs

### Environment Variables
```bash
LINKEDIN_CLIENT_ID=86la1itavie1yk
LINKEDIN_CLIENT_SECRET=WPL_AP1.***
LINKEDIN_REDIRECT_URI=https://localhost:3000/callback
LINKEDIN_PERSON_ID=t-klBlnFdI
LINKEDIN_ACCESS_TOKEN=AQVo2EPa***
LINKEDIN_API_VERSION=202510
```

---

## Next Steps

1. ✅ ~~Complete API research and testing~~ (Done)
2. ✅ ~~Document user stories~~ (This document)
3. 🔄 Create Issue #2: Implement MVP MCP tools (US-1 to US-4)
4. 🔄 Create Issue #3: Implement scheduling system (US-8, US-9)
5. 📋 Build MCP server scaffold with stdio transport
6. 📋 Implement OAuth token management
7. 📋 Implement core posting tools
8. 📋 Build scheduler with cron + database
9. 📋 Test end-to-end workflow
10. 📋 Deploy and integrate with Claude Desktop

---

**Document Owner**: Lucas Draney (@ldraney)
**Repository**: https://github.com/intelligent-staffing-systems/mcp-linkedin
