/**
 * Defines a participation of a country at the olympic games
 * @interface
 *
 * @author Pignon Pierre-Olivier
 *
 * @version 1.0
 */
export interface Participation {
  /**
   * Represents the unique identifier for a Participation.
   *
   * @type {number}
   */
  id: number;
  /**
   * Represents an Olympic game edition
   *
   * @type {number}
   */
  year: number;
  /**
   * Represents the name of a city.
   *
   * @type {string} City
   */
  city: string;
  /**
   * The number of medals won.
   *
   * @type {number}
   */
  medalsCount: number;
  /**
   * The number of athletes.
   *
   * @type {number}
   */
  athleteCount: number;
}
