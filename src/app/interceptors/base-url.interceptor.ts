import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

const dev = "http://localhost:8000/";
const prod = "https://1337park-alb.kaushiksaha.me/";


// prepend base uyrl
export function BaseUrlInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const apiReq = req.clone({ url: `${dev}${req.url}` })
  return next(apiReq);
}
