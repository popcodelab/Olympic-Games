/**
This entity is used to pass the summerized olympic data to the chart-titlebar component
 @Interface

 @Author Pignon Pierre-Olivier
 */
export interface CountrySumUp {
  /** @Type {number} : Participations count of a country */
  participations:number;
  /** @Type {number} : Medals count of a country */
  medals:number;
  /** @Type {number} : Athletes count of a country */
  athletes:number;
}