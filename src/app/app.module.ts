import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component'; 
// import { MatCardModule} from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// imports: [    RouterModule, LandingPageComponent ];
imports: [    
    RouterModule,
    LandingPageComponent,
    // MatCardModule,
    BrowserModule,
    BrowserAnimationsModule 
];

// @NgModule({  
//     // test
// })

// export class LandingPageComponent { }
export class AppModule { }