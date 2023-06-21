import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Api } from '../core/etc/models/api.model';
import { MtlMast } from './mtlmast.model';

@Injectable({
	providedIn: 'root'
})
export class MtlMastService {
	private readonly baseUrl = environment.baseUrl;
	constructor(private http: HttpClient) { }

	insert(mtlmast: MtlMast): Observable<Api> {
		const url = `${this.baseUrl}/mtlmast/insert`;
		return this.http.post<Api>(url, mtlmast);
	}

	update(mtlmast: MtlMast): Observable<Api> {
		const url = `${this.baseUrl}/mtlmast/update`;
		return this.http.put<Api>(url, mtlmast);
	}

	delete(mtlNo: String): Observable<Api> {
		const url = `${this.baseUrl}/mtlmast/${mtlNo}`;
		return this.http.delete<Api>(url);
	}

	findById(mtlNo: string): Observable<Api> {
		const url = `${this.baseUrl}/mtlmast/${mtlNo}`;
		return this.http.get<Api>(url);
	}

	findMtlNo1ByID(mtlNo1: string): Observable<Api> {
		const url = `${this.baseUrl}/mtlknd1/${mtlNo1}`;
		console.log(url);
		
		return this.http.get<Api>(url);
	}

	mtlNo1IsExist(mtlNo1: string): Observable<Api> {
		const url = `${this.baseUrl}/mtlknd1/isexist/${mtlNo1}`;
		return this.http.get<Api>(url);
	}

	findMtlNo2ByID(mtlNo1: string, mtlNo2: string): Observable<Api> {
		const url = `${this.baseUrl}/mtlknd2/${mtlNo1}/${mtlNo2}`;
		
		return this.http.get<Api>(url);
	}

	mtlNo2IsExist(mtlNo1: string, mtlNo2: String): Observable<Api> {
		const url = `${this.baseUrl}/mtlknd2/isexist/${mtlNo1}/${mtlNo2}`;
		return this.http.get<Api>(url);
	}	

	unitIsExist(para: string):Observable<Api> {
		const url = `${this.baseUrl}/codmast/isexist/MUNT/${para}`;
		
		return this.http.get<Api>(url);
	}
	// 查詢
	query(matrix: string): Observable<Api> {
		const url = `${this.baseUrl}/mtlmast/findwindow/${matrix}`;
		return this.http.get<Api>(url);
	  }	

	findAll(): Observable<Api> {
		const url = `${this.baseUrl}/mtlmast/all`;
		return this.http.get<Api>(url);
	}
}
