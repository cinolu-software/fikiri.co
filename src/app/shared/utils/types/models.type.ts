interface IBase {
  id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export interface IBlogCategory extends IBase {
  name: string;
}

export interface ISolution extends IBase {
  name: string;
  description: string;
  slug: string;
  problem_solved: string;
  responses: Record<string, string>;
  reviewer: string;
  status: 'pending' | 'mapped' | 'explored' | 'experimented';
  image: string;
  reviews: IReview[];
  user: IUser;
  call: ICall;
  award: ICall;
}

export interface IPost extends IBase {
  title: string;
  content: string;
  image: string;
  comments: IComment[];
  category: IBlogCategory;
  author: IUser;
}

export interface IComment extends IBase {
  content: string;
  by: IUser;
  post: IPost;
}

export interface IReview extends IBase {
  note: number;
  reviewer: string;
  data: string;
  application: IApplication;
}

export interface IUser extends IBase {
  email: string;
  name: string;
  password: string;
  phone_number: string;
  address: string;
  google_image: string;
  profile: string;
  verified_at: Date;
  outreacher?: string;
  outreach_link?: string;
  applications: IApplication[];
  calls: ICall[];
  published_calls: ICall[];
  posts: IPost[];
  comments: IComment[];
  roles: string[];
  detail: IDetail;
  organisation: IOrganization;
}

export interface IDetail extends IBase {
  bio: string;
  socials: string;
  user: IUser;
}

type FieldType = 'text' | 'select' | 'textarea' | 'number';

export interface Field {
  id: number;
  type: FieldType;
  label: string;
  options: string[];
  required: boolean;
}

export interface IApplication extends IBase {
  responses: JSON;
}

export interface ICall extends IBase {
  name: string;
  slug: string;
  description: string;
  ended_at: Date;
  started_at: Date;
  published_at: Date;
  cover: string;
  solutionsCount: number;
  document: string;
  form: Field[];
  reviewers: string;
  requirements: string;
  author: IUser;
  publisher: IUser;
  solutions: ISolution[];
  awards: ISolution[];
  gallery: IImage[];
}

export interface IImage extends IBase {
  image: string;
}

export interface IOrganization extends IBase {
  name: string;
}

export interface IRole extends IBase {
  name: string;
}
