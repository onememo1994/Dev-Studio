import { useState, useEffect, useCallback, useRef, type ElementType } from "react";
import {
  Moon, MapPin, RefreshCw, Clock, Dumbbell, Utensils,
  Sparkles, Plus, Check, ChevronDown, Flame, Bath,
  Timer, AlertCircle, Sun, CloudSun, Sunset, Star,
  Coffee, Salad, Activity, Footprints, HeartPulse,
  Droplets, Leaf, BedDouble, UtensilsCrossed, Pill,
  Trophy, LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

/* ── Types ─────────────────────────────────────────── */
interface PrayerTime {
  name: string;
  arabicName: string;
  time: string;
  Icon: LucideIcon;
}

interface ActivityItem {
  id: string;
  title: string;
  done: boolean;
  time?: string;
}

interface ActivitySuggestion {
  Icon: LucideIcon;
  label: string;
  bestTime: string;
  reason: string;
}

type InnerTab = "prayer" | "activities";

const PRAYER_KEYS = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"] as const;
const PRAYER_META: Record<string, { arabic: string; Icon: LucideIcon; color: string; iconColor: string }> = {
  Fajr:    { arabic: "الفجر",  Icon: Star,    color: "text-indigo-400",  iconColor: "text-indigo-400"  },
  Dhuhr:   { arabic: "الظهر",  Icon: Sun,     color: "text-amber-500",   iconColor: "text-amber-500"   },
  Asr:     { arabic: "العصر",  Icon: CloudSun,color: "text-orange-400",  iconColor: "text-orange-400"  },
  Maghrib: { arabic: "المغرب", Icon: Sunset,  color: "text-rose-400",    iconColor: "text-rose-400"    },
  Isha:    { arabic: "العشاء", Icon: Moon,    color: "text-violet-400",  iconColor: "text-violet-400"  },
};

function to24hMin(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}
function formatCountdown(diffMin: number): string {
  if (diffMin <= 0) return "Now";
  const h = Math.floor(diffMin / 60);
  const m = diffMin % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}
function formatTime12(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const h12  = h % 12 || 12;
  return `${h12}:${String(m).padStart(2, "0")} ${ampm}`;
}
function toDateStr(d: Date) { return d.toISOString().slice(0, 10); }

/* ── Activity suggestions ───────────────────────── */
function getActivitySuggestions(prayers: PrayerTime[]): {
  food: ActivitySuggestion[];
  training: ActivitySuggestion[];
  selfCare: ActivitySuggestion[];
} {
  if (prayers.length === 0) {
    return {
      food: [
        { Icon: Coffee,         label: "Breakfast",      bestTime: "06:30 – 08:00", reason: "After Fajr prayer" },
        { Icon: Salad,          label: "Lunch",          bestTime: "12:30 – 13:30", reason: "After Dhuhr prayer" },
        { Icon: UtensilsCrossed,label: "Dinner",         bestTime: "19:30 – 20:30", reason: "After Maghrib prayer" },
      ],
      training: [
        { Icon: Dumbbell,  label: "Morning workout", bestTime: "08:00 – 10:00", reason: "After breakfast, high energy" },
        { Icon: Footprints,label: "Afternoon walk",  bestTime: "15:30 – 17:00", reason: "Before Maghrib, cooler air" },
      ],
      selfCare: [
        { Icon: Sparkles, label: "Morning routine", bestTime: "06:00 – 06:30", reason: "Before Fajr, fresh start" },
        { Icon: Droplets, label: "Evening shower",  bestTime: "20:00 – 21:00", reason: "After Maghrib, wind down" },
        { Icon: BedDouble,label: "Sleep prep",      bestTime: "22:00 – 23:00", reason: "After Isha, restful night" },
      ],
    };
  }

  const fajrMin    = to24hMin(prayers.find((p) => p.name === "Fajr")?.time    ?? "05:00");
  const dhuhrMin   = to24hMin(prayers.find((p) => p.name === "Dhuhr")?.time   ?? "12:00");
  const asrMin     = to24hMin(prayers.find((p) => p.name === "Asr")?.time     ?? "15:30");
  const maghribMin = to24hMin(prayers.find((p) => p.name === "Maghrib")?.time ?? "18:30");
  const ishaMin    = to24hMin(prayers.find((p) => p.name === "Isha")?.time    ?? "20:00");

  const fmt = (m: number) => {
    const h   = Math.floor(m / 60) % 24;
    const min = m % 60;
    const ap  = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 || 12;
    return `${h12}:${String(min).padStart(2, "0")} ${ap}`;
  };

  return {
    food: [
      { Icon: Coffee,          label: "Breakfast", bestTime: `${fmt(fajrMin + 20)} – ${fmt(fajrMin + 60)}`,      reason: "20–60 min after Fajr" },
      { Icon: Salad,           label: "Lunch",     bestTime: `${fmt(dhuhrMin + 15)} – ${fmt(dhuhrMin + 75)}`,    reason: "After Dhuhr prayer" },
      { Icon: UtensilsCrossed, label: "Dinner",    bestTime: `${fmt(maghribMin + 15)} – ${fmt(maghribMin + 75)}`,reason: "After Maghrib prayer" },
    ],
    training: [
      { Icon: Dumbbell,   label: "Strength training", bestTime: `${fmt(fajrMin + 70)} – ${fmt(dhuhrMin - 60)}`,    reason: "Post-breakfast energy peak" },
      { Icon: Footprints, label: "Walk / cardio",     bestTime: `${fmt(asrMin + 20)} – ${fmt(maghribMin - 20)}`,   reason: "Asr → Maghrib window, cooler air" },
      { Icon: HeartPulse, label: "Yoga / stretch",    bestTime: `${fmt(fajrMin + 5)} – ${fmt(fajrMin + 35)}`,      reason: "Right after Fajr, peaceful time" },
    ],
    selfCare: [
      { Icon: Sparkles, label: "Morning grooming", bestTime: `${fmt(fajrMin - 20)} – ${fmt(fajrMin)}`,          reason: "Before Fajr, fresh start" },
      { Icon: Droplets, label: "Shower / bath",    bestTime: `${fmt(maghribMin + 20)} – ${fmt(maghribMin + 50)}`,reason: "After Maghrib, relax" },
      { Icon: BedDouble,label: "Sleep routine",    bestTime: `${fmt(ishaMin + 60)} – ${fmt(ishaMin + 90)}`,      reason: "90 min after Isha, quality sleep" },
    ],
  };
}

/* ── PRAYER PANEL ─────────────────────────────────── */
function PrayerPanel() {
  const [prayers, setPrayers] = useState<PrayerTime[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState("");
  const [now, setNow] = useState(() => new Date());
  const fetchRef = useRef<((lat: number, lng: number, label: string) => Promise<void>) | null>(null);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 10_000);
    return () => clearInterval(t);
  }, []);

  const fetchByCoords = useCallback(async (lat: number, lng: number, label: string) => {
    setLoading(true); setError(null); setCity(label);
    try {
      const today = toDateStr(new Date());
      const [day, month, year] = [today.slice(8, 10), today.slice(5, 7), today.slice(0, 4)];
      const res = await fetch(
        `https://api.aladhan.com/v1/timings/${day}-${month}-${year}?latitude=${lat}&longitude=${lng}&method=4`
      );
      if (!res.ok) throw new Error("Failed to fetch prayer times");
      const json = await res.json();
      const timings = json.data?.timings;
      if (!timings) throw new Error("Invalid response from prayer API");
      setPrayers(PRAYER_KEYS.map((key) => ({
        name: key,
        arabicName: PRAYER_META[key].arabic,
        time: timings[key],
        Icon: PRAYER_META[key].Icon,
      })));
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  fetchRef.current = fetchByCoords;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
            .then((r) => r.json())
            .then((data) => {
              const label = data.address?.city || data.address?.town || data.address?.state || "Your location";
              fetchRef.current?.(latitude, longitude, label);
            })
            .catch(() => fetchRef.current?.(latitude, longitude, "Your location"));
        },
        () => fetchRef.current?.(21.3891, 39.8579, "Mecca")
      );
    } else {
      fetchRef.current?.(21.3891, 39.8579, "Mecca");
    }
  }, []);

  const nowMin = now.getHours() * 60 + now.getMinutes();
  let nextIdx  = -1;
  if (prayers.length > 0) {
    nextIdx = prayers.findIndex((p) => to24hMin(p.time) > nowMin);
    if (nextIdx === -1) nextIdx = 0;
  }

  const nextPrayer   = nextIdx >= 0 ? prayers[nextIdx] : null;
  const diffMin      = nextPrayer ? to24hMin(nextPrayer.time) - nowMin : 0;
  const adjustedDiff = diffMin < 0 ? diffMin + 24 * 60 : diffMin;

  return (
    <div className="space-y-5 py-2">
      {/* Countdown hero card */}
      <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 text-center space-y-3 shadow-sm">
        <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
          <MapPin className="size-3.5" />
          <span>{city || "Detecting location…"}</span>
        </div>

        {loading && (
          <div className="py-8 flex flex-col items-center gap-3">
            <RefreshCw className="size-8 text-primary animate-spin" />
            <p className="text-sm text-muted-foreground">Loading prayer times…</p>
          </div>
        )}

        {error && !loading && (
          <div className="rounded-2xl bg-destructive/10 border border-destructive/20 px-4 py-3 text-sm text-destructive flex items-center gap-2">
            <AlertCircle className="size-4 shrink-0" />
            {error}
          </div>
        )}

        {!loading && !error && nextPrayer && (
          <>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60 mb-2">Next Prayer</p>
              <div className="flex items-center justify-center gap-3">
                <div className={cn(
                  "size-12 rounded-2xl flex items-center justify-center border",
                  PRAYER_META[nextPrayer.name].iconColor.replace("text-", "bg-") + "/10",
                  PRAYER_META[nextPrayer.name].iconColor.replace("text-", "border-") + "/20",
                )}>
                  <nextPrayer.Icon className={cn("size-6", PRAYER_META[nextPrayer.name].iconColor)} />
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold">{nextPrayer.name}</p>
                  <p className="text-base text-muted-foreground">{nextPrayer.arabicName}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-6 py-2">
              <div>
                <p className="text-4xl font-bold font-mono text-primary tabular-nums">
                  {formatTime12(nextPrayer.time)}
                </p>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="text-center">
                <p className="text-3xl font-bold font-mono tabular-nums">{formatCountdown(adjustedDiff)}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1 justify-center mt-0.5">
                  <Timer className="size-3" /> remaining
                </p>
              </div>
            </div>
          </>
        )}

        {!loading && !error && prayers.length > 0 && (
          <button
            onClick={() => {
              navigator.geolocation?.getCurrentPosition(
                (pos) => fetchByCoords(pos.coords.latitude, pos.coords.longitude, city),
                () => {}
              );
            }}
            className="text-[11px] text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 mx-auto px-3 py-1.5 rounded-lg hover:bg-muted/40"
          >
            <RefreshCw className="size-3" /> Refresh location
          </button>
        )}
      </div>

      {/* All prayers — full-width responsive grid */}
      {!loading && !error && prayers.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Moon className="size-4 text-primary" />
            <span className="text-sm font-semibold">Today's Prayer Times</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {prayers.map((prayer, i) => {
              const isNext = i === nextIdx;
              const isPast = to24hMin(prayer.time) < nowMin && !isNext;
              const PIcon  = prayer.Icon;
              const meta   = PRAYER_META[prayer.name];
              const iconBg  = isNext
                ? "bg-primary-foreground/20"
                : meta.iconColor.replace("text-", "bg-") + "/10";
              const iconCl  = isNext ? "text-primary-foreground" : meta.iconColor;
              return (
                <div
                  key={prayer.name}
                  className={cn(
                    "relative flex flex-col items-center gap-2 rounded-2xl border p-4 text-center transition-all",
                    isNext
                      ? "bg-primary border-primary/30 shadow-md shadow-primary/15 ring-1 ring-primary/25"
                      : isPast
                      ? "border-border/30 bg-muted/10 opacity-40"
                      : "border-border/40 bg-muted/20 hover:bg-muted/40 hover:border-border/60"
                  )}
                >
                  {/* Status dot */}
                  {isNext && (
                    <span className="absolute top-2.5 right-2.5 size-1.5 rounded-full bg-primary-foreground/80 animate-pulse" />
                  )}

                  {/* Icon */}
                  <div className={cn("size-10 rounded-xl flex items-center justify-center shrink-0", iconBg)}>
                    <PIcon className={cn("size-5", iconCl)} />
                  </div>

                  {/* Name */}
                  <div className="space-y-0.5">
                    <p className={cn("text-sm font-bold leading-tight", isNext ? "text-primary-foreground" : "text-foreground")}>
                      {prayer.name}
                    </p>
                    <p className={cn("text-[11px] font-medium", isNext ? "text-primary-foreground/70" : "text-muted-foreground")}>
                      {prayer.arabicName}
                    </p>
                  </div>

                  {/* Time */}
                  <p className={cn(
                    "text-base font-bold font-mono tabular-nums",
                    isNext ? "text-primary-foreground" : meta.iconColor
                  )}>
                    {formatTime12(prayer.time)}
                  </p>

                  {/* Sub-status */}
                  {isNext && (
                    <p className={cn(
                      "text-[10px] font-semibold px-2 py-0.5 rounded-full",
                      "bg-primary-foreground/15 text-primary-foreground/80"
                    )}>
                      in {formatCountdown(adjustedDiff)}
                    </p>
                  )}
                  {isPast && (
                    <p className="text-[10px] text-muted-foreground/50 font-medium">done</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── PRESET LIST ─────────────────────────────────── */
const PRESET_FOOD: Omit<ActivityItem, "id" | "done">[] = [
  { title: "Breakfast",           time: "" },
  { title: "Lunch",               time: "" },
  { title: "Dinner",              time: "" },
  { title: "Morning hydration",   time: "" },
  { title: "Evening supplements", time: "" },
];
const PRESET_TRAINING: Omit<ActivityItem, "id" | "done">[] = [
  { title: "Strength training", time: "" },
  { title: "Morning walk",      time: "" },
  { title: "Cardio / run",      time: "" },
  { title: "Yoga / stretching", time: "" },
  { title: "Sports session",    time: "" },
];
const PRESET_SELFCARE: Omit<ActivityItem, "id" | "done">[] = [
  { title: "Morning grooming", time: "" },
  { title: "Shower / bath",    time: "" },
  { title: "Skincare routine", time: "" },
  { title: "Meditation",       time: "" },
  { title: "Sleep prep",       time: "" },
];

const STORAGE_KEY = "ds-activities";
function loadActivities(key: string): ActivityItem[] {
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY}-${key}`);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}
function saveActivities(key: string, items: ActivityItem[]) {
  try { localStorage.setItem(`${STORAGE_KEY}-${key}`, JSON.stringify(items)); } catch {}
}

/* ── ACTIVITY SECTION ────────────────────────────── */
function ActivitySection({
  icon: Icon, title, color, bgColor, borderColor,
  suggestions, items, presets, onToggle, onAdd,
}: {
  icon: LucideIcon;
  title: string;
  color: string;
  bgColor: string;
  borderColor: string;
  suggestions: ActivitySuggestion[];
  items: ActivityItem[];
  presets: Omit<ActivityItem, "id" | "done">[];
  onToggle: (id: string) => void;
  onAdd: (title: string, time?: string) => void;
}) {
  const [showPresets, setShowPresets] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const done  = items.filter((i) => i.done).length;
  const total = items.length;

  return (
    <div className={cn("rounded-2xl border overflow-visible", borderColor)}>
      {/* Section header */}
      <div className={cn("px-4 py-3 flex items-center gap-3 rounded-t-2xl", bgColor)}>
        <div className={cn("size-8 rounded-xl flex items-center justify-center border", bgColor, borderColor)}>
          <Icon className={cn("size-4", color)} />
        </div>
        <div className="flex-1">
          <p className={cn("text-sm font-bold", color)}>{title}</p>
          <p className="text-[10px] text-muted-foreground">
            {total > 0 ? `${done}/${total} done` : "No activities yet"}
          </p>
        </div>
        {total > 0 && (
          <div className="w-16 h-1.5 rounded-full bg-black/10 overflow-hidden">
            <div
              className={cn("h-full rounded-full transition-all", color.replace("text-", "bg-"))}
              style={{ width: `${(done / total) * 100}%` }}
            />
          </div>
        )}
      </div>

      <div className="p-4 space-y-3 bg-background rounded-b-2xl">
        {/* Smart time suggestions */}
        <div className="space-y-1">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50 flex items-center gap-1 mb-2">
            <Sparkles className="size-3" /> Suggested times
          </p>
          {suggestions.map((s) => {
            const SIcon = s.Icon;
            return (
              <button
                key={s.label}
                onClick={() => onAdd(s.label, s.bestTime)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-muted/60 border border-transparent hover:border-border/40 transition-all text-left group"
              >
                <div className={cn(
                  "size-7 rounded-lg flex items-center justify-center shrink-0 bg-muted/50 group-hover:bg-muted transition-colors"
                )}>
                  <SIcon className="size-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold">{s.label}</p>
                  <p className="text-[10px] text-muted-foreground">{s.bestTime} · {s.reason}</p>
                </div>
                <Plus className="size-3.5 text-muted-foreground/40 group-hover:text-primary shrink-0 transition-colors" />
              </button>
            );
          })}
        </div>

        {/* Added activity items */}
        {items.length > 0 && (
          <div className="space-y-1.5 pt-2 border-t border-border/40">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50 mb-2">Your activities</p>
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => onToggle(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all text-left",
                  item.done
                    ? "bg-emerald-500/8 border-emerald-500/20 opacity-70"
                    : "bg-background border-border/40 hover:border-primary/30 hover:bg-primary/5"
                )}
              >
                <div className={cn(
                  "size-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all",
                  item.done ? "bg-emerald-500 border-emerald-500" : "border-border"
                )}>
                  {item.done && <Check className="size-3 text-white" strokeWidth={3} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn("text-xs font-medium", item.done && "line-through text-muted-foreground")}>
                    {item.title}
                  </p>
                  {item.time && (
                    <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
                      <Clock className="size-2.5" /> {item.time}
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Quick add input + presets */}
        <div className="pt-1 border-t border-border/40 space-y-2">
          <div className="flex items-center gap-2">
            <Input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Add custom activity…"
              className="h-8 text-xs rounded-xl"
              onKeyDown={(e) => {
                if (e.key === "Enter" && customInput.trim()) {
                  onAdd(customInput.trim());
                  setCustomInput("");
                }
              }}
            />
            <button
              onClick={() => setShowPresets((v) => !v)}
              className={cn(
                "shrink-0 h-8 px-2.5 rounded-xl border flex items-center gap-1.5 text-xs font-medium transition-colors whitespace-nowrap",
                showPresets
                  ? "bg-primary/10 border-primary/20 text-primary"
                  : "border-border/50 text-muted-foreground hover:text-foreground hover:bg-muted/60"
              )}
            >
              Quick add
              <ChevronDown className={cn("size-3 transition-transform", showPresets && "rotate-180")} />
            </button>
          </div>

          {/* Preset dropdown — rendered in-flow so it doesn't clip */}
          {showPresets && (
            <div className="rounded-xl border border-border/50 bg-popover shadow-md overflow-hidden">
              {presets
                .filter((p) => !items.find((i) => i.title === p.title))
                .map((p) => (
                  <button
                    key={p.title}
                    onClick={() => { onAdd(p.title); setShowPresets(false); }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs hover:bg-muted/60 text-left transition-colors border-b border-border/30 last:border-0"
                  >
                    <Plus className="size-3 text-muted-foreground/50 shrink-0" />
                    {p.title}
                  </button>
                ))}
              {presets.filter((p) => !items.find((i) => i.title === p.title)).length === 0 && (
                <p className="px-3 py-2 text-xs text-muted-foreground/50 text-center">All presets added</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── DAILY ACTIVITIES PANEL ──────────────────────── */
function DailyActivitiesPanel({ prayers }: { prayers: PrayerTime[] }) {
  const today = toDateStr(new Date());
  const [food,     setFood]     = useState<ActivityItem[]>(() => loadActivities(`${today}-food`));
  const [training, setTraining] = useState<ActivityItem[]>(() => loadActivities(`${today}-training`));
  const [selfCare, setSelfCare] = useState<ActivityItem[]>(() => loadActivities(`${today}-selfcare`));

  const suggestions = getActivitySuggestions(prayers);

  const makeToggle = (
    list: ActivityItem[],
    setList: React.Dispatch<React.SetStateAction<ActivityItem[]>>,
    key: string
  ) => (id: string) => {
    const updated = list.map((i) => i.id === id ? { ...i, done: !i.done } : i);
    setList(updated);
    saveActivities(`${today}-${key}`, updated);
  };

  const makeAdd = (
    list: ActivityItem[],
    setList: React.Dispatch<React.SetStateAction<ActivityItem[]>>,
    key: string
  ) => (title: string, time?: string) => {
    if (list.find((i) => i.title === title)) return;
    const updated = [...list, { id: crypto.randomUUID(), title, done: false, time }];
    setList(updated);
    saveActivities(`${today}-${key}`, updated);
    toast.success(`Added "${title}"`);
  };

  const allTotal = food.length + training.length + selfCare.length;
  const allDone  = [...food, ...training, ...selfCare].filter((i) => i.done).length;
  const pct      = allTotal > 0 ? Math.round((allDone / allTotal) * 100) : 0;

  return (
    <div className="space-y-4">
      {/* Day summary bar — full width */}
      {allTotal > 0 && (
        <div className="rounded-2xl border border-border/50 bg-muted/20 px-5 py-3.5 flex items-center gap-4">
          <div className="size-8 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center shrink-0">
            <Activity className="size-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold">Today's Activities</p>
            <p className="text-xs text-muted-foreground mt-0.5">{allDone} of {allTotal} completed</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-32 h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full rounded-full bg-primary transition-all duration-500" style={{ width: `${pct}%` }} />
            </div>
            <span className="text-sm font-bold text-primary w-9 text-right tabular-nums">{pct}%</span>
          </div>
        </div>
      )}

      {/* Responsive 3-column grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 items-start">
        <ActivitySection
          icon={Utensils} title="Food & Nutrition"
          color="text-amber-600" bgColor="bg-amber-500/5" borderColor="border-amber-500/20"
          suggestions={suggestions.food} items={food} presets={PRESET_FOOD}
          onToggle={makeToggle(food, setFood, "food")}
          onAdd={makeAdd(food, setFood, "food")}
        />
        <ActivitySection
          icon={Dumbbell} title="Training & Sports"
          color="text-blue-600" bgColor="bg-blue-500/5" borderColor="border-blue-500/20"
          suggestions={suggestions.training} items={training} presets={PRESET_TRAINING}
          onToggle={makeToggle(training, setTraining, "training")}
          onAdd={makeAdd(training, setTraining, "training")}
        />
        <ActivitySection
          icon={Bath} title="Self-Care & Hygiene"
          color="text-rose-600" bgColor="bg-rose-500/5" borderColor="border-rose-500/20"
          suggestions={suggestions.selfCare} items={selfCare} presets={PRESET_SELFCARE}
          onToggle={makeToggle(selfCare, setSelfCare, "selfcare")}
          onAdd={makeAdd(selfCare, setSelfCare, "selfcare")}
        />
      </div>
    </div>
  );
}

/* ── MAIN EXPORT ─────────────────────────────────── */
export function ActivitiesTab() {
  const [innerTab, setInnerTab] = useState<InnerTab>("prayer");
  const [prayers, setPrayers] = useState<PrayerTime[]>([]);
  const dateStr = toDateStr(new Date());

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Inner tab bar */}
      <div className="shrink-0 px-4 sm:px-5 pt-3.5 pb-3 border-b border-border/50">
        <div className="flex items-center gap-1 p-1 bg-muted/40 rounded-xl border border-border/50 w-fit">
          <button
            onClick={() => setInnerTab("prayer")}
            className={cn(
              "flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all",
              innerTab === "prayer"
                ? "bg-background text-foreground shadow-sm border border-border/50"
                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
            )}
          >
            <Moon className={cn("size-4", innerTab === "prayer" && "text-indigo-500")} />
            Prayer Times
          </button>
          <button
            onClick={() => setInnerTab("activities")}
            className={cn(
              "flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all",
              innerTab === "activities"
                ? "bg-background text-foreground shadow-sm border border-border/50"
                : "text-muted-foreground hover:text-foreground hover:bg-background/50"
            )}
          >
            <Flame className={cn("size-4", innerTab === "activities" && "text-orange-500")} />
            Daily Activities
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin px-4 sm:px-6 py-4">
        {innerTab === "prayer" && <PrayerPanel key={dateStr} />}
        {innerTab === "activities" && <DailyActivitiesPanel prayers={prayers} />}
      </div>
    </div>
  );
}
