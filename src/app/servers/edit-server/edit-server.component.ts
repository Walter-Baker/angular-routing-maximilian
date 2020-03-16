import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  originalServer: {id: number, name: string, status: string};

  changesSaved : boolean = false;
  allowEdit: boolean = false;

  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    const id = +this.route.snapshot.params['id']; // Selects the current id.
    this.server = this.serversService.getServer(id); 

    //this.originalServer = Object.assign(this.originalServer, this.server);

    this.originalServer = {
        id: this.server.id,
        name: this.server.name,
        status: this.server.status
    }

    this.route.queryParams
      .subscribe(
        ( queryParams : Params ) => {
            this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
        }
      );
  }

  onUpdate() {
      this.serversService.updateServer(this.server.id, {name: this.originalServer.name, status: this.originalServer.status});
      this.changesSaved = true;
      this.router.navigate(['../'], {relativeTo: this.route});
  }  

}
