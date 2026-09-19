/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Calculates experience duration starting from a specific base date.
 * Automatically updates every month as real time progresses!
 *
 * Defaults to 3 months prior to current date (e.g. ~June 2026),
 * ensuring it dynamically increments month-by-month.
 */
export function getAutoUpdatedExperience(
  customOverride?: string,
  baseStartDate: string = '2026-06-15'
): string {
  // If user typed a custom text in edit mode and it's not the default "3 Months" / "3+ Years", respect custom input
  if (customOverride && customOverride !== '3 Months' && customOverride !== '3+ Years' && customOverride !== '3+ Months') {
    return customOverride;
  }

  const start = new Date(baseStartDate);
  const now = new Date();

  let months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
  if (now.getDate() < start.getDate()) {
    months--;
  }

  // Ensure minimum is 3 months
  if (months < 1) months = 3;

  if (months < 12) {
    return `${months} Months`;
  }

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (remainingMonths === 0) {
    return `${years}+ Years`;
  }
  return `${years}y ${remainingMonths}m`;
}
