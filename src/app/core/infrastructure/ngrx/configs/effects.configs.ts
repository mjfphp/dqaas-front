import { AuthEffects } from "../../../../features/authentication/application/auth.effects";
import { ProjectsEffects } from "../../../../features/projects/application/projects.effects";

export const effects = [
    AuthEffects,
    ProjectsEffects,
];
