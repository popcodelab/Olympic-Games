import {Participation} from "./participation.model";

/**
 * Represents a Country.
 * @interface
 *
 * @author Pignon Pierre-Olivier
 *
 * @version 1.0
 */
export interface Country {
  /**
   * Represents the identifier for a specific entity.
   *
   * @type {number}
   */
  id: number;
  /**
   * Represents the country name
   *
   * @type {string}
   */
  country: string;
  /**
   * Represents an array of Participation objects.
   *
   * @typedef {Participation[]} participations
   */
  participations: Participation[];
}

