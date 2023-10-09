import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from 'src/app/model/team.model';
import { FileService } from 'src/app/services/file.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-file-page',
  templateUrl: './file-page.component.html',
  styleUrls: ['./file-page.component.css']
})
export class FilePageComponent implements OnInit {
  fileName = '';
  message = '';
  selectedFiles?: FileList;
  currentFile?: File;
  currentTeam: Team;

  fileInfos?: Observable<any>;

  constructor(private fileService: FileService,
              private teamService: TeamService) {}

  ngOnInit(): void {
    this.teamService.currentTeam.subscribe(
      res => {
        this.currentTeam = res;
        if (res !== null) {
          this.fileInfos = this.fileService.getFiles(this.currentTeam.id);
        }
      }
    )
  }

  onFileSelected(event: any) {
    this.selectedFiles = event.target.files;
    this.fileName = event.target.files[0].name;
  }

  upload() {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;
        this.fileService.upload(this.currentFile, this.currentTeam.id).subscribe(
          res => {
            console.log(res);
            this.fileInfos = this.fileService.getFiles(this.currentTeam.id);
            console.log(this.fileInfos);
          },
          err => {
            console.log(err);
            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }

            this.currentFile = undefined;
          }
        );
      }
      this.fileName = '';
      this.selectedFiles = undefined;
    }
  }

  deleteFile(fileId: number) {
    this.fileService.deleteFile(fileId).subscribe(
      res => {
        console.log(res);
        this.fileInfos = this.fileService.getFiles(this.currentTeam.id);
      },
      err => {
        console.log(err);
      }
    )
  }
}
