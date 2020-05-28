package com.example.jeep.exoplayerinbackground;

import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Binder;
import android.os.Handler;
import android.os.IBinder;
import android.util.Log;

import androidx.annotation.Nullable;

import com.google.android.exoplayer2.ExoPlayerFactory;
import com.google.android.exoplayer2.SimpleExoPlayer;
import com.google.android.exoplayer2.extractor.mp4.Mp4Extractor;
import com.google.android.exoplayer2.source.ExtractorMediaSource;
import com.google.android.exoplayer2.source.LoopingMediaSource;
import com.google.android.exoplayer2.source.MediaSource;
import com.google.android.exoplayer2.trackselection.AdaptiveTrackSelection;
import com.google.android.exoplayer2.trackselection.DefaultTrackSelector;
import com.google.android.exoplayer2.upstream.DataSource;
import com.google.android.exoplayer2.upstream.DataSpec;
import com.google.android.exoplayer2.upstream.DefaultBandwidthMeter;
import com.google.android.exoplayer2.upstream.RawResourceDataSource;

public class VideoService extends Service {
    private static final String TAG = VideoService.class.getName();
    private SimpleExoPlayer exoPlayer;
    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        if( intent != null) {
            SimpleExoPlayer tExoPlayer = this.exoPlayer;
            if(tExoPlayer == null) {
                Log.d(TAG, "ExoPlayer not defined");
            }
            tExoPlayer.setPlayWhenReady(true);
            try {
                this.loadExampleMedia(intent.getIntExtra("VideoFileID", 0));
            } catch (RawResourceDataSource.RawResourceDataSourceException e) {
                e.printStackTrace();
            }
            this.displayNotification();

        }
        return (IBinder)(new VideoService.VideoServiceBinder());
    }

    private void displayNotification() {
    }

    private void loadExampleMedia(int videoFileID) throws RawResourceDataSource.RawResourceDataSourceException {
        Uri rawUri = RawResourceDataSource.buildRawResourceUri(videoFileID);
        final RawResourceDataSource dataSource = new RawResourceDataSource((Context)this);
        dataSource.open(new DataSpec(rawUri));
        ExtractorMediaSource source = new ExtractorMediaSource(rawUri, (com.google.android.exoplayer2.upstream.DataSource.Factory)(new com.google.android.exoplayer2.upstream.DataSource.Factory() {
            public final DataSource createDataSource() {
                return (DataSource)dataSource;
            }
        }), Mp4Extractor.FACTORY, (Handler)null, (ExtractorMediaSource.EventListener)null);
        SimpleExoPlayer tExoPlayer = this.exoPlayer;
        if(tExoPlayer == null) {
            Log.d(TAG, "ExoPlayer not defined");
        }

        tExoPlayer.prepare((MediaSource)(new LoopingMediaSource((MediaSource)source, 10)));
    }
    public final class VideoServiceBinder extends Binder {
        public final SimpleExoPlayer getExoPlayerInstance() {
            return VideoService.access$getExoPlayer$p(VideoService.this);
        }
    }

    private static SimpleExoPlayer access$getExoPlayer$p(VideoService videoService) {
        SimpleExoPlayer tExoPlayer = videoService.exoPlayer;
        if (tExoPlayer == null) {
            Log.d(TAG, "ExoPlayer not defined");
        }
        return tExoPlayer;
    }
    public static void access$setExoPlayer$p(VideoService $this, SimpleExoPlayer var1) {
        $this.exoPlayer = var1;
    }


    @Override
    public void onDestroy() {
        super.onDestroy();
    }

}