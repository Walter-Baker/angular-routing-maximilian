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
    originalServer: {id: number, name: string, status: string};

    changesSaved : boolean = false;
    allowEdit: boolean = false;

    constructor(private serversService: ServersService,
                private route: ActivatedRoute,
                private router: Router) {
    }   

    ngOnInit(){
      const id = +this.route.snapshot.params['id'];
      this.server = this.serversService.getServer(id);

      this.originalServer = Object.assign(this.originalServer, this.server);

      /*
      this.originalServer = {
          id: this.server.id,
          name: this.server.name,
          status: this.server.status
      }  
      */

      this.route.queryParams
        .subscribe(
          (queryParams: Params) => {
            this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
          }
        );
      this.route.fragment.subscribe();
    }

    onUpdate() {
        this.serversService.updateServer(this.server.id, {name: this.server.name, status: this.server.status});
        this.changesSaved = true;
        this.router.navigate(['../'], {relativeTo: this.route});
    }

    canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
        if (!this.allowEdit) {
          return true;
        }
        if ((this.originalServer.name !== this.server.name || this.originalServer.status !== this.server.status) && !this.changesSaved) {
          return confirm('Do you want to discard the changes?');
        } else {
          return true;
        }
    }

}