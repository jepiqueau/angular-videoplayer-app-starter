import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import * as WebVPPlugin from 'capacitor-video-player';

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
export class HomePage  implements OnInit {
  public bPlatform: boolean = false;
  public aPlatform: boolean = false;
  private _videoPlayer: any;
  private _url: string = null;
  private _mp4: string = "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4";
  //private _hls: string = "https://irtdashreference-i.akamaihd.net/dash/live/901161/keepixo1/playlistBR.m3u8";
  //private _hls: string = "https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8";
  private _hls: string = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";
  //private _mpd: string = "https://irtdashreference-i.akamaihd.net/dash/live/901161/keepixo1/manifestBR.mpd";
  private _mpd: string = "https://bitmovin-a.akamaihd.net/content/MI201109210084_1/mpds/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.mpd";
  private _smooth : string ="https://test.playready.microsoft.com/smoothstreaming/SSWSS720H264/SuperSpeedway_720.ism/manifest";
  private _webm: string = "https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f1/Sintel_movie_4K.webm/Sintel_movie_4K.webm.720p.webm";
  constructor() {

  }
  async ngOnInit() {
    const info = await Device.getInfo();
    if (info.platform === "ios" || info.platform === "android") {
      this._videoPlayer = CapacitorVideoPlayer;
      if (info.platform === "ios") {
        this._url = "public/assets/video/video.mp4";
      } else {
        this._url ="raw/video";
        this.aPlatform = true;
      }
      this.bPlatform = false;
    } else {
      this.bPlatform = true;
      this._videoPlayer = WebVPPlugin.CapacitorVideoPlayer;
      this._url = "assets/video/video.mp4";
    }
  }
  async testVideoPlayerPlugin(vType:string) {
    if (videoFrom === "http") {
      if(vType === "mp4") {
        this._url = this._mp4;
      } else if (vType === "webm") {
        this._url = this._webm;
      } else if (vType === "hls") {
        this._url = this._hls;
      } else if (vType === "mpd") {
        this._url = this._mpd;
      } else if (vType === "smooth") {
        this._url = this._smooth;
/*      } else if (vType === "ytube") {
        this._url = this._ytube;
*/
      } else {
        console.log("Video format not supported");
      }
    }
    if(this._url != null) {
      document.addEventListener('jeepCapVideoPlayerPlay', (e:CustomEvent) => { console.log('Event jeepCapVideoPlayerPlay ', e.detail);}, false);
      document.addEventListener('jeepCapVideoPlayerPause', (e:CustomEvent) => { console.log('Event jeepCapVideoPlayerPause ', e.detail);}, false);
      document.addEventListener('jeepCapVideoPlayerEnded', (e:CustomEvent) => {
         console.log('Event jeepCapVideoPlayerEnded ', e.detail);
        }, false);
      document.addEventListener('jeepCapVideoPlayerExit', (e:CustomEvent) => { 
        console.log('Event jeepCapVideoPlayerExit ', e.detail)
      }, false);
      const res:any  = await this._videoPlayer.initPlayer({mode:"fullscreen",url:this._url,playerId:"fullscreen",componentTag:"app-home"});
      if(!res.result) console.log("Error in setting the videoPlayer");
    }

  }
}
// "http://www.youtube.com/embed/W7qWa52k-nE" does not work