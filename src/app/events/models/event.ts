import { Location } from "src/app/locations/models/location";

export class Event {
  _id: string;
  name: string;
  startAt: Date;
  endAt: Date;
  participants_ids?: string[];
  description?: string;
  location?: Location[];
  organizer?: Organizer[];
  participants?: Participant[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null

  constructor(data: any) {
    this._id = data._id;
    this.name = data.name;
    this.startAt = new Date(data.startAt);
    this.endAt = new Date(data.endAt);
    this.participants_ids = data.participants_ids
    this.description = data.description;
    this.location = data.location;
    this.organizer = data.organizer;
    this.participants = data.participants.map((participant: any) => new Participant(participant));
    this.createdAt = new Date(data.createdAt);
    this.updatedAt = new Date(data.updatedAt);
    this.deletedAt = data.deletedAt ? new Date(data.deletedAt) : null;
  }
}


export class Address {
  street: string;
  nbr: number;
  postCode: string;
  city: string;
  district: string;
  country: string;

  constructor(data: any) {
    this.street = data.street;
    this.nbr = data.nbr;
    this.postCode = data.postCode;
    this.city = data.city;
    this.district = data.district;
    this.country = data.country;
  }
}

export class Organizer {
  _id: string;
  name: string;

  constructor(data: any) {
    this._id = data._id;
    this.name = data.name;
  }
}

export class Participant {
  _id: string;
  name: {
    first: string;
    last: string;
  };
  pseudo: string;

  constructor(data: any) {
    this._id = data._id;
    this.name = {
      first: data.name.first,
      last: data.name.last
    };
    this.pseudo = data.pseudo;
  }
}
