import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MusicPlayerModule } from './music-player/music-player.module';

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, FormsModule, MusicPlayerModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
