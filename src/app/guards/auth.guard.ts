import { ApiService } from './../services/api.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { AlertController, MenuController } from '@ionic/angular';
 
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  constructor(
    private router: Router,
    private api: ApiService,
    private alertCtrl: AlertController,
    private menuCtrl: MenuController
  ) { }
 
  canActivate(): Observable<boolean> {
    return this.api.user.pipe(
      take(1),
      map(user => {
        if (!user) {
          this.menuCtrl.enable(false);
          this.alertCtrl.create({
            header: 'Unauthorized',
            message: 'You are not allowed to access that page.',
            buttons: ['OK']
          }).then(alert => alert.present());
 
          this.router.navigateByUrl('/');
          return false;
        } else {
          this.menuCtrl.enable(true);
          return true;
        }
      })
    )
  }
}