"use client";

import { useActionState } from "react";
import { LockKeyhole } from "lucide-react";
import { loginAction } from "@/app/admin/login/actions";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, { ok: true });

  return (
    <form
      action={formAction}
      className="mx-auto grid w-full max-w-md gap-5 rounded-lg border border-harbor-900/10 bg-white p-6 shadow-soft"
    >
      <div>
        <p className="mb-2 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-harbor-600">
          <LockKeyhole aria-hidden="true" size={16} />
          Admin
        </p>
        <h1 className="text-3xl font-bold text-harbor-900">Acceso restaurante</h1>
        <p className="mt-2 text-sm leading-6 text-harbor-900/70">
          Entra con el usuario creado en Supabase Auth para gestionar reservas.
        </p>
      </div>

      {!state.ok && state.message ? (
        <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {state.message}
        </p>
      ) : null}

      <label className="grid gap-2 text-sm font-semibold text-harbor-900">
        Email
        <input
          autoComplete="email"
          className="min-h-12 rounded-lg border border-harbor-900/15 px-3 text-base"
          name="email"
          required
          type="email"
        />
      </label>

      <label className="grid gap-2 text-sm font-semibold text-harbor-900">
        Contraseña
        <input
          autoComplete="current-password"
          className="min-h-12 rounded-lg border border-harbor-900/15 px-3 text-base"
          name="password"
          required
          type="password"
        />
      </label>

      <button
        className="min-h-12 rounded-lg bg-harbor-900 px-5 py-3 text-sm font-semibold text-white shadow-soft hover:bg-harbor-600 disabled:opacity-60"
        disabled={pending}
        type="submit"
      >
        Entrar
      </button>
    </form>
  );
}
