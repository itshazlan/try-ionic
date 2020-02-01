import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { IonicStorageModule, Storage } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';

import { TOKEN_KEY } from './services/api.service';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';

import { MenuItemComponent } from './components/menu-item/menu-item.component';

export function jwtOptionsFactory(storage) {
  return {
    tokenGetter: () => {
      return storage.get(TOKEN_KEY);
    },
    whitelistedDomains: ['localhost:5000', 'holidaygift.herokuapp.com', '192.168.0.116:5000'] // Add your Heroku URL in here!
  }
}
@NgModule({
  declarations: [
    AppComponent,
    MenuItemComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    HttpClientModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [Storage]
      }
    })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
