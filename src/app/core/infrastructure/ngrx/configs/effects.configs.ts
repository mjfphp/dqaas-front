import { AuthEffects } from "../../../../features/authentication/application/auth.effects";
import { ProjectsEffects } from "../../../../features/projects/application/projects.effects";
import { UserEffects } from "../../../../features/user/application/user.effects";

export const effects = [
    AuthEffects,
    ProjectsEffects,
    UserEffects,
];
