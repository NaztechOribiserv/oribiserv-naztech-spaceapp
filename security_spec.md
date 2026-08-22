# Security Specifications

Verification of identity, schema integrity, and temporal consistency. This specification details the secure constraints for Firestore rules auditing.

## 1. Data Invariants
- An order or ticket cannot be logged without an authenticated `userId` that strictly matches the sender's UID (`request.auth.uid`).
- A UserProfile document MUST have standard fields: `loyaltyPoints` as an integer and `membershipTier` as an allowed string enum element.
- The `createdAt` property MUST strictly use the database server timestamp (`request.time`).
- The `status` field cannot be modified directly by any user to skip stages once a ticket/order is in a terminal status.
- Key properties like `userId` or `email` are strictly immutable after standard creation.

## 2. The "Dirty Dozen" Malicious Payloads (Forbidden)
These payloads must be verified to trigger a `PERMISSION_DENIED` rejection:

1. **Identity Spoofing in Orders**: Setting `userId` of an order transaction to another member's UID while authenticated.
2. **Anonymous Writes On Tickets**: Anonymous, unauthenticated clients attempting to log a priority queue ticket.
3. **Privilege Escalation on Profiles**: A non-admin updating their `membershipTier` to `Premium` directly.
4. **Malicious Ghost Fields in UserProfile**: Inserting unauthorized fields such as `{ "isAdmin": true, "vip": true }` inside profile updates.
5. **Junk Character ID Injection**: Creating a document with a malicious 1KB junk-string ID (e.g., `match /{documentID}`) to poison database resources.
6. **Self-Assigned Points Hijacking**: Directly increasing `loyaltyPoints` value inside profile creation or update operations.
7. **Temporal Fraud (Time Modification)**: Forcing `createdAt` or `updatedAt` to be in the past or future instead of using the server timestamp `request.time`.
8. **Spam Payload Denials (Denial-of-Wallet)**: Submitting descriptions or addresses of enormous size (e.g. > 50kb text blocks) to inflict heavy cloud billing costs.
9. **Bypassing Terminal Status Lock**: An authenticated user changing the `status` of a finished, shipped order from `"completed"` back to `"pending"`.
10. **State Shortcutting**: Updating an order status key to an invalid option (e.g., `"shipped_to_moon"`).
11. **Orphaned Support Ticket Entries**: Submitting a ticket with reference parameters that point to mock or non-existent client profiles.
12. **Blanket Query Harvesting**: Direct client-side fetching of complete collection lists without a specific query filter bounding the query search.

## 3. Security Rules
The rules will define global validation helpers, handle security constraints, and require email verification where possible. We will implement these robust security logic gates within `firestore.rules`.
