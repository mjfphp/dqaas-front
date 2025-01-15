import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { LocalStorageServiceInterface } from "../../../../shared/local-storage/domain/services/local-storage.interface";
import { JWT_TOKEN_KEY } from "../../../domain/constants/storage.constants";

export const LoginGuard = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

    const _localStorageServiceInterface = inject(LocalStorageServiceInterface);
    const _router = inject(Router);
    
    // Redirect the user to the dashboard page if the JWT token is found in localStorage
    if(_localStorageServiceInterface.check(JWT_TOKEN_KEY)) {
        void _router.navigateByUrl('/');
        return false;
    }

    return true;

}
