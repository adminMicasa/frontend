import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, timer } from 'rxjs';
import { catchError, retryWhen, delayWhen } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ErrorHandlerService {
    constructor(private http: HttpClient) { }

    handleHttpError<T>(operation = 'operation', retries = 2, delayMs = 400) {
        return (source: Observable<T>): Observable<T> => {
            return source.pipe(
                retryWhen((errors) =>
                    errors.pipe(
                        delayWhen((val, index) => {
                            if (index < retries - 1) {
                                return timer(delayMs);
                            }
                            throw new Error(`Se agotaron los intentos (${retries}) para ${operation}`);
                        })
                    )
                ),
                catchError((error) => {
                    console.error(`${operation} falló: ${error.message}`);
                    return throwError(error);
                })
            );
        };
    }
}
