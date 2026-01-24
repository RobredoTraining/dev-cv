# robredo.dev — Portfolio / CV (Next.js)

Portfolio personal de **Pablo García Robredo** construido con **Next.js (App Router)** + **Tailwind** + **next-intl**, con un formulario de contacto real (API Route) y un pequeño “System status” para enseñar backend.

## Stack

- **Next.js** (App Router)
- **React**
- **Tailwind CSS**
- **next-intl** (i18n)
- **Resend** (envío de emails desde `/api/contact`)
- **Upstash Redis + RateLimit** (protección anti-spam para el contacto)

---

## Features

- Tema **Light/Dark** basado en CSS variables y clase `.dark` en `<html>`
- UI minimalista, orientada a “engineering”
- i18n (ES/EN)
- **Contact form**:
  - POST `/api/contact`
  - Honeypot anti-bots
  - Validación + límites de longitud
  - Rate limit por IP
- **System status**:
  - GET `/api/health` (latencia + estado)

---

## Requisitos

- Node.js 18+ (recomendado)
- Cuenta en:
  - Resend (API key)
  - Upstash (Redis REST URL/TOKEN)

---

## Instalación

```bash
npm install
npm run dev
