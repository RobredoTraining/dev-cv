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

Instala dependencias y arranca el entorno de desarrollo:

```bash
npm install
npm run dev
```
Scripts disponibles:

```bash
npm run dev       # desarrollo
npm run build     # build de producción
npm run start     # arrancar build
npm run lint      # lint
```

La aplicación estará disponible en:
http://localhost:3000

## Variables de entorno
Este proyecto requiere variables de entorno para el envío de emails
y el rate limit del formulario de contacto.
Crea un archivo .env.local en la raíz del proyecto:


´´´Email (Resend):

- RESEND_API_KEY=re_xxxxxxxxxxxxxxxxx
- CONTACT_TO=probredodev@gmail.com
- CONTACT_FROM=onboarding@resend.dev

Rate limit (Upstash)
- UPSTASH_REDIS_REST_URL=xxxxxx.upstash.io
- UPSTASH_REDIS_REST_TOKEN=xxxxxxxxxxxxxxxx

´´´

El archivo .env.local no debe subirse al repositorio.
En producción, estas variables se configuran directamente en Vercel.

` GET /api/health`
Health check idempotente utilizado por el panel de estado del sistema.

`POST /api/contact`
Envía un email usando Resend.

Incluye:

- Honeypot anti-bots
- Validación de campos
- Límites de longitud
- Rate limit por IP (Upstash)

Deploy
El proyecto está preparado para desplegarse en Vercel.

Pasos generales:
- Importar el repositorio en Vercel
- Configurar las variables de entorno
- Desplegar
- Conectar el dominio (robredo.dev)

## Licencia

MIT
