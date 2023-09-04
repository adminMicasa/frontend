import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { AllSelectorsResponse } from "../models/selector.model";
import { ErrorHandlerService } from "./error-handler.service";
import { of } from "rxjs";


@Injectable({
    providedIn: "root",
})
export class SelectorsService {
    constructor(
        private http: HttpClient,
        private errorHandlerService: ErrorHandlerService
    ) { }

    getAllMunicipalities() {
        return this.http.get<AllSelectorsResponse>(
            environment.micasa.urlApi + environment.micasa.endpointMunicipalities
        ).pipe(this.errorHandlerService.handleHttpError('getAllMunicipalities'));
    }

    getAllOccupations() {
        return this.http.get<AllSelectorsResponse>(
            environment.micasa.urlApi + environment.micasa.endpointOccupations
        ).pipe(this.errorHandlerService.handleHttpError('getAllOccupations'));
    }

    getAllSocialNetworks() {
        return this.http.get<AllSelectorsResponse>(
            environment.micasa.urlApi + environment.micasa.endpointSocialNetworks
        ).pipe(this.errorHandlerService.handleHttpError('getAllSocialNetworks'));
    }

    getAllHowKnow() {
        return this.http.get<AllSelectorsResponse>(
            environment.micasa.urlApi + environment.micasa.endpointHowKnow
        ).pipe(this.errorHandlerService.handleHttpError('getAllHowKnow'));
    }

    getAllSexs() {
        return of({ data: [{ id: 'M', name: 'Masculino' }, { id: 'F', name: 'Femenino' }] } as AllSelectorsResponse);
    }
}
