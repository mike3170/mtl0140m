import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from 'src/app/core/etc/models/api.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class BasCstMastSearchService {
	readonly baseUrl = environment.baseUrl;

	constructor(private http: HttpClient) { }

	findAll(): Observable<Api> {
		const url = `${this.baseUrl}/basCstmast/all`;
		return this.http.get<Api>(url);
	}

}
