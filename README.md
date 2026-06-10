# Restaurante Rincón del Puerto MVP

Piloto Next.js para una web pública mobile-first con carta digital externa,
solicitudes de reserva, panel protegido con Supabase Auth y emails con Resend.

## Arquitectura

- Next.js App Router con TypeScript.
- UI pública mobile-first con Tailwind CSS.
- Supabase para Auth, base de datos y RLS.
- Server Actions y Route Handlers para operaciones sensibles.
- Resend aislado en una capa de emails.
- Carta digital enlazada desde Flipsnack mediante `NEXT_PUBLIC_MENU_URL`.

## Seguridad base

- `SUPABASE_SERVICE_ROLE_KEY` solo se usará en servidor.
- `/admin` se protegerá con Supabase Auth.
- RLS se apoya en `restaurant_admins` para asociar usuarios Auth con restaurantes.
- Las reservas no se leerán ni modificarán desde cliente público.
- Los tokens de cancelación se generan en PostgreSQL con `gen_random_bytes(32)`.

## Orden de implementación

1. Arquitectura, env, SQL y tipos.
2. Layout público, home y carta.
3. Formulario de reserva y confirmación.
4. Emails con Resend.
5. Login admin y acciones de reservas.
6. Bloqueos, cancelación por enlace y analítica.
