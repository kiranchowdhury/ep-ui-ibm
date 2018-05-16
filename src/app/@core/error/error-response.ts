import { HttpErrorResponse } from '@angular/common/http';

export interface ErrorResponse {
    httpError?: HttpErrorResponse,
    code?: string,
    message?: string
}
