import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs'; // Not sure if needed.
import { ServersService } from '../servers.service';

import { CanComponentDeactivate } from './can-deactivate-guard.service';

@Component({
    selector: 'app-edit-server',
    templateUrl: './edit-server.component.html'
})

export class EditServerComponent implements OnInit {
    server: {id: number, name: string, status: string};
    deltaServer: {id: number, name: string, status: string};

    constructor(private serversService: ServersService,
                private route: ActivatedRoute,
                private router: Router) {
    }   

    ngOnInit(){
      const id = +this.route.snapshot.params['id'];
      this.server = this.serversService.getServer(id);

      this.deltaServer = {
          id: this.server.id,
          name: this.server.name,
          status: this.server.status
      }      
    }

    onUpdate(){

    }
}