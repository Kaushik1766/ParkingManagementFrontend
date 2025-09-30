import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";


// inject jwt to auth header
export function AuthInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

  // if (req.url.includes('login') || req.url.includes('signup')) {
  //   return next(req)
  // }

  const token = localStorage.getItem('token')
  if (!token) {
    return next(req)
  }
  else {
    const authReq = req.clone({
      headers: req.headers.set('Authentication', token as string)
    })
    return next(authReq);
  }
}
