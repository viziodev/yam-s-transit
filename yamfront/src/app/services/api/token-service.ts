import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }
  public setLocalStorageToken(auth): void{
    localStorage.setItem('Authorization', JSON.stringify(auth));
  }
  public getLocalStorageToken(){
    const tokenData = JSON.parse(localStorage.getItem('Authorization') as string);
    return tokenData == null ? null : tokenData;
  }
  public setUserData(user: any): void{
    localStorage.setItem('nom', user.nom);
    localStorage.setItem('prenom', user.prenom);
    localStorage.setItem('avatar', user.avatar);
    localStorage.setItem('email', user.email);
    localStorage.setItem('id', user.id);
  }
  public removeLocalStorage(): void{
    localStorage.removeItem('Authorization');
    localStorage.removeItem('usernom');
    localStorage.removeItem('useravatar');
    localStorage.removeItem('userprenom');
    localStorage.removeItem('userEmail');


  }
}
