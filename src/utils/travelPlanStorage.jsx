// Simple localStorage helpers for the travel plan
const STORAGE_KEY = 'travel_plan_v1';

export function getTravelPlan() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveTravelPlan(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function addTravelEntry(entry) {
  const plan = getTravelPlan();
  const newEntry = {
    id: crypto?.randomUUID?.() || String(Date.now()),
    createdAt: new Date().toISOString(),
    ...entry,
  };
  plan.push(newEntry);
  saveTravelPlan(plan);
  return newEntry;
}

export function removeTravelEntry(id) {
  const plan = getTravelPlan().filter((e) => e.id !== id);
  saveTravelPlan(plan);
}

export function updateTravelEntry(id, partial) {
  const plan = getTravelPlan().map((e) => (e.id === id ? { ...e, ...partial } : e));
  saveTravelPlan(plan);
}
