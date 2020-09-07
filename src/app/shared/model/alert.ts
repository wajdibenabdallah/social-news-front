export enum ALERT_TYPE {
  SUCCESS,
  INFORMATION,
  WARNING,
  ERROR,
}

export interface Alert {
  title: string;
  message: string;
  type: ALERT_TYPE;
}
