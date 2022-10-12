import { Injectable, OnInit } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  authState,
  createUserWithEmailAndPassword,
  updateProfile,
  UserInfo,
  UserCredential,
  user,
  User,
} from '@angular/fire/auth';

import { concatMap, from, Observable, of, switchMap } from 'rxjs';
import { ApiService } from '../shared/api.service';
import { UserModel } from '../userDataModel';

@Injectable({
  providedIn: 'root',
})

export class AuthService implements OnInit {
  //they are going to return an obeservable of a user or null in case  not logged in
  currentUser$ = authState(this.auth);

  //get user details for profile and mart
  userDataModel: UserModel = new UserModel();
  user$: Observable<User | null> | undefined
  email?: string = "";
  //


  constructor(private auth: Auth, private api: ApiService) { }
  ngOnInit() {
    const cusObserve = new Observable(o => {
      o.next(this.userDataModel);
    })
    cusObserve.subscribe({
      next(value) {
        console.log("new = " + value);
      },
    })
  }

  //
  getUserDetail() {
    this.user$ = this.currentUser$;
    this.user$.subscribe(
      (v) => {
        this.email = JSON.stringify(v?.email);
        console.log("profile" + v?.email)
        //this.getUserDetail(this.email);
        //this.userDataModel=this.authService.getUserDetail();
        this.api.get(this.email).subscribe({
          next: (v) => {
            //console.log("profile = " + JSON.parse(v));
            this.userDataModel = v[0];
            console.log("success= " + this.userDataModel.name);
            //works
          },
          error: (e) => console.error("failed"),
          complete: () => console.info('complete')
        });
      })
    //add email to get as aparam for get id
    console.log("success outside= " + this.userDataModel.name);
    return this.userDataModel;
  }
  //
  // signUp(email: string, password: string): Observable<UserCredential> {
  //   return from(createUserWithEmailAndPassword(this.auth, email, password));
  // }
  signUp(name: string, email: string, password: string) {
    return from(
      createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(
      //photoURL:
      switchMap(({ user }) => updateProfile(user, { displayName: name, }))
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