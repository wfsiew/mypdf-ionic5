import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  gender = '?';
  url = '';

  constructor(
    private document: DocumentViewer,
    private file: File,
    private trx: FileTransfer,
    private fileOpener: FileOpener,
    private platform: Platform,
    private http: HttpClient) {}

  onToggleGender() {
    if (this.gender === '?') this.gender = 'male';
    else if (this.gender === 'female') this.gender = 'male';
    else if (this.gender === 'male') this.gender = 'female';
  }

  async showPdf() {
    let path = null;
    if (this.platform.is('ios')) {
      path = this.file.documentsDirectory;
    }

    else {
      path = this.file.dataDirectory;
    }

    try {
      const trx = this.trx.create();
      console.log(path)
      let x = await trx.download('http://192.168.5.241:8000/api/reservation/pdf', path + 'file.pdf');
      let url = x.toURL();
      this.url = url;
      //this.document.viewDocument(url, 'application/pdf', {});
      await this.fileOpener.open(path + 'file.pdf', 'application/pdf');
    }

    catch (err) {
      this.url = err;
    }
  }
}
