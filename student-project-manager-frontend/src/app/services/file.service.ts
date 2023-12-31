import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TeamService } from "./team.service";

@Injectable({ providedIn: 'root' })
export class FileService {
  private baseUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient,
              private teamService: TeamService) {}

  upload(file: File, teamId: number) {
    const formData: FormData = new FormData();

    formData.append('file', file);

    return this.http.post(`${this.baseUrl}teams/${teamId}/files`, formData);
  }

  getFiles(teamId: number) {
    return this.http.get(`${this.baseUrl}teams/${teamId}/files`);
  }

  deleteFile(fileId: number) {
    return this.http.delete(`${this.baseUrl}files/${fileId}`);
  }
}