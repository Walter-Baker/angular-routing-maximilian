import { GetByFieldValues, GetById, UpdateItemFromValues } from 'ay-array-functions';

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

  getServer(id: number) {
    const query = {id: id};

    let items = GetByFieldValues(this.servers, query );
    console.log(items);

    return items[0];
  }

  updateServer(id: number, serverInfo: {name: string, status: string}) {
    const server = GetById(this.servers, id);
    UpdateItemFromValues(server, serverInfo);
  }

}