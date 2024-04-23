export interface IAPIData {
  photos: Photos;
  stat: string;
}

export interface Photos {
  title: string;
  url_s: string | undefined;
  page: number;
  pages: number;
  perpage: number;
  total: number;
  photo: Photo[];
}

export interface Photo {
  id: string;
  owner: string;
  secret: string;
  server: string;
  farm: number;
  title: string;
  ispublic: number;
  isfriend: number;
  isfamily: number;
  url_s: string;
  height_s: number;
  width_s: number;
}
