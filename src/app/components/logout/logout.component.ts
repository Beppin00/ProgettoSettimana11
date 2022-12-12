import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit,OnChanges {
  user$ = this.authSrv.authSubject.asObservable()
  //this.authSrv.isLoggedIn$ = this.user$.pipe(map(u=>!!u))

  constructor(private router:Router, private authSrv:AuthService) { }

  ngOnInit(): void {
    this.authSrv.authSubject.next(null);
    localStorage.removeItem('UserData');
    localStorage.removeItem('user');
    this.authSrv.logged=false;
    //this.user$.next(null);
    //this.authSrv.isLoggedIn$ =false; //this.authSrv.user$.pipe(map(u=>!!!u))
    //this.authSrv.isLoggedIn$.pipe(map(ob=> ob=false)).subscribe();
    this.router.navigate(['/login'])




  }
 ngOnChanges(){
  this.router.navigate(['/login'])
 }
}
