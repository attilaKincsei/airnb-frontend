import { Injectable } from '@angular/core';
import {Lodging} from '../../models/lodging.model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {TokenStorageService} from '../auth/token-storage/token-storage.service';
import {InviteForm} from '../../utils/InviteForm';
import {User} from '../../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class LodgingsService {

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  private baseUrl = 'http://localhost:8080/api/lodgings/';

  getLodgingsById(id: number): Observable<Lodging> {
    return this.http.get<Lodging>(this.baseUrl + id.toString());
  }


  addLodgings(lodging: Lodging) {
    return this.http.post<Lodging>(this.baseUrl + this.tokenStorage.getUsername(), lodging);
  }

  updateLodgings(lodging: Lodging) {
    return this.http.put<Lodging>(this.baseUrl + lodging.id, lodging);
  }

  deleteLodgings(id: number) {
    return this.http.delete<string>(this.baseUrl + id);
  }

  sendNewEnvite(invite: InviteForm) {
    return this.http.post<InviteForm>(this.baseUrl + 'add-tenants', invite);
  }

  removeTenants(lodgingsId: number) {
    return this.http.delete(this.baseUrl + lodgingsId + '/removeTenants');
  }
}
