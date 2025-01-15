import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { JWT_TOKEN_KEY } from "../../../domain/constants/storage.constants";
import { LocalStorageServiceInterface } from "../../../../shared/local-storage/domain/services/local-storage.interface";

export const JwtTokenGuard = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const _localStorageServiceInterface = inject(LocalStorageServiceInterface);
    const _router = inject(Router);
    
    // Redirect the user to the login page if no JWT token is found in localStorage
    if(!_localStorageServiceInterface.check(JWT_TOKEN_KEY)) {
        void _router.navigateByUrl('/login');
        return false;
    }

    return true;
}
