import { Capacitor } from '@capacitor/core';
import { CapacitorVideoPlayer } from 'capacitor-video-player';


export const setVideoPlayer = async (): Promise<any>=> {
  const platform = Capacitor.getPlatform();
  console.log(`platform ${platform}`);
  return {plugin:CapacitorVideoPlayer, platform};
};
