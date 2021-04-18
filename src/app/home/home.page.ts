import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FullscreenPage } from '../fullscreen/fullscreen.page';
import { Plugins, DeviceInfo } from '@capacitor/core';

const { Device } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  implements OnInit {
  public wPlatform: boolean = false;
  public aPlatform: boolean = false;
  public iPlatform: boolean = false;
  private _info: DeviceInfo = null;
  private _url: string = null;
  private _sturl: string = null;
  private _stlang: string = null;
  private _stoptions: any = null;

//  private _mp4: string = "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4?alt=media&token=a8abafa7-5fd9-4179-be5f-1963a5b60d51";
//  private _mp4st: string = null;
  /* Video with subtitles in spanish*/
  private _mp4: string = "https://brenopolanski.github.io/html5-video-webvtt-example/MIB2.mp4";
  private _mp4st: string = "https://brenopolanski.github.io/html5-video-webvtt-example/MIB2-subtitles-pt-BR.vtt";
  private _mp4stLang: string = "es";
  private _mp4stOptions: any = {backgroundColor:"rgba(0,0,0,0)", fontSize: 18, foregroundColor:"rgba(128,128,0,1)"}
  /* end video with subtitle */
  //private _hls: string = "https://irtdashreference-i.akamaihd.net/dash/live/901161/keepixo1/playlistBR.m3u8";
  //private _hls: string = "https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8";
  private _hls: string = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";
  //private _mpd: string = "https://irtdashreference-i.akamaihd.net/dash/live/901161/keepixo1/manifestBR.mpd";
  private _mpd: string = "https://bitmovin-a.akamaihd.net/content/MI201109210084_1/mpds/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.mpd";
  private _smooth : string ="https://test.playready.microsoft.com/smoothstreaming/SSWSS720H264/SuperSpeedway_720.ism/manifest";
  private _webm: string = "https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f1/Sintel_movie_4K.webm/Sintel_movie_4K.webm.720p.webm";
  private _aws: string = "https://universo-dev-a-m.s3.amazonaws.com/779970/fe774806dbe7ad042c24ce522b7b46594f16c66e";
  //private _ytube: string = "https://www.youtube.com/watch?v=sw6Mg81YMg0";
  //private _appFile: string = "application/files/bigbuckbunny.mp4";
  private _appFile: string = "application/files/jellies.mp4";
  private _appSTFile: string = "application/files/jellies.srt";
  private _appSTFileIos: string = "application/files/jellies.vtt";

//  private _assetIos: string = "public/assets/video/video.mp4";
//  private _assetAndroid: string = "public/assets/video/video.mp4";
//  private _assetWeb: string = "assets/video/video.mp4";
  private _assetIos: string = "public/assets/video/jellies.mp4";
  private _assetAndroid: string = "public/assets/video/jellies.mp4";
  private _assetWeb: string = "assets/video/jellies.mp4";
  private _assetSTIos: string = "public/assets/video/jellies.vtt";
  private _assetSTAndroid: string = "public/assets/video/jellies.srt";
  private _assetSTWeb: string = "assets/video/jellies.srt";
  private _assetSTLang: string = "en";
  private _assetSTOptions: any = {backgroundColor:"rgba(0,0,0,0)", fontSize: 18, foregroundColor:"rgba(255,0,0,1)"}

  private _testApi: boolean = false;

  constructor(public modalCtrl: ModalController) {

  }
  async ngOnInit() {
    this._info = await Device.getInfo();
    if (this._info.platform === "ios" || this._info.platform === "android") {
      if (this._info.platform === "ios") {
        this.iPlatform = true;
      } else {
        this.aPlatform = true;
      }
      this.wPlatform = false;
    } else {
      this.wPlatform = true;
      this.iPlatform = false;
      this.aPlatform = false;
    }
  }
  setApi() {
    this._testApi = !this._testApi;
    console.log('this._testApi ',this._testApi);
  }
  async testVideoPlayerPlugin(vType:string) {
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
    } else if (vType === "aws") {
      this._url = this._aws;
/*    } else if (vType === "ytube") {
      this._url = this._ytube;
*/
    } else if (vType === 'application') {
      this._url = this._appFile;
    } else if (vType === 'internal') {
      this._url = "internal";
    } else if (vType === 'asset' && this.iPlatform) {
      this._url = this._assetIos;
    } else if (vType === 'asset' && this.aPlatform) {
      this._url = this._assetAndroid;
    } else if (vType === 'asset' && this.wPlatform) {
      this._url = this._assetWeb;
    } else {
      console.log("Video format not supported");
    }
    if(this._url === "https://brenopolanski.github.io/html5-video-webvtt-example/MIB2.mp4") {
      this._sturl = this._mp4st;
      this._stlang = this._mp4stLang 
      this._stoptions = this._mp4stOptions;
    } else if (this._url === "application/files/jellies.mp4") {
      if(this.iPlatform) {
        this._sturl = this._appSTFileIos;
      } else {
        this._sturl = this._appSTFile;
      }
      this._stlang = "en";
    } else if( this._url.includes("assets") && this._url.includes("jellies")) {
      if(this.iPlatform) {
        this._sturl = this._assetSTIos;
      } else if (this.aPlatform) {
        this._sturl = this._assetSTAndroid;
      } else if (this.wPlatform) {
        this._sturl = this._assetSTWeb;
      }
      this._stlang = this._assetSTLang; 
      this._stoptions = this._assetSTOptions;

    } else {
      this._sturl = null;
      this._stlang = null;
      this._stoptions = null;
    }
    console.log(`>>> this._url ${this._url}`);
    console.log(`>>> this._sturl ${this._sturl}`);
    console.log(`>>> this._stlang ${this._stlang}`);
    console.log(`>>> this._stoptions ${JSON.stringify(this._stoptions)}`);
    const modal = await this.modalCtrl.create({
      component: FullscreenPage,
      componentProps: {
        'url': this._url,
        'sturl': this._sturl,
        'stlang': this._stlang,
        'stoptions': this._stoptions,
        'testApi': this._testApi,
        'platform': this._info.platform
      },
      swipeToClose: true
    });
    await modal.present();
  
  }

}
// "http://www.youtube.com/embed/W7qWa52k-nE" does not work