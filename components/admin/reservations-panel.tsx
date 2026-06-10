import {
  acceptReservationAction,
  cancelReservationAction,
  rejectReservationAction,
  updateInternalNotesAction
} from "@/app/admin/actions";
import type { Database } from "@/types/database";
import type { ReservationStatus } from "@/types/domain";

type ReservationRow = Database["public"]["Tables"]["reservations"]["Row"];

type ReservationsPanelProps = {
  reservations: ReservationRow[];
  selectedDate: string;
  selectedStatus: ReservationStatus | "all";
};

const statusLabels: Record<ReservationStatus, string> = {
  pending: "Pendiente",
  accepted: "Aceptada",
  rejected: "Rechazada",
  cancelled: "Cancelada"
};

const statusStyles: Record<ReservationStatus, string> = {
  pending: "bg-amber-50 text-amber-800 border-amber-200",
  accepted: "bg-emerald-50 text-emerald-800 border-emerald-200",
  rejected: "bg-red-50 text-red-800 border-red-200",
  cancelled: "bg-zinc-100 text-zinc-700 border-zinc-200"
};

export function ReservationsPanel({
  reservations,
  selectedDate,
  selectedStatus
}: ReservationsPanelProps) {
  return (
    <section className="grid gap-5">
      <form className="grid gap-3 rounded-lg border border-harbor-900/10 bg-white p-4 shadow-soft sm:grid-cols-[1fr_1fr_auto]">
        <label className="grid gap-2 text-sm font-semibold text-harbor-900">
          Fecha
          <input
            className="min-h-11 rounded-lg border border-harbor-900/15 px-3"
            defaultValue={selectedDate}
            name="date"
            type="date"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-harbor-900">
          Estado
          <select
            className="min-h-11 rounded-lg border border-harbor-900/15 px-3"
            defaultValue={selectedStatus}
            name="status"
          >
            <option value="all">Todos</option>
            {Object.entries(statusLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <button className="min-h-11 self-end rounded-lg bg-harbor-900 px-5 text-sm font-semibold text-white">
          Filtrar
        </button>
      </form>

      <div className="grid gap-3">
        {reservations.length === 0 ? (
          <div className="rounded-lg border border-dashed border-harbor-900/20 bg-white p-8 text-center text-harbor-900/70">
            No hay reservas con estos filtros.
          </div>
        ) : null}

        {reservations.map((reservation) => (
          <article
            className="rounded-lg border border-harbor-900/10 bg-white p-4 shadow-soft"
            key={reservation.id}
          >
            <div className="grid gap-3 md:grid-cols-[1fr_auto]">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-bold text-harbor-900">
                    {reservation.time.slice(0, 5)} · {reservation.name}
                  </h2>
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-bold ${statusStyles[reservation.status]}`}
                  >
                    {statusLabels[reservation.status]}
                  </span>
                  {reservation.is_group_request ? (
                    <span className="rounded-full border border-harbor-600/20 bg-harbor-50 px-3 py-1 text-xs font-bold text-harbor-900">
                      Grupo
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 text-sm text-harbor-900/70">
                  {reservation.guests} comensales · {reservation.phone}
                  {reservation.email ? ` · ${reservation.email}` : ""}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <ActionButton action={acceptReservationAction} id={reservation.id}>
                  Aceptar
                </ActionButton>
                <ActionButton action={rejectReservationAction} id={reservation.id}>
                  Rechazar
                </ActionButton>
                <ActionButton action={cancelReservationAction} id={reservation.id}>
                  Cancelar
                </ActionButton>
              </div>
            </div>

            <details className="mt-4 rounded-lg bg-[#fbfaf7] p-4">
              <summary className="cursor-pointer font-semibold text-harbor-900">
                Ver detalle y notas internas
              </summary>
              <div className="mt-4 grid gap-4 text-sm text-harbor-900/75 md:grid-cols-2">
                <Info label="Fecha" value={reservation.date} />
                <Info label="Hora" value={reservation.time.slice(0, 5)} />
                <Info label="Preferencia" value={reservation.seating_preference} />
                <Info label="Trona" value={reservation.high_chair ? "Sí" : "No"} />
                <Info label="Alergias" value={reservation.allergies ?? "No indicado"} />
                <Info label="Observaciones" value={reservation.notes ?? "Sin observaciones"} />
                <Info label="Grupo" value={reservation.group_details ?? "No"} />
              </div>

              <form action={updateInternalNotesAction} className="mt-4 grid gap-3">
                <input name="reservationId" type="hidden" value={reservation.id} />
                <label className="grid gap-2 text-sm font-semibold text-harbor-900">
                  Comentario interno
                  <textarea
                    className="min-h-24 rounded-lg border border-harbor-900/15 bg-white p-3"
                    defaultValue={reservation.internal_notes ?? ""}
                    name="internalNotes"
                  />
                </label>
                <button className="w-fit rounded-lg border border-harbor-900/15 bg-white px-4 py-2 text-sm font-semibold text-harbor-900">
                  Guardar nota
                </button>
              </form>
            </details>
          </article>
        ))}
      </div>
    </section>
  );
}

type ActionButtonProps = {
  action: (formData: FormData) => Promise<void>;
  id: string;
  children: string;
};

function ActionButton({ action, id, children }: ActionButtonProps) {
  return (
    <form action={action}>
      <input name="reservationId" type="hidden" value={id} />
      <button className="min-h-10 w-full rounded-lg border border-harbor-900/15 bg-white px-3 text-xs font-bold text-harbor-900 hover:bg-harbor-50">
        {children}
      </button>
    </form>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-bold text-harbor-900">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
