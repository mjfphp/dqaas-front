import { HttpInterceptorFn } from "@angular/common/http";
import { authHeadersInterceptor } from "../interceptors/auth-headers.interceptor";
import { errorsInterceptor } from "../interceptors/errors.interceptor";
import { apiPrefixInterceptor } from "../interceptors/api-prefix.interceptor";

export const interceptorsFns: HttpInterceptorFn[] = [
	apiPrefixInterceptor,
	authHeadersInterceptor,
	errorsInterceptor,
];
