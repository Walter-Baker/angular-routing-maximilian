import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ServersService } from '../servers.service';
import { CanComponentDeactivate } from './can-deactivate-guard.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName: string = '';
  serverStatus: string = '';
  allowEdit: boolean = false;
  changesSaved: boolean = false;

  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);
    this.route.queryParams
      .subscribe(
        (queryParams: Params) => {
          this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
        }
      );
    this.route.fragment.subscribe();
    const id = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(id);
    // Subscribe route params to update the id if params change
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  IsItemModified(): boolean{
    return this.serverName !== this.server.name || this.serverStatus !== this.server.status;
  }

/* Original
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
      return true;
    }
    if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved) {
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }
  }
*/

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    let IsItemModified = this.IsItemModified();
    // Original

    return this.CanDeactivateForEditItem(
      this.allowEdit,
      "Discard changes?",
      IsItemModified,
      this.changesSaved
    );


    // Mock    
    /*
    return this.CanDeactivateForEditItemMock(
      this.IsItemModified
    );
    */
  }


  CanDeactivateForEditItem(
              allowEdit: boolean | null,
              navAwayConfirmMessage: string | null,
              itemIsModified: boolean | null,
              itemChangesIsSaved: boolean | null
  ):
    Observable<boolean> | Promise<boolean> | boolean
  {
      if (allowEdit == false) {
          return true;
      }

      if (itemIsModified == true && (itemChangesIsSaved == false)) {
          
          if(navAwayConfirmMessage == null){
              return confirm('Do you want to discard the changes?');
          } else {
              return confirm(navAwayConfirmMessage);    
          }
      } else {
          return true;
      }
  }

  CanDeactivateForEditItemMock(
              itemIsModified: () => boolean | null,
  ):
    Observable<boolean> | Promise<boolean> | boolean
  {
      let IsItemModified = itemIsModified();

      if (IsItemModified == true) {
          
        return confirm('Do you want to discard the changes?');
      } else {
          return true;
      }
  }

}
