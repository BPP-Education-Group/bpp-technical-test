## Context

BPP Tutors need a new **web-based tool** to manage classroom logistics. Your task is to design a **component-level architecture solution** in a diagramming tool of choice that **integrates with existing services** and supports future evolution.

---
## 🎯 Goal

Design a **secure, scalable system** that allows tutors to:

1. Change classroom **date or location** for a student group via the UI
2. Automatically **email affected students** about changes (**not via** the UI)
3. **View a history** of change-related emails via the UI

---
## 🧑‍🏫 Tutor Workflow (User Journey)

1. Tutor logs into the web app (SSO via an Auth Provider of choice)
2. Selects a student group and edits the classroom date/location
3. The change is submitted and persisted
4. The system triggers an email to affected students (asynchronously)
5. Tutor can view a list of emails sent for audit or confirmation

---
## 🧩 Required Integrations (Existing Services)

### 🏫 Classroom Scheduling Service (3rd party)

- Headless service – **no UI**
- Provides a **REST API** to:
	- Fetch/update classroom date and location
	- The REST API is Authenticated via an **API Key**. A single key provided to BPP.
- Emits events on classroom changes via:
    - **AWS EventBridge Partner Event Bus**

### 📧 Email Sending Service (Legacy, On-Prem)

- **SOAP-based**, hosted in BPP's **Data Centre**
- Accessible only via **VPN into AWS**
- **Throttled** at **10 req/sec**
- Being deprecated next year
- You are the **first consumer**, but more services will integrate soon

---
## 🛑 Constraints

- Web UI must be an SPA (e.g., React / Angular)
- Tutors authenticate via an Auth Provider (not specified, personal choice)
- System should gracefully handle **throttling**
- Should be designed to support **eventual migration away** from the legacy email service

---

## 💡 Architecture Considerations

- How will you decouple the frontend from external systems?
- What AWS services will help persist and audit data?
- How will you **buffer/throttle** requests to the email service?
- Can your architecture **abstract** email sending to ease migration later?

---

## 📦 Deliverables

Provide:

1. A **component-level architecture diagram**
    - Use AWS services where appropriate
    - Indicate integration points with third-party/legacy systems
2. Brief notes on:
    - Your service choices and rationale
    - How security/authentication is handled
    - How your design scales and evolves (especially post-email migration)
    - Networking/security boundaries (e.g., accessing VPN-only services)
