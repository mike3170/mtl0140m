import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Api } from '../core/etc/models/api.model';
import { MtlPurOrdeD } from './mtl-pur-orde-d';
import { MtlPurOrdeM } from './mtl-pur-orde-m';

@Injectable({
	providedIn: 'root'
})
export class Pur0310mService {
	private readonly baseUrl = environment.baseUrl;
	constructor(private http: HttpClient) { }

	insertMast(mast: MtlPurOrdeM): Observable<Api> {
		const url = `${this.baseUrl}/mtlpurordem/insert`;
		return this.http.post<Api>(url, mast);
	}

	insertDetail(detail: MtlPurOrdeD): Observable<Api> {
		const url = `${this.baseUrl}/mtlpurorded/insert`;
		return this.http.post<Api>(url, detail);
	}

	findAllMater(): Observable<Api> {
		const url = `${this.baseUrl}/purorde`;
		return this.http.get<Api>(url);
	}

	findByIdMaster(poNo: string): Observable<Api> {
		const url = `${this.baseUrl}/purorde/${poNo}`;
		return this.http.get<Api>(url);
	}

	findAllDetail(poNo: string): Observable<Api> {
		const url = `${this.baseUrl}/purorde/detail/${poNo}`;
		return this.http.get<Api>(url);
	}

	findOrderDetail(poNo: string): Observable<Api> {
		const url = `${this.baseUrl}/mtlpurorded/${poNo}`;
		return this.http.get<Api>(url);
	}

	findByIdDetail(poNo: string, itemNo: string): Observable<Api> {
		const url = `${this.baseUrl}/mtlpurorded/${poNo}/${itemNo}`;
		return this.http.get<Api>(url);
	}
}
