import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { DecodedAuthToken, IDecodedAuthToken } from '../../models/auth';
import { RoleDTO } from '../../models/role';
import { UserType } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  public authToken$ = new BehaviorSubject<IDecodedAuthToken>(
    this.decodeToken(sessionStorage.getItem('authToken') ?? "") ||
        new DecodedAuthToken(),
);

  constructor(private jwtHelper: JwtHelperService) { }

  public getAuthToken(): Observable<IDecodedAuthToken> {
    return this.authToken$.asObservable();
}

public setAuthToken(token: IDecodedAuthToken): void {
    this.authToken$.next(token);
}

public resetAuthToken(): void {
    this.authToken$.next(new DecodedAuthToken());
}

public decodeToken(token: string): any {
    try {
        return this.jwtHelper.decodeToken<IDecodedAuthToken>(token);
    } catch (error) {
    }
}

public isAdmin(): Observable<boolean> | any {
  return this.getAuthToken().pipe(
      map((user) => user.role && RoleDTO.isAdminRoleType(user.role)),
  );
}

public isLibrarian(): Observable<boolean> | any {
  return this.getAuthToken().pipe(
      map((user) => user.role && RoleDTO.isLibrarianRoleType(user.role)),
  );
}

public isMember(): Observable<boolean>  | any {
  return this.getAuthToken().pipe(
      map((user) => user.role && RoleDTO.isMemberRoleType(user.role)),
  );
}

public isRolesMatch(rolesMatch: UserType[]): Observable<boolean> | any {
  return this.getAuthToken().pipe(
      map(
          (user) =>
              user.role && RoleDTO.isMatchRoleType(user.role, rolesMatch),
      ),
  );
}

public isLoggedInUser(): Observable<boolean> | any {
  return this.getAuthToken().pipe(
      map((user) => user.role && RoleDTO.isRoleType(user.role)),
  );
}

public isSelf(userGuid: number): Observable<boolean> {
  return this.getAuthToken().pipe(
      map((user) => user.nameid === userGuid),
  );
}

public getUserId(): Observable<number> {
  return this.getAuthToken().pipe(map((user) => Number(user.nameid)));
}
}
