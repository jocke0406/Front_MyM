export class Location {
  _id: string;
  name: string;
  address: Address;
  geolocalisation?: Geolocalisation;
  eventsId: string[];
  eventsByLocation?: EventByLocation[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;

  constructor(data: any) {
    this._id = data._id;
    this.name = data.name;
    this.address = new Address(data.address);
    this.eventsId = data.eventsId;
    if (data.geolocalisation) {
      this.geolocalisation = new Geolocalisation(data.geolocalisation);
    }
    if (data.eventsByLocation) {
      this.eventsByLocation = data.eventsByLocation.map(
        (event: any) => new EventByLocation(event)
      );
    }
    this.createdAt = new Date(data.createdAt);
    this.updatedAt = new Date(data.updatedAt);
    this.deletedAt = data.deletedAt ? new Date(data.deletedAt) : null;
  }
}
export class Address {
  street: string;
  nbr?: number;
  box?: string;
  postCode: string;
  city: string;
  district?: string;
  country?: string;

  constructor(data: any) {
    this.street = data.street;
    this.nbr = data.nbr;
    this.box = data.box;
    this.postCode = data.postCode;
    this.city = data.city;
    this.district = data.district;
    this.country = data.country;
  }
}
export class Geolocalisation {
  latitude: number;
  longitude: number;
  precision?: number;

  constructor(data: any) {
    this.latitude = data.latitude;
    this.longitude = data.longitude;
    this.precision = data.precision;
  }
}
export class EventByLocation {
  name: string;
  startAt: Date;
  endAt: Date;
  organizer: string;
  participants_ids?: string[];
  participants?: Participant[];

  constructor(data: any) {
    this.name = data.name;
    this.startAt = new Date(data.startAt);
    this.endAt = new Date(data.endAt);
    this.organizer = data.organizer;
    this.participants_ids = data.participants_ids;
    if (data.participants) {
      this.participants = data.participants.map(
        (participant: any) => new Participant(participant)
      );
    }
  }
}

export class Participant {
  _id: string;
  pseudo: string;

  constructor(data: any) {
    this._id = data._id;
    this.pseudo = data.pseudo;
  }
}
