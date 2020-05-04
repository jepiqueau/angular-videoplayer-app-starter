import { Plugins } from '@capacitor/core';
import * as CapacitorVPPlugin from 'capacitor-video-player';
const { CapacitorVideoPlayer, Device } = Plugins;


export const setVideoPlayer = async (): Promise<any>=> {
  const info = await Device.getInfo();
  console.log('platform ',info.platform)
  if (info.platform === "ios" || info.platform === "android") {
    return {plugin:CapacitorVideoPlayer, platform:info.platform};
  }  else {
    return {plugin:CapacitorVPPlugin.CapacitorVideoPlayer, platform:"web"};     
  } 
}

