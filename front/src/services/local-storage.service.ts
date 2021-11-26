export class LocalStorageService{
  constructor(){ }

  public static getItem(item : any){
   return localStorage.getItem(item);
  }

  public static setItem(key : string, item: any){
    localStorage.setItem(key, item);
  }

  public static removeItem(key: string){
    localStorage.removeItem(key);
  }
}
