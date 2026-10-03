import { Check, Loader2, Lock, LogOut, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { OptionButton } from "@/components/option-button";
import { dataUrlToBase64, resizeImage } from "@/lib/image";
import {
  CARS_IMAGE_DIR,
  CARS_JSON_PATH,
  clearStoredToken,
  getFile,
  getStoredToken,
  isConfigured,
  putBinaryFile,
  putTextFile,
  setStoredToken,
  verifyToken,
} from "@/lib/github-cms";
import type { CarListing } from "@/lib/cars";

const SESSION_KEY = "shaaq_admin_unlocked";
const PASSCODE = import.meta.env.VITE_ADMIN_PASSCODE as string | undefined;

function blankCar(): CarListing {
  return {
    id: crypto.randomUUID(),
    title: "",
    year: "",
    price: "",
    mileage: "",
    description: "",
    images: [],
    status: "in-stock",
    createdAt: new Date().toISOString(),
  };
}

export default function AdminPage() {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem(SESSION_KEY) === "1");

  if (!isConfigured()) {
    return (
      <Screen>
        <p className="eyebrow">Admin</p>
        <h1 className="mt-3 font-display text-3xl">Not configured yet</h1>
        <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
          Set <code>VITE_GITHUB_OWNER</code> and <code>VITE_GITHUB_REPO</code> (see <code>.env.example</code>) and
          rebuild the site before the admin page can read or publish listings.
        </p>
      </Screen>
    );
  }

  if (!unlocked) {
    return <PasscodeGate onUnlock={() => { sessionStorage.setItem(SESSION_KEY, "1"); setUnlocked(true); }} />;
  }

  return <Dashboard />;
}

function Screen({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-5 text-cream">
      <div className="w-full max-w-sm">{children}</div>
    </div>
  );
}

function PasscodeGate({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!PASSCODE) {
      setError(true);
      return;
    }
    if (value === PASSCODE) onUnlock();
    else setError(true);
  }

  return (
    <Screen>
      <span className="grid size-12 place-items-center border border-cream/25"><Lock className="size-5" /></span>
      <h1 className="mt-6 font-display text-3xl">Admin access</h1>
      <p className="mt-3 text-sm leading-6 text-cream/65">
        This gate only hides the page from casual visitors — the passcode ships inside the site's code, so treat it as
        a light deterrent, not real security.
      </p>
      <form onSubmit={submit} className="mt-7 space-y-4">
        <Input
          type="password"
          value={value}
          onChange={(e) => { setValue(e.target.value); setError(false); }}
          placeholder="Passcode"
          className="border-cream/25 bg-transparent text-cream placeholder:text-cream/40"
          autoFocus
        />
        {error && <p className="text-sm text-destructive">That passcode didn't match.</p>}
        <Button type="submit" variant="cream" size="xl" className="w-full">Enter</Button>
      </form>
    </Screen>
  );
}

function Dashboard() {
  const [token, setToken] = useState(() => getStoredToken() ?? "");
  const [tokenValid, setTokenValid] = useState(Boolean(getStoredToken()));
  const [tokenError, setTokenError] = useState<string | null>(null);
  const [checking, setChecking] = useState(false);

  const [cars, setCars] = useState<CarListing[]>([]);
  const [sha, setSha] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    if (tokenValid) void refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenValid]);

  async function connectToken(e: React.FormEvent) {
    e.preventDefault();
    setChecking(true);
    setTokenError(null);
    try {
      await verifyToken(token);
      setStoredToken(token);
      setTokenValid(true);
    } catch (err) {
      setTokenError(err instanceof Error ? err.message : "Couldn't verify that token.");
    } finally {
      setChecking(false);
    }
  }

  async function refresh() {
    setLoading(true);
    try {
      const file = await getFile(CARS_JSON_PATH, token);
      setCars(file ? (JSON.parse(file.content) as CarListing[]) : []);
      setSha(file?.sha);
    } finally {
      setLoading(false);
    }
  }

  function updateCar(id: string, patch: Partial<CarListing>) {
    setCars((current) => current.map((car) => (car.id === id ? { ...car, ...patch } : car)));
  }

  function removeCar(id: string) {
    setCars((current) => current.filter((car) => car.id !== id));
  }

  async function addPhotos(carId: string, files: FileList | null) {
    if (!files || files.length === 0) return;
    const dataUrls = await Promise.all(Array.from(files).map((f) => resizeImage(f)));
    updateCar(carId, {
      images: [...(cars.find((c) => c.id === carId)?.images ?? []), ...dataUrls],
    });
  }

  function removePhoto(carId: string, index: number) {
    const car = cars.find((c) => c.id === carId);
    if (!car) return;
    updateCar(carId, { images: car.images.filter((_, i) => i !== index) });
  }

  async function publish() {
    setPublishing(true);
    setStatus(null);
    try {
      // Upload any newly-added photos that are still data: URLs, replacing
      // them with their committed repo path.
      const finalCars: CarListing[] = [];
      for (const car of cars) {
        const images: string[] = [];
        for (const [index, image] of car.images.entries()) {
          if (image.startsWith("data:")) {
            const path = `${CARS_IMAGE_DIR}/${car.id}-${index}-${Date.now()}.jpg`;
            await putBinaryFile(path, dataUrlToBase64(image), `Add photo for ${car.title || car.id}`, token);
            images.push(`/${path.replace("public/", "")}`);
          } else {
            images.push(image);
          }
        }
        finalCars.push({ ...car, images });
      }

      await putTextFile(
        CARS_JSON_PATH,
        JSON.stringify(finalCars, null, 2) + "\n",
        "Update car listings",
        token,
        sha,
      );
      setStatus("Published. Your host will redeploy shortly, and the gallery also reads this update directly from GitHub in the meantime.");
      await refresh();
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Publish failed.");
    } finally {
      setPublishing(false);
    }
  }

  if (!tokenValid) {
    return (
      <Screen>
        <h1 className="font-display text-3xl">Connect GitHub</h1>
        <p className="mt-3 text-sm leading-6 text-cream/65">
          Paste a GitHub personal access token with write access to this repo. It's kept only in this browser — see
          README.md for how to create a fine-grained token scoped just to this repository.
        </p>
        <form onSubmit={connectToken} className="mt-7 space-y-4">
          <Input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="GitHub token"
            className="border-cream/25 bg-transparent text-cream placeholder:text-cream/40"
          />
          {tokenError && <p className="text-sm text-destructive">{tokenError}</p>}
          <Button type="submit" variant="cream" size="xl" className="w-full" disabled={checking}>
            {checking ? <Loader2 className="animate-spin" /> : "Connect"}
          </Button>
        </form>
      </Screen>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b border-border bg-background/95 px-5 py-4 backdrop-blur sm:px-8">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div>
            <p className="eyebrow">Admin</p>
            <h1 className="font-display text-2xl">Car listings</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => { clearStoredToken(); setTokenValid(false); }}>
              <LogOut className="size-4" /> Disconnect
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
        {loading && <p className="text-sm text-muted-foreground">Loading listings from GitHub…</p>}

        <div className="space-y-6">
          {cars.map((car) => (
            <div key={car.id} className="border border-border bg-background p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="grid flex-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5"><Label>Title</Label><Input value={car.title} onChange={(e) => updateCar(car.id, { title: e.target.value })} placeholder="e.g. 2019 BMW 3 Series 320d M Sport" /></div>
                  <div className="space-y-1.5"><Label>Price</Label><Input value={car.price} onChange={(e) => updateCar(car.id, { price: e.target.value })} placeholder="e.g. £16,995" /></div>
                  <div className="space-y-1.5"><Label>Year</Label><Input value={car.year} onChange={(e) => updateCar(car.id, { year: e.target.value })} placeholder="e.g. 2019" /></div>
                  <div className="space-y-1.5"><Label>Mileage</Label><Input value={car.mileage} onChange={(e) => updateCar(car.id, { mileage: e.target.value })} placeholder="e.g. 42,000 miles" /></div>
                  <div className="space-y-1.5 sm:col-span-2"><Label>Description</Label><Textarea rows={3} value={car.description} onChange={(e) => updateCar(car.id, { description: e.target.value })} /></div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeCar(car.id)} aria-label="Remove listing"><Trash2 className="size-4" /></Button>
              </div>

              <div className="mt-5 flex items-center gap-2">
                <OptionButton label="In stock" selected={car.status === "in-stock"} onClick={() => updateCar(car.id, { status: "in-stock" })} />
                <OptionButton label="Sold" selected={car.status === "sold"} onClick={() => updateCar(car.id, { status: "sold" })} />
              </div>

              <div className="mt-5">
                <Label>Photos</Label>
                <div className="mt-2 flex flex-wrap gap-3">
                  {car.images.map((img, i) => (
                    <div key={i} className="group relative h-20 w-28 overflow-hidden border border-border">
                      <img src={img} alt="" className="h-full w-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removePhoto(car.id, i)}
                        className="absolute inset-0 hidden place-items-center bg-ink/60 text-cream group-hover:grid"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  ))}
                  <label className="option-button grid h-20 w-28 cursor-pointer place-items-center text-center">
                    <Plus className="size-4" />
                    <input type="file" accept="image/*" multiple className="sr-only" onChange={(e) => addPhotos(car.id, e.target.files)} />
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button variant="outline" size="lg" className="mt-6" onClick={() => setCars((c) => [...c, blankCar()])}>
          <Plus className="size-4" /> Add a car
        </Button>

        <div className="mt-10 border-t border-border pt-6">
          {status && (
            <p className="mb-4 flex items-start gap-2 border border-border bg-secondary p-4 text-sm leading-6 text-foreground">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" /> {status}
            </p>
          )}
          <Button variant="trade" size="xl" onClick={publish} disabled={publishing}>
            {publishing ? <><Loader2 className="animate-spin" /> Publishing</> : "Publish to GitHub"}
          </Button>
        </div>
      </main>
    </div>
  );
}
