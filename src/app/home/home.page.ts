import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import * as CapacitorVPPlugin from 'capacitor-video-player';

const { CapacitorVideoPlayer, Device } = Plugins;
const videoFrom:string = "http";
/*  comment line above and uncomment line below
    to use videos from assets
*/
//const videoFrom:string = "assets";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  platform:boolean;
  private _videoPlayer: any;
  private _url: string;
  constructor() {

  }
  async ngAfterViewInit() {
    const info = await Device.getInfo();
    if (info.platform === "ios" || info.platform === "android") {
      this._videoPlayer = CapacitorVideoPlayer;
      if (info.platform === "ios") {
        this._url = "public/assets/video/video.mp4"
      } else {
        this._url ="raw/video"
      }
      this.platform = false;
    } else {
      this.platform = true;
      this._videoPlayer = CapacitorVPPlugin.CapacitorVideoPlayer;
      this._url = "assets/video/video.mp4";
    }
    if (videoFrom === "http") {
      this._url = "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4";
    }
  }
  async testPlugin(){ 
    const info = await Device.getInfo();     
    document.addEventListener('jeepCapVideoPlayerPlay', (e:CustomEvent) => { console.log('Event jeepCapVideoPlayerPlay ', e.detail)}, false);
    document.addEventListener('jeepCapVideoPlayerPause', (e:CustomEvent) => { console.log('Event jeepCapVideoPlayerPause ', e.detail)}, false);
    document.addEventListener('jeepCapVideoPlayerEnded', (e:CustomEvent) => { console.log('Event jeepCapVideoPlayerEnded ', e.detail)}, false);
    const res:any  = await this._videoPlayer.initPlayer({mode:"fullscreen",url:this._url});
  }
}
// "https://clips.vorwaerts-gmbh.de/VfE_html5.mp4"
// "http://www.youtube.com/embed/W7qWa52k-nE" does not work