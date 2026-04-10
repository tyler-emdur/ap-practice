import { AP_WORLD } from "./ap-world";
import { AP_CSP } from "./ap-csp";
import { AP_PRECALC } from "./ap-precalc";

export { AP_WORLD, AP_CSP, AP_PRECALC };

export const SUBJECTS = [AP_WORLD, AP_CSP, AP_PRECALC];

export function getSubject(id: string) {
  return SUBJECTS.find((s) => s.id === id) ?? null;
}
