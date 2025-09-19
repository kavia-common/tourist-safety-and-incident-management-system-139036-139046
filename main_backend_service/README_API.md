# Tourist Safety & Incident Management - Backend API

This Express backend provides REST APIs for:
- Auth (Supabase)
- Digital ID management
- Safety scoring
- Geofencing events and polygons
- Panic button
- AI event ingest
- IoT event ingest
- Dashboard overview
- Multilingual support (Accept-Language)

Docs:
- Swagger UI: /docs
- Generate OpenAPI JSON: npm run generate:openapi (outputs to interfaces/openapi.json)

Environment:
- See .env.example; ensure PostgreSQL and Supabase env vars are set.

Security:
- Most endpoints require Bearer token from Supabase (`Authorization: Bearer <token>`).

Notes and extension points:
- Blockchain anchoring: add to services/digitalIdService.js
- AI workflows: services/aiEventService.js
- IoT pipelines (MQTT/Kafka): services/iotService.js
- Notifications (SMS/Push): services/panicService.js
