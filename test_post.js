#!/usr/bin/env node

// Test LinkedIn API posting with JavaScript
// Load environment variables
require('dotenv').config();

const https = require('https');

const TOKEN = process.env.LINKEDIN_ACCESS_TOKEN;
const PERSON_ID = process.env.LINKEDIN_PERSON_ID;
const API_VERSION = process.env.LINKEDIN_API_VERSION;

const postData = JSON.stringify({
  author: `urn:li:person:${PERSON_ID}`,
  commentary: "Testing LinkedIn API with JavaScript! 🚀 Building an MCP server to automate my posts. #coding #javascript #automation",
  visibility: "PUBLIC",
  distribution: {
    feedDistribution: "MAIN_FEED"
  },
  lifecycleState: "PUBLISHED"
});

const options = {
  hostname: 'api.linkedin.com',
  path: '/rest/posts',
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${TOKEN}`,
    'LinkedIn-Version': API_VERSION,
    'X-Restli-Protocol-Version': '2.0.0',
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

console.log('Creating LinkedIn post...');

const req = https.request(options, (res) => {
  console.log(`Status: ${res.statusCode} ${res.statusMessage}`);
  console.log('Headers:', JSON.stringify(res.headers, null, 2));

  if (res.statusCode === 201) {
    const postUrn = res.headers['x-restli-id'];
    console.log('\n✅ SUCCESS! Post created!');
    console.log(`Post URN: ${postUrn}`);
    console.log('Check your LinkedIn profile to see the post!');
  }

  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    if (data) {
      console.log('Response body:', data);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Error:', error);
});

req.write(postData);
req.end();
