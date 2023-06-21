import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Api } from '../core/etc/models/api.model';
import { BasVenMast } from './basvenmast.model';
@Injectable({
  providedIn: 'root'
})
export class BasvenmastService {
  private readonly baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

	insert(basVenMast: BasVenMast): Observable<Api> {
		const url = `${this.baseUrl}/basvenmast/insert`;		
		return this.http.post<Api>(url, basVenMast);
	}

	update(basVenMast: BasVenMast): Observable<Api> {
		const url = `${this.baseUrl}/basvenmast/update`;
		return this.http.put<Api>(url, basVenMast);
	}

	delete(venNo: String): Observable<Api> {
		const url = `${this.baseUrl}/basvenmast/${venNo}`;
		return this.http.delete<Api>(url);
	}

	findById(venNo: string): Observable<Api> {
		const url = `${this.baseUrl}/basvenmast/${venNo}`;
		return this.http.get<Api>(url);
	}

	codIsExist(kind: string, para: string):Observable<Api> {
		const url = `${this.baseUrl}/codmast/isexist/${kind}/${para}`;		
		return this.http.get<Api>(url);
	}

	getCodeName(kind: string, para: string): Observable<Api> {
		const url = `${this.baseUrl}/codmast/getCodeName/${kind}/${para}`;
		return this.http.get<Api>(url);
	}

	getCstAbbr(cstNo: string): Observable<Api>{
		const url = `${this.baseUrl}/basCstmast/findbyid/${cstNo}`;		
		return this.http.get<Api>(url);
	}
	// 查詢
	query(matrix: string): Observable<Api> {
		const url = `${this.baseUrl}/basvenmast/findwindow/${matrix}`;
		return this.http.get<Api>(url);
	  }	

	findAll(): Observable<Api> {
		const url = `${this.baseUrl}/basvenmast/all`;		
		return this.http.get<Api>(url);
	}  

}
