import {Participation} from "./participation.model";

/**
 * Represents a Country.
 * @interface
 *
 *  @Author Pignon Pierre-Olivier
 */
export interface Country {
  /** @Type {number} : Unique identifier of a country */
  id: number;
  /** @Type {string} : Country name */
  country: string;
  /** @Type {Participation[]} : ParticipationModel details */
  participations: Participation[];
}

