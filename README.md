# Relae Node SDK

A lightweight, fully-typed Node.js SDK for interacting with Relae.

Relae helps developers deliver webhooks reliably with retries, observability, delivery logs, and endpoint management.

This SDK provides a simple interface for:

- Sending events
- Managing webhook endpoints
- Inspecting deliveries
- Retrying failed deliveries

## 🚀 Installation

```bash
npm install relae
# or
yarn add relae
```

## 🔧 Setup

Import and initialize the client with your API key:

```javascript
import { Relae } from "relae";

const client = new Relae({
  apiKey: process.env.RELAE_API_KEY!, // recommended
});
```

## 📬 Events API

Send webhook events through Relae.

### Send an event

```javascript
await client.events.send({
  event: "user.created",
  destination: "destinationId",
  payload: {
    id: "u_123",
    email: "test@example.com",
  },
});
```

The SDK automatically adds an `Idempotency-Key` header to prevent duplicate event creation.

### Get an event

```javascript
const evt = await client.events.get("eventId");
console.log(evt);
```

### Retry an event

```javascript
const retry = await client.events.retry("eventId");
console.log(retry);
```

## 🔌 Destinations API

Destinations tell Relae where events should be delivered.

### Create a destination

```javascript
const destination = await client.destinations.create({
  url: "https://myapp.com/webhooks",
  description: "Main webhook handler",
});
```

### List destinations

```javascript
const destinations = await client.destinations.list();
console.log(destinations.data);
```

### Get a destination

```javascript
const destination = await client.destinations.get("destination_id");
```

### Delete a destination

```javascript
await client.destinations.delete("destination_id");
```

## 🚚 Deliveries API

Deliveries represent individual webhook delivery attempts (with retries).

Deliveries let you see the historical trace for an event.

### Get a delivery

```javascript
const delivery = await client.deliveries.get("del_123");
```

## ⚙️ Client Configuration

### Constructor Options

```typescript
interface RelaeClientOptions {
  apiKey: string;
  baseUrl?: string; // defaults to https://api.relaehook.com
}
```

### Example

```javascript
const client = new Relae({
  apiKey: "rel_live_123",
  baseUrl: "http://localhost:8080", // optional, useful for dev
});
```

## 📦 TypeScript Support

The SDK is fully written in TypeScript and ships with complete type definitions.

### Example

```typescript
const result: SendEventResponse = await client.events.send(...);
```

## 🔐 Authentication

All requests use Bearer authentication:

```
Authorization: Bearer <api-key>
```

Generate API keys from your Relae dashboard.

## 🧪 Example Script

```javascript
import { Relae } from "relae";

async function main() {
  const client = new Relae({ apiKey: process.env.RELAE_API_KEY! });

  const destination = await client.destinations.create({
    url: "https://myapp.com/webhooks",
  });

  const event = await client.events.send({
    event: "invoice.paid",
    destination: destination.id,
    payload: { amount: 2000 },
  });

  console.log("Event sent:", event);
}

main();
```

## 📄 License

MIT License

Copyright © 2025

## 🙋 Need help?

Contact support at <support@relaehook.com> or open an issue in the GitHub repo.
