import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { AllSelectorsResponse } from "../models/selector.model";
import { of } from "rxjs";
import { delay, retry } from "rxjs/operators";
import { AllStepResponse } from "../models/step.model";


@Injectable({
  providedIn: "root",
})
export class SelectorsService {
  constructor(
    private http: HttpClient,
  ) { }

  getAllMunicipalities() {
    return this.http.get<AllSelectorsResponse>(
      environment.micasa.urlApi + environment.micasa.endpointMunicipalities
    ).pipe(
      retry(2),
      delay(500),
    );
  }

  getAllOccupations() {
    return this.http.get<AllSelectorsResponse>(
      environment.micasa.urlApi + environment.micasa.endpointOccupations
    ).pipe(
      retry(2),
      delay(500),
    );
  }

  getAllSocialNetworks() {
    return this.http.get<AllSelectorsResponse>(
      environment.micasa.urlApi + environment.micasa.endpointSocialNetworks
    ).pipe(
      retry(2),
      delay(500),
    );
  }

  getAllHowKnow() {
    return this.http.get<AllSelectorsResponse>(
      environment.micasa.urlApi + environment.micasa.endpointHowKnow
    ).pipe(
      retry(2),
      delay(500),
    );
  }

  getAllSexs() {
    return of({ data: [{ id: 'M', name: 'Masculino' }, { id: 'F', name: 'Femenino' }] } as AllSelectorsResponse);
  }

  getAllSteps() {
    return this.http.get<AllStepResponse>(
      environment.micasa.urlApi + environment.micasa.endpointSteps
    ).pipe(
      retry(2),
      delay(500),
    );
  }
}
