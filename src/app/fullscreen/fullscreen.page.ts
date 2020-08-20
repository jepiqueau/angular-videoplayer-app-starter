import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import * as WebVPPlugin from 'capacitor-video-player';

const { CapacitorVideoPlayer } = Plugins;
const videoFrom:string = "http";
/*  comment line above and uncomment line below
    to use videos from assets
*/
//const videoFrom:string = "assets";

@Component({
  selector: 'app-fullscreen',
  templateUrl: './fullscreen.page.html',
  styleUrls: ['./fullscreen.page.scss'],
})
export class FullscreenPage implements OnInit {
  @Input() url: string;
  @Input() testApi: boolean;
  @Input() platform: string;

  private _videoPlayer: any;
  private _handlerPlay: any;
  private _handlerPause: any;
  private _handlerEnded: any;
  private _handlerReady: any;
  private _handlerPlaying: any;
  private _handlerExit: any;
  private _first: boolean = false;
  private _url: string = null;
  private _apiTimer1: any;
  private _apiTimer2: any;
  private _apiTimer3: any;
  private _testApi: boolean;

  constructor(public modalCtrl: ModalController) { }

  async ngOnInit() { 
    console.log('in ngOnInit')   
    this._testApi = this.testApi ? this.testApi : false;
    if (this.platform === "ios" || this.platform === "android") {
      this._videoPlayer = CapacitorVideoPlayer;
      if (this.platform === "ios") {
        this._url = "public/assets/video/video.mp4";
      } else {
        this._url ="raw/video";
      }
    } else {
      this._videoPlayer = WebVPPlugin.CapacitorVideoPlayer;
      this._url = "assets/video/video.mp4";
    }
    if (videoFrom === "http") this._url = this.url;
    this._addListenersToPlayerPlugin();
  }
  async ionViewDidEnter() {
    if(this._url != null) {
      if(this._testApi) this._first = true;
      const res:any  = await this._videoPlayer.initPlayer({mode:"fullscreen",url:this._url,playerId:"fullscreen",componentTag:"app-fullscreen"});
      console.log("res.result ",res.result) ;     
      if(!res.result) console.log("res.message",res.message);
    }
  }
  public async closeModal(){
    this._leaveModal()
  }

  private async _leaveModal() {
    if(this._testApi) {
      // Clear the timer
      clearTimeout(this._apiTimer3);
      clearTimeout(this._apiTimer2);
      clearTimeout(this._apiTimer1);
    } 
    await this._videoPlayer.stopAllPlayers();

    // Remove all the plugin listeners
    this._handlerPlay.remove();
    this._handlerPause.remove();
    this._handlerEnded.remove();
    this._handlerReady.remove();
    this._handlerPlaying.remove();
    this._handlerExit.remove();
    // Dismiss the modal view
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
  private _addListenersToPlayerPlugin() {
    this._handlerPlay = this._videoPlayer.addListener('jeepCapVideoPlayerPlay', (data:any) => { 
      console.log('Event jeepCapVideoPlayerPlay ', data);
      
    }, false);
    this._handlerPause = this._videoPlayer.addListener('jeepCapVideoPlayerPause', (data:any) => {
      console.log('Event jeepCapVideoPlayerPause ', data);
    }, false);
    this._handlerEnded = this._videoPlayer.addListener('jeepCapVideoPlayerEnded', async (data:any) => {
      console.log('Event jeepCapVideoPlayerEnded ', data);
      this._leaveModal()}, false);
    this._handlerExit = this._videoPlayer.addListener('jeepCapVideoPlayerExit', async (data:any) => { 
      console.log('Event jeepCapVideoPlayerExit ', data)
      this._leaveModal()}, false);
    this._handlerReady = this._videoPlayer.addListener('jeepCapVideoPlayerReady', async (data:any) => { 
      console.log('Event jeepCapVideoPlayerReady ', data)
      console.log("testVideoPlayerPlugin testAPI ",this._testApi);
      console.log("testVideoPlayerPlugin first ",this._first);
      if(this._testApi && this._first) {
        // test the API
        this._first = false;
        console.log("testVideoPlayerPlugin calling isPlaying ");
        const isPlaying = await this._videoPlayer.isPlaying({playerId:"fullscreen"});
        console.log('const isPlaying ', isPlaying)
        this._apiTimer1 = setTimeout(async () => {
          const pause = await this._videoPlayer.pause({playerId:"fullscreen"});
          console.log('const pause ', pause)
          const isPlaying = await this._videoPlayer.isPlaying({playerId:"fullscreen"});
          console.log('const isPlaying after pause ', isPlaying)
          let currentTime = await this._videoPlayer.getCurrentTime({playerId:"fullscreen"});
          console.log('const currentTime ', currentTime);
          let muted = await this._videoPlayer.getMuted({playerId:"fullscreen"});
          if(muted.value) {
            console.log('getMuted true');
          } else {
            console.log('getMuted false');
          }
          const setMuted = await this._videoPlayer.setMuted({playerId:"fullscreen",muted:!muted.value});
          if(setMuted.value) {
            console.log('setMuted true');
          } else {
            console.log('setMuted false');
          }
          muted = await this._videoPlayer.getMuted({playerId:"fullscreen"});
          if(muted.value) {
            console.log('getMuted true');
          } else {
            console.log('getMuted false');
          }
          const duration = await this._videoPlayer.getDuration({playerId:"fullscreen"});
          console.log("duration ",duration);
          // valid for movies havin a duration > 25
          const seektime = currentTime.value + 0.5 * duration.value < duration.value -25 ? currentTime.value + 0.5 * duration.value
                          : duration.value -25;
          const setCurrentTime = await this._videoPlayer.setCurrentTime({playerId:"fullscreen",seektime:(seektime)});
          console.log('const setCurrentTime ', setCurrentTime.value);
          const play = await this._videoPlayer.play({playerId:"fullscreen"});
          console.log("play ",play);
          this._apiTimer2 = setTimeout(async () => {
            const setMuted = await this._videoPlayer.setMuted({playerId:"fullscreen",muted:false});
            console.log('setMuted ', setMuted);
            const setVolume = await this._videoPlayer.setVolume({playerId:"fullscreen",volume:0.5});
            console.log("setVolume ",setVolume);
            const volume = await this._videoPlayer.getVolume({playerId:"fullscreen"});
            console.log("Volume ",volume);
            this._apiTimer3 = setTimeout(async () => {
              const pause = await this._videoPlayer.pause({playerId:"fullscreen"});
              console.log('const pause ', pause);  
              const duration = await this._videoPlayer.getDuration({playerId:"fullscreen"});
              console.log("duration ",duration);
              const volume = await this._videoPlayer.setVolume({playerId:"fullscreen",volume:1.0});
              console.log("Volume ",volume);
              const setCurrentTime = await this._videoPlayer.setCurrentTime({playerId:"fullscreen",seektime:(duration.value - 3)});
              console.log('const setCurrentTime ', setCurrentTime);
              const play = await this._videoPlayer.play({playerId:"fullscreen"});
              console.log('const play ', play);      
            }, 10000);
          }, 8000);

        }, 7000);
      }
    }, false);
    this._handlerPlaying = this._videoPlayer.addListener('jeepCapVideoPlayerPlaying', async (data:any) => { 
      console.log('Event jeepCapVideoPlayerPlaying ', data)
      if(this._testApi) {
      } 
    }, false);

  }

}
