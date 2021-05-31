import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { setVideoPlayer } from '../utils/util';
import { httpVideos, assetsVideos, getAssetsVideoPathes, getVideoNames } from '../utils/video-utils';

@Component({
  selector: 'app-embedded',
  templateUrl: 'embedded.page.html',
  styleUrls: ['embedded.page.scss'],
})
export class EmbeddedPage implements AfterViewInit, OnDestroy {
    videoList: Array<string>;
    itemId: Array<string>;
    private videoFrom: string = null;
    private videoPlayer: any = {};
    private vpPlatform = 'web';
    private results: Array<any> = [];
    private handlerPlay: any;
    private handlerPause: any;
    private handlerEnded: any;
    private handlerReady: any;
    private handlerPlaying: any;
    private handlerExit: any;

    private testApiPlayerId: string = null;
    private timer1: any;
    private timer2: any;
    private timer3: any;
    private first = false;

    constructor() {
      this.videoFrom = 'http';
      /*  comment line above and uncomment line below
          to use videos from assets
      */
      //this.videoFrom = 'assets';
    }

    async ngAfterViewInit() {
        this.videoList = this.videoFrom === 'http' ? httpVideos : null;
        const player: any = await setVideoPlayer();
        this.videoPlayer = player.plugin;
        this.vpPlatform = player.platform;
        if (this.videoFrom === 'assets') {
            if (this.vpPlatform === 'ios') {
                this.videoList = getAssetsVideoPathes('ios',assetsVideos );
            } else if(this.vpPlatform === 'android') {
                this.videoList = getAssetsVideoPathes('android',assetsVideos );
            } else {
                this.videoList = getAssetsVideoPathes('web',assetsVideos );
            }
        }
        this.handlerPlay = await this.videoPlayer.addListener('jeepCapVideoPlayerPlay', (data: any) => {
            console.log(`Event jeepCapVideoPlayerPlay ${data}`);
        }, false);
        this.handlerPause = await this.videoPlayer.addListener('jeepCapVideoPlayerPause', (data: any) => {
            console.log(`Event jeepCapVideoPlayerPause ${data}`);
        }, false);
        this.handlerEnded = await this.videoPlayer.addListener('jeepCapVideoPlayerEnded', async (data: any) => {
            console.log(`Event jeepCapVideoPlayerEnded ${data}`);
            if(this.testApiPlayerId === data.fromPlayerId) {
              clearTimeout(this.timer3);
              clearTimeout(this.timer2);
              clearTimeout(this.timer1);
            }
        }, false);
        this.handlerExit = await this.videoPlayer.addListener('jeepCapVideoPlayerExit', async (data: any) => {
            console.log(`Event jeepCapVideoPlayerExit ${data}`);
            if(this.testApiPlayerId === data.fromPlayerId) {
              clearTimeout(this.timer3);
              clearTimeout(this.timer2);
              clearTimeout(this.timer1);
              console.log('in jeepCapVideoPlayerExit calling stopAllPlayers');
              const res: any  = await this.videoPlayer.stopAllPlayers();
            }
            this.handlerPlay.remove();
            this.handlerPause.remove();
            this.handlerEnded.remove();
            this.handlerReady.remove();
            this.handlerPlaying.remove();
            this.handlerExit.remove();
        }, false);
        this.handlerReady = await this.videoPlayer.addListener('jeepCapVideoPlayerReady', async (data: any) => {
            console.log(`Event jeepCapVideoPlayerReady ${data}`);
            console.log(`this._testApiPlayerId ${this.testApiPlayerId}`);
            console.log(`data.fromPlayerId ${data.fromPlayerId}`);
            console.log(`this._first ${this.first}`);

            if(this.testApiPlayerId === data.fromPlayerId && this.first) {
              // test the API
              let play = await this.videoPlayer.play({playerId:'bigbuckbunny720psurround'});
              console.log(`play ${play}`);
              this.first = false;
              console.log(`Playing the API this.first ${this.first}`);
                this.timer1 = setTimeout(async () => {
                    const pause = await this.videoPlayer.pause({playerId:'bigbuckbunny720psurround'});
                    console.log('const pause ', pause);
                    const volume = await this.videoPlayer.getVolume({playerId:'bigbuckbunny720psurround'});
                    console.log('const volume ', volume);
                    const setVolume = await this.videoPlayer.setVolume({playerId:'bigbuckbunny720psurround',volume:.75});
                    console.log('const setVolume ', setVolume);
                    const volume1 = await this.videoPlayer.getVolume({playerId:'bigbuckbunny720psurround'});
                    console.log('const volume1 ', volume1);
                    const currentTime = await this.videoPlayer.getCurrentTime({playerId:'bigbuckbunny720psurround'});
                    console.log('const currentTime ', currentTime);
                    const setCurrentTime = await this.videoPlayer.setCurrentTime({playerId:'bigbuckbunny720psurround',seektime:420});
                    console.log('const setCurrentTime ', setCurrentTime);
                    const currentTime1 = await this.videoPlayer.getCurrentTime({playerId:'bigbuckbunny720psurround'});
                    console.log('const currentTime1 ', currentTime1);
                    let setMuted = await this.videoPlayer.setMuted({playerId:'bigbuckbunny720psurround',muted:true});
                    console.log('const setMuted ', setMuted);
                    let muted = await this.videoPlayer.getMuted({playerId:'bigbuckbunny720psurround'});
                    console.log('const muted ', muted);
                    this.timer2 = setTimeout(async () => {
                        play = await this.videoPlayer.play({playerId:'bigbuckbunny720psurround'});
                        console.log('const play ', play);
                        this.timer3 = setTimeout(async () => {
                            setMuted = await this.videoPlayer.setMuted({playerId:'bigbuckbunny720psurround',muted:false});
                            console.log(`setMuted 1 ${setMuted}`);
                            muted = await this.videoPlayer.getMuted({playerId:'bigbuckbunny720psurround'});
                            console.log('const muted 1 ', muted);
                        }, 10000);
                    },10000);
                },50000);
            }
        }, false);
        this.handlerPlaying = await this.videoPlayer.addListener('jeepCapVideoPlayerPlaying', async (data: any) => {
            console.log(`Event jeepCapVideoPlayerPlaying ${data}`);
        }, false);

        this.itemId = getVideoNames(this.videoList);
        const listEl: HTMLIonListElement = document.querySelector('#videos-list');
        for( let i = 0; i< this.itemId.length; i++) {
            const itemEl: HTMLIonItemElement = document.createElement('ion-item');
            const divEl: HTMLDivElement = document.createElement('div');
            divEl.setAttribute('id',this.itemId[i]);
            itemEl.style.setProperty('--inner-padding-top','10px');
            itemEl.style.setProperty('--inner-padding-bottom','10px');
            itemEl.appendChild(divEl);
            listEl.appendChild(itemEl);
            const res: any  = await this.videoPlayer.initPlayer(
                {mode:'embedded', url:this.videoList[i],
                playerId:this.itemId[i], componentTag:'app-embedded',
                width:480,height:270});
            this.results = [...this.results,res];
        }

        // Tests the API for the playerId "bigbuckbunny720psurround"
        this.testApiPlayerId = 'bigbuckbunny720psurround';
        this.first = true;
        console.log(`this.first ${this.first}`);
    }

    async ngOnDestroy() {

        const res: any  = await this.videoPlayer.stopAllPlayers();
        clearTimeout(this.timer3);
        clearTimeout(this.timer2);
        clearTimeout(this.timer1);
        this.handlerPlay.remove();
        this.handlerPause.remove();
        this.handlerEnded.remove();
        this.handlerReady.remove();
        this.handlerPlaying.remove();
        this.handlerExit.remove();
    }

}
