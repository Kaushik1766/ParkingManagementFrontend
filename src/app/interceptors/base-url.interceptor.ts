import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";



// prepend base uyrl
export function BaseUrlInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const apiReq = req.clone({ url: `https://b261eqld84.execute-api.ap-south-1.amazonaws.com/v1/${req.url}` })
  return next(apiReq);
}
