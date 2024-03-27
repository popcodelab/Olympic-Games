import {Participation} from "./Participation";

/*
With Angular the use of interface if often preferred for these reasons :
  - Simplicity  : Simply compiled once without generating JS scripts. It makes it flexible to define the data structures
  without additional runtime
  - Focus on shape, not on the implementation
  - Type control, no logic (prevents runtime error, improve code reliability
  - Performance : Compiled only when generating the artifact. Does not impact the application performances
 */

export interface Olympic {
  id: number;
  country: string;
  participations: Participation[];
}
