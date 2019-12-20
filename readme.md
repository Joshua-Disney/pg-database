entities:

- Hubs <---- like a Slack channel>
  - id
  - name
- Users
  - id
  - username
- Messages
  - id
  - message
  - hub_id
  - user_id
- Hubs-Users
  - id
  - hub_id
  - user_id

Relationships:

- Hubs \*---\* Users
- Hubs 1---\* Messages
- Users 1---\* Messages
