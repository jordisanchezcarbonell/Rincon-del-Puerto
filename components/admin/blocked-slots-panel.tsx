import {
  createBlockedSlotAction,
  deleteBlockedSlotAction
} from "@/app/admin/actions";
import type { Database } from "@/types/database";

type BlockedSlotRow = Database["public"]["Tables"]["blocked_slots"]["Row"];

type BlockedSlotsPanelProps = {
  blockedSlots: BlockedSlotRow[];
  selectedDate: string;
};

const blockTypeLabels = {
  slot: "Horario",
  shift: "Turno",
  day: "Día completo"
};

export function BlockedSlotsPanel({
  blockedSlots,
  selectedDate
}: BlockedSlotsPanelProps) {
  return (
    <section className="grid gap-4 rounded-lg border border-harbor-900/10 bg-white p-4 shadow-soft">
      <div>
        <h2 className="text-lg font-bold text-harbor-900">Bloqueos</h2>
        <p className="mt-1 text-sm text-harbor-900/65">
          Los horarios bloqueados no aparecerán como disponibles en el formulario público.
        </p>
      </div>

      <form
        action={createBlockedSlotAction}
        className="grid gap-3 md:grid-cols-[1fr_1fr_1fr_1fr_1fr_auto]"
      >
        <input name="date" type="hidden" value={selectedDate} />
        <label className="grid gap-2 text-sm font-semibold text-harbor-900">
          Tipo
          <select
            className="min-h-11 rounded-lg border border-harbor-900/15 px-3"
            name="blockType"
            required
          >
            <option value="slot">Horario</option>
            <option value="shift">Turno</option>
            <option value="day">Día completo</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm font-semibold text-harbor-900">
          Desde
          <input
            className="min-h-11 rounded-lg border border-harbor-900/15 px-3"
            name="startTime"
            type="time"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-harbor-900">
          Hasta
          <input
            className="min-h-11 rounded-lg border border-harbor-900/15 px-3"
            name="endTime"
            type="time"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-harbor-900 md:col-span-2">
          Motivo
          <input
            className="min-h-11 rounded-lg border border-harbor-900/15 px-3"
            name="reason"
            placeholder="Evento privado, lleno, descanso..."
          />
        </label>
        <button className="min-h-11 self-end rounded-lg bg-harbor-900 px-4 text-sm font-semibold text-white">
          Bloquear
        </button>
      </form>

      <div className="grid gap-2">
        {blockedSlots.length === 0 ? (
          <p className="rounded-lg border border-dashed border-harbor-900/15 p-4 text-sm text-harbor-900/65">
            No hay bloqueos para esta fecha.
          </p>
        ) : null}

        {blockedSlots.map((slot) => (
          <div
            className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-[#fbfaf7] p-3 text-sm"
            key={slot.id}
          >
            <div>
              <p className="font-bold text-harbor-900">
                {blockTypeLabels[slot.block_type]} ·{" "}
                {slot.block_type === "day"
                  ? "Todo el día"
                  : `${slot.start_time?.slice(0, 5)}-${slot.end_time?.slice(0, 5)}`}
              </p>
              <p className="text-harbor-900/65">{slot.reason ?? "Sin motivo"}</p>
            </div>
            <form action={deleteBlockedSlotAction}>
              <input name="blockedSlotId" type="hidden" value={slot.id} />
              <button className="rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-bold text-red-700">
                Quitar
              </button>
            </form>
          </div>
        ))}
      </div>
    </section>
  );
}
