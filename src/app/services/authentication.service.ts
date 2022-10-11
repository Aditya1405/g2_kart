import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  authState,
  createUserWithEmailAndPassword,
  updateProfile,
  UserInfo,
  UserCredential,
  user,
} from '@angular/fire/auth';

import { concatMap, from, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  //they are going to return an obeservable of a user or null in case  not logged in
  currentUser$ = authState(this.auth);

  constructor(private auth: Auth) { }

  // signUp(email: string, password: string): Observable<UserCredential> {
  //   return from(createUserWithEmailAndPassword(this.auth, email, password));
  // }
  signUp(name: string, email: string, password: string) {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(
      switchMap(({ user }) => updateProfile(user, { displayName: name }))
    )
  }

  login(email: string, password: string): Observable<any> {
    //this function returns a promise
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  // updateProfile(profileData: Partial<UserInfo>): Observable<any> {
  //   const user = this.auth.currentUser;
  //   return of(user).pipe(
  //     concatMap((user) => {
  //       if (!user) throw new Error('Not authenticated');

  //       return updateProfile(user, profileData);
  //     })
  //   );
  // }

  logout(): Observable<any> {
    return from(this.auth.signOut());
  }
}