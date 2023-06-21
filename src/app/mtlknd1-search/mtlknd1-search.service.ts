import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from 'src/app/core/etc/models/api.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class MtlKnd1SearchService {
	readonly baseUrl = environment.baseUrl;

	constructor(private http: HttpClient) { }

	findAll(): Observable<Api> {
		const url = `${this.baseUrl}/mtlknd1/all`;
		return this.http.get<Api>(url);
	}

	// 查詢
	query(matrix: string): Observable<Api> {
		const url = `${this.baseUrl}/codmast/query/params${matrix}`;
		return this.http.get<Api>(url);
	}


}
