export type DataObj = {
  siteId: number;
  siteName: string;
  region: string;
  description: string;
  lat: string;
  lng: string;
  date: string;
};

export interface auditP {
  auditLog: DataObj[];
}

export interface formP {
  hideForm: Function;
}
