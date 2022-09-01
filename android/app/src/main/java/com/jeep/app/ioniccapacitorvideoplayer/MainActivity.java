package com.jeep.app.ioniccapacitorvideoplayer;

import com.getcapacitor.BridgeActivity;
import android.os.Bundle;

import com.google.android.gms.cast.framework.CastContext;

public class MainActivity extends BridgeActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    CastContext.getSharedInstance(this);
  }
}
