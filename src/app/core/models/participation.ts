/**
 * Defines a participation of a country at the olympic games
 *
 * @Author Pignon Pierre-Olivier
 */
export interface Participation {
  /** @Type {number} : Unique identifier of an edition */
  id: number;
  /** @Type {number} : Olympic game edition */
  year: number;
  /** @Type {string} : City name */
  city: string;
  /** @Type {number} : Medals count */
  medalsCount: number;
  /** @Type {number} : Athletes count */
  athleteCount: number;
}
