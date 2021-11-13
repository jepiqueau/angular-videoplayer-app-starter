import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FullscreenPage } from '../fullscreen/fullscreen.page';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public wPlatform = false;
  public aPlatform = false;
  public iPlatform = false;
  private url: string = null;
  private sturl: string = null;
  private stlang: string = null;
  private stoptions: any = null;
  private platform: string = null;

  // eslint-disable-next-line max-len
  //private mp4 = 'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4?alt=media&token=a8abafa7-5fd9-4179-be5f-1963a5b60d51';
//  private mp4st: string = null;
  /* Video with subtitles in spanish*/
  private mp4 = 'https://brenopolanski.github.io/html5-video-webvtt-example/MIB2.mp4';
  private mp4st = 'https://brenopolanski.github.io/html5-video-webvtt-example/MIB2-subtitles-pt-BR.vtt';
  private mp4stLang = 'es';
  private mp4stOptions: any = {backgroundColor:'rgba(0,0,0,0)', fontSize: 18, foregroundColor:'rgba(128,128,0,1)'};
  /* end video with subtitle */
  //private hls = 'https://irtdashreference-i.akamaihd.net/dash/live/901161/keepixo1/playlistBR.m3u8';
  //private hls = 'https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8';
  private hls = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';
  //private mpd = 'https://irtdashreference-i.akamaihd.net/dash/live/901161/keepixo1/manifestBR.mpd';
  private mpd = 'https://bitmovin-a.akamaihd.net/content/MI201109210084_1/mpds/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.mpd';
  private smooth ='https://test.playready.microsoft.com/smoothstreaming/SSWSS720H264/SuperSpeedway_720.ism/manifest';
  private webm = 'https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f1/Sintel_movie_4K.webm/Sintel_movie_4K.webm.720p.webm';
  private aws = 'https://universo-dev-a-m.s3.amazonaws.com/779970/fe774806dbe7ad042c24ce522b7b46594f16c66e';
  //private ytube = 'https://www.youtube.com/watch?v=sw6Mg81YMg0';
  //private appFile = 'application/files/bigbuckbunny.mp4';
  private appFile = 'application/files/OTHER/FOLDERS/jellies.mp4';
  private appSTFile = 'application/files/OTHER/FOLDERS/jellies.srt';
  private appSTFileIos = 'application/files/OTHER/FOLDERS/jellies.vtt';

//  private assetIos = 'public/assets/video/video.mp4';
//  private assetAndroid = 'public/assets/video/video.mp4';
//  private assetWeb = 'assets/video/video.mp4';
  private assetIos = 'public/assets/video/jellies.mp4';
  private assetAndroid = 'public/assets/video/jellies.mp4';
  private assetWeb = 'assets/video/jellies.mp4';
  private assetSTIos = 'public/assets/video/jellies.vtt';
  private assetSTAndroid = 'public/assets/video/jellies.srt';
  private assetSTWeb = 'assets/video/jellies.srt';
  private assetSTLang = 'en';
  private assetSTOptions: any = {backgroundColor:'rgba(0,0,0,0)', fontSize: 18, foregroundColor:'rgba(255,0,0,1)'};
  private dcim = 'file:///sdcard/DCIM/Camera/video.mp4';
  private extSdCard = 'file:///storage/extSdCard/DCIM/Camera/jellies.mp4';
  private testApi = false;

  constructor(public modalCtrl: ModalController) {}

  ngOnInit(): void {
    this.platform = Capacitor.getPlatform();
    console.log(`$$$ platform: ${this.platform}`);
    if (this.platform === 'ios' || this.platform === 'android') {
      if (this.platform === 'ios') {
        this.iPlatform = true;
        this.aPlatform = false;
      } else {
        this.iPlatform = false;
        this.aPlatform = true;
      }
      this.wPlatform = false;
    } else {
      this.wPlatform = true;
      this.iPlatform = false;
      this.aPlatform = false;
    }
    console.log(`$$$ iPlatform: ${this.iPlatform}`);
    console.log(`$$$ aPlatform: ${this.aPlatform}`);
    console.log(`$$$ wPlatform: ${this.wPlatform}`);

  }
  setApi() {
    this.testApi = !this.testApi;
    console.log('this.testApi ',this.testApi);
  }
  async testVideoPlayerPlugin(vType: string) {
    if(vType === 'mp4') {
      this.url = this.mp4;
    } else if (vType === 'webm') {
      this.url = this.webm;
    } else if (vType === 'hls') {
      this.url = this.hls;
    } else if (vType === 'mpd') {
      this.url = this.mpd;
    } else if (vType === 'smooth') {
      this.url = this.smooth;
    } else if (vType === 'aws') {
      this.url = this.aws;
/*    } else if (vType === 'ytube') {
      this.url = this.ytube;
*/
    } else if (vType === 'application') {
      this.url = this.appFile;
    } else if (vType === 'internal') {
      this.url = 'internal';
    } else if (vType === 'asset' && this.iPlatform) {
      this.url = this.assetIos;
    } else if (vType === 'asset' && this.aPlatform) {
      this.url = this.assetAndroid;
    } else if (vType === 'asset' && this.wPlatform) {
      this.url = this.assetWeb;
    } else if (vType === 'dcim' && this.aPlatform) {
      this.url = this.dcim;
    } else if (vType === 'extSdCard' && this.aPlatform) {
      this.url = this.extSdCard;
    } else {
      console.log('Video format not supported');
    }
    if(this.url === 'https://brenopolanski.github.io/html5-video-webvtt-example/MIB2.mp4') {
      this.sturl = this.mp4st;
      this.stlang = this.mp4stLang ;
      this.stoptions = this.mp4stOptions;
    } else if (this.url.substring(0,17) === 'application/files') {
      if(this.iPlatform) {
        this.sturl = this.appSTFileIos;
      } else {
        this.sturl = this.appSTFile;
      }
      this.stlang = 'en';
    } else if( this.url.includes('assets') && this.url.includes('jellies')) {
      if(this.iPlatform) {
        this.sturl = this.assetSTIos;
      } else if (this.aPlatform) {
        this.sturl = this.assetSTAndroid;
      } else if (this.wPlatform) {
        this.sturl = this.assetSTWeb;
      }
      this.stlang = this.assetSTLang;
      this.stoptions = this.assetSTOptions;

    } else {
      this.sturl = null;
      this.stlang = null;
      this.stoptions = null;
    }
    console.log(`>>> this.url ${this.url}`);
    console.log(`>>> this.sturl ${this.sturl}`);
    console.log(`>>> this.stlang ${this.stlang}`);
    console.log(`>>> this.stoptions ${JSON.stringify(this.stoptions)}`);
    const modal = await this.modalCtrl.create({
      component: FullscreenPage,
      componentProps: {
        url: this.url,
        sturl: this.sturl,
        stlang: this.stlang,
        stoptions: this.stoptions,
        testApi: this.testApi,
        platform: this.platform
      },
      swipeToClose: true
    });
    await modal.present();
  }

}
// "http://www.youtube.com/embed/W7qWa52k-nE" does not work

