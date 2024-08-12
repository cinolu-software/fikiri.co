export interface IEvent {
  id: number;
  name: string;
  started_at: Date;
  ended_at: Date;
  description: string;
  created_at: Date;
  updated_at: Date;
  images: IImage[];
  solutions?: ISolution[];
  thematics: IThematic[];
}

export interface IRole {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
  users?: IUser[];
}

export interface ISolution {
  id: number;
  name: string;
  video_link: string;
  image_link: string;
  description: string;
  targeted_problem: string;
  created_at: Date;
  updated_at: Date;
  call: IEvent;
  status: IStatus;
  thematic: IThematic;
  user: IUser;
  challenges: IChallenge[];
  images: IImage[];
}

export interface IImage {
  id: number;
  image_link: string;
  created_at: Date;
  updated_at: Date;
}

export interface IStatus {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface IThematic {
  id: number;
  name: string;
  odds: string;
  created_at: Date;
  updated_at: Date;
  solutions: ISolution[];
  calls: IEvent[];
  challenges: IChallenge[];
}

export interface IChallenge {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
  solutions: ISolution[];
  thematics: IThematic[];
}

export interface IUser {
  id: number;
  email: string;
  name: string;
  password: string;
  phone_number: string;
  address: string;
  token: string;
  google_image: string;
  profile: string;
  created_at: Date;
  updated_at: Date;
  solutions: ISolution[];
  roles: IRole[];
}
