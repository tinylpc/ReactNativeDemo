package tiny.reacttest;

import android.Manifest;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.UiThreadUtil;
import com.facebook.react.bridge.WritableMap;
import com.tbruyelle.rxpermissions.RxPermissions;

import java.util.HashMap;
import java.util.Map;

import rx.android.schedulers.AndroidSchedulers;
import rx.functions.Action1;

/**
 * Created by tiny on 17/1/6.
 */

public class PermissionAndroidModule extends ReactContextBaseJavaModule {
    private static final String NAME = "TinyPermissionAndroid";
    private static final String WRITE_EXTERNAL_STORAGE = "WRITE_EXTERNAL_STORAGE";

    public PermissionAndroidModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return NAME;
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(WRITE_EXTERNAL_STORAGE, Manifest.permission.WRITE_EXTERNAL_STORAGE);
        return constants;
    }

    @ReactMethod
    public void requestPermission(ReadableArray array, final Promise promise) {
        int size = array.size();
        final String[] permissions = new String[size];
        for (int i = 0; i < size; i++) {
            permissions[i] = array.getString(i);
        }
        UiThreadUtil.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                new RxPermissions(getCurrentActivity()).request(permissions).observeOn(AndroidSchedulers.mainThread()).subscribe(new Action1<Boolean>() {
                    @Override
                    public void call(Boolean aBoolean) {
                        WritableMap map = Arguments.createMap();
                        map.putBoolean("isGranted", aBoolean);
                        promise.resolve(map);
                    }
                });
            }
        });
    }
}
