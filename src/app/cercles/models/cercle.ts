export class Cercle {
  _id?: string;
  name: string;
  hymne?: string;
  address: string;
  description?: string;
  members_ids?: string[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;

  constructor(data: any) {
    this._id = data._id;
    this.name = data.name;
    this.hymne = data.hymne;
    this.address = data.address;
    this.description = data.description;
    this.members_ids = data.members_ids;
    this.createdAt = new Date(data.createdAt);
    this.updatedAt = new Date(data.updatedAt);
    this.deletedAt = data.deletedAt ? new Date(data.deletedAt) : null;
  }
}
