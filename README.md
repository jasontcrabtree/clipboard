# A demo project

## Tech Used:

- NextJS
- Headless UI
- Tailwind
- Hasura
- EsLint
- PropTypes
- JSDoc
- Netlify

## Possible Integrations:

- SWR / URQL / GraphQL-Request
- Jotai
- React-hook-form

### References:

- [EsLint-Require-JSDoc Rules reference](https://eslint.org/docs/rules/require-jsdoc)

{"query":"query ALL_ARTICLES_PAGINATED($limit: Int = 4) {\n articles(limit: $limit, order_by: {created_at: desc}) {\n id\n title\n content\n }\n }","variables":{"limit":10}}

{"query":"query ALL_ARTICLES_PAGINATED($limit: Int = 4) {\n articles(limit: $limit, order_by: {created_at: desc}) {\n id\n title\n content\n }\n }\n","variables":{"limit":10},"operationName":"ALL_ARTICLES_PAGINATED"}
