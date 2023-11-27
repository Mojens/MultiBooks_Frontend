import {BusinessTeamResponse} from "../BusinessTeam/businessTeam.models";

export interface UserResponse{
  email: string;
  created: Date;
  ownedTeams: BusinessTeamResponse[];
}
