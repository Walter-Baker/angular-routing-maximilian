interface IId{
    id: number;
}

function GetById(group: IId[], id: number) {
    const item = group.find(
      (s) => {
        return s.id === id;
      }
    );
    
    return item;
}

function UpdateItemFromValues(obj: any, values: any){
    for (const [key, value] of Object.entries(values)) {
        obj[key] = value;
    }
}

export class ServersService {
  private servers = [
    {
      id: 1,
      name: 'Productionserver',
      status: 'online'
    },
    {
      id: 2,
      name: 'Testserver',
      status: 'offline'
    },
    {
      id: 3,
      name: 'Devserver',
      status: 'offline'
    }
  ];

  getServers() {
    return this.servers;
  }

/*
  getServer(id: number) {
    const server = this.servers.find(
      (s) => {
        return s.id === id;
      }
    );
    return server;
  }
*/

  getServer(id: number) {
    return GetById(this.servers, id)
  }

/*
  updateServer(id: number, serverInfo: {name: string, status: string}) {
    const server = this.servers.find(
      (s) => {
        return s.id === id;
      }
    );
    if (server) {
      server.name = serverInfo.name;
      server.status = serverInfo.status;
    }
  }
*/

  updateServer(id: number, serverInfo: {name: string, status: string}) {
    const server = GetById(this.servers, id);
    UpdateItemFromValues(server, serverInfo);
  }


}
