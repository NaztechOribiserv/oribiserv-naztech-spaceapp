# Naztech Space - Oribiserv Main Home App

<img width="1024" height="1024" alt="Main Logo" src="https://github.com/user-attachments/assets/357f4e0d-81be-4e37-a476-693a72d41445" />
# Oribiserv Customer Portal

Welcome to the Oribiserv Customer Portal repository. This portal provides a streamlined, self-service interface for clients to manage their IT services, billing, and support requests seamlessly.

## Key Features

*   **Service Management:** Clients can view, upgrade, and manage their active connectivity and IT subscriptions.
*   **Billing & Invoices:** An integrated dashboard for viewing current statements, downloading past invoices, and tracking payment history.
*   **Support Ticketing:** A direct ticketing system for users to log technical issues and track resolution progress.
*   **Account Settings:** Secure profile management, credential updates, and notification preferences.

## Tech Stack & Requirements

*   **Containerization:** Docker / Dokploy
*   **Hosting Environment:** Proxmox VE / Linux (AlmaLinux or Fedora recommended)
*   **Dependencies:** *(Add your specific frontend and backend frameworks here)*

## Deployment Setup

To deploy the portal in your environment, follow these standard steps:

1.  Clone this repository to your designated server or Proxmox container.
2.  Duplicate the `.env.example` file, rename it to `.env`, and configure your local database credentials and API keys.
3.  Execute `docker-compose up -d` to build the images and spin up the application services.
4.  Navigate to the assigned local IP or reverse proxy domain to access the setup wizard.
