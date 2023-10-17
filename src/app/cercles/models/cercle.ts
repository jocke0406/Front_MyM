import { Location } from "src/app/locations/models/location";



export class Cercle {
  _id?: string;
  name: string;
  hymne?: string;
  address?: string;
  description?: string;
  members_ids: string[] | [];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;

  members?: MemberOfCercle[];
  location?: Location[];
  events?: EventsOfCercle[];

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
    if (data.members) {
      this.members = data.members.map((member: any) => new MemberOfCercle(member));
    }
  }
}
export class MemberOfCercle {
  _id?: string;
  pseudo: string;
  email: string;
  name?: {
    first: string;
    last: string;
  };
  dateOfBirth: Date;
  study?: {
    studyField: string;
    year: number;
  }
  phone?: string;
  photo?: string;
  cap?: {
    hasCap: boolean
  }

  constructor(data: any) {
    this.pseudo = data.pseudo;
    this.email = data.email;
    this.name = {
      first: data.name.first,
      last: data.name.last
    };
    this.dateOfBirth = new Date(data.dateOfBirth);
    this.study = {
      studyField: data.study.studyField,
      year: data.study.year
    };
    this.phone = data.phone;
    this.photo = data.photo;
    this.cap = {
      hasCap: data.hasCap
    };
  }
}
export class EventsOfCercle {
  _id?: string;
  name: string;
  startAt: Date;
  endAt: Date;
  description?: string;
  participants_ids?: string[];

  constructor(data: any) {
    this.name = data.name;
    this.startAt = new Date(data.startAt);
    this.endAt = new Date(data.endAt);
    this.description = data.description;
    this.participants_ids = data.participants_ids;
  }
}
