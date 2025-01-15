import { HttpInterceptorFn } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";

export const apiPrefixInterceptor: HttpInterceptorFn = (req, next) => {

  // Check if the URL starts with '/api'
  if (req.url.startsWith('/api')) {

    // Clone the request and prepend the base API URL
    const apiReq = req.clone({
      url: `${environment.apiUrl}${req.url}`,
    });

    return next(apiReq);
    
  }

  // Pass through if URL does not start with '/api'
  return next(req);
  
}
