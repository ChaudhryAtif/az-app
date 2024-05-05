import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cat } from './cat.model';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CatService {
    private apiUrl = `${environment.apiUrl}/cats`;

    constructor(private http: HttpClient) { }

    getAllCats(): Observable<Cat[]> {
        return this.http.get<Cat[]>(this.apiUrl);
    }

    getCatById(id: string): Observable<Cat> {
        return this.http.get<Cat>(`${this.apiUrl}/${id}`);
    }

    addCat(cat: Cat): Observable<Cat> {
        return this.http.post<Cat>(this.apiUrl, cat);
    }

    updateCat(cat: Cat): Observable<Cat> {
        return this.http.put<Cat>(`${this.apiUrl}/${cat.id}`, cat);
    }

    deleteCat(id?: string): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }
}
