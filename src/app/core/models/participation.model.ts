/**
 * Participation details of a country
 *
 * @Author Pignon Pierre-Olivier
 */
export interface ParticipationModel {
  /** @Type {number} : Unique identifier of an edition */
  id: number;
  /** @Type {number} :  */
  year: number;
  /** @Type {string} : City name */
  city: string;
  /** @Type {number} : Medals count */
  medalsCount: number;
  /** @Type {number} : Athletes count */
  athleteCount: number;
}
