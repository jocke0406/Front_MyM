export class User {
  _id: string;
  name: {
    first: string;
    last: string;
  };
  pseudo: string;
  email: string;
  role: string;
  address?: Address;
  password?: string;
  confirmPassword?: string;
  dateOfBirth: Date;
  study?: Study;
  phone?: string;
  photo: string;
  cap?: Cap;
  student_association?: StudentAssociation;
  friends: string[];
  cercle: string | null = null;
  participations: string[] | null = null;
  geolocalisation?: Geolocalisation;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  isFriend?: boolean = false;

  constructor(data: any) {
    this._id = data._id;
    this.name = data.name;
    this.pseudo = data.pseudo;
    this.email = data.email;
    this.role = data.role || 'user';
    this.address = new Address(data.address);
    this.dateOfBirth = new Date(data.dateOfBirth);
    this.study = new Study(data.study);
    this.photo = data.photo || '/images/imageDefaultUser.jpg';
    this.cap = new Cap(data.cap);
    if (data.student_association) {
      this.student_association = new StudentAssociation(
        data.student_association
      );
    }
    this.friends = data.friends || [];
    if (data.geolocalisation) {
      this.geolocalisation = new Geolocalisation(data.geolocalisation);
    }
  }
}

export class Address {
  street?: string;
  nbr?: number;
  box?: string;
  postCode?: string;
  city?: string;
  country?: string;

  constructor(data: any) {
    Object.assign(this, data);
  }
}

export class Study {
  studyField?: string;
  year?: number;

  constructor(data: any) {
    Object.assign(this, data);
  }
}

export class Cap {
  hasCap?: boolean;
  provider?: string;
  deliveryDate?: Date;
  goldStars?: number;
  silverStars?: number | null;
  comments?: string;

  constructor(data: any) {
    Object.assign(this, data);
  }
}

export class StudentAssociation {
  member?: boolean;
  association_id?: string;
  function?: string;

  constructor(data: any) {
    Object.assign(this, data);
  }
}

export class Geolocalisation {
  latitude?: number;
  longitude?: number;
  precision?: number;

  constructor(data: any) {
    Object.assign(this, data);
  }
}
