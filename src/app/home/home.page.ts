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


  private _mp4: string = "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4?alt=media&token=a8abafa7-5fd9-4179-be5f-1963a5b60d51";
  //private _hls: string = "https://irtdashreference-i.akamaihd.net/dash/live/901161/keepixo1/playlistBR.m3u8";
  //private _hls: string = "https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8";
  private _hls: string = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";
  //private _mpd: string = "https://irtdashreference-i.akamaihd.net/dash/live/901161/keepixo1/manifestBR.mpd";
  private _mpd: string = "https://bitmovin-a.akamaihd.net/content/MI201109210084_1/mpds/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.mpd";
  private _smooth : string ="https://test.playready.microsoft.com/smoothstreaming/SSWSS720H264/SuperSpeedway_720.ism/manifest";
  private _webm: string = "https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f1/Sintel_movie_4K.webm/Sintel_movie_4K.webm.720p.webm";
  private _aws: string = "https://universo-dev-a-m.s3.amazonaws.com/779970/fe774806dbe7ad042c24ce522b7b46594f16c66e";
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
/*      } else if (vType === "ytube") {
      this._url = this._ytube;
*/
    } else if (vType === 'internal') {
      this._url = "internal";
    } else {
      console.log("Video format not supported");
    }
    const modal = await this.modalCtrl.create({
      component: FullscreenPage,
      componentProps: {
        'url': this._url,
        'testApi': this._testApi,
        'platform': this._info.platform
      },
      swipeToClose: true
    });
    await modal.present();
  
  }

}
// "http://www.youtube.com/embed/W7qWa52k-nE" does not work