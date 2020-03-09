import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-edit-server',
    templateUrl: './edit-server.component.html'
})

export class EditServerComponent implements OnInit {
    server: {id: number, name: string, status: string};

    constructor(){}

    ngOnInit(){
        
    }

    onUpdate(){

    }
}