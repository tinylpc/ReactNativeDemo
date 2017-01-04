package tiny.reacttest;

import android.app.Activity;
import android.content.Intent;
import android.support.annotation.Nullable;
import android.util.Log;
import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.tiny.rxforresult.RxForResult;
import com.tiny.rxforresult.RxResultEntity;

import java.util.HashMap;
import java.util.Map;

import rx.functions.Action1;

/**
 * Created by tiny on 16/12/27.
 */

public class MyToastModule extends ReactContextBaseJavaModule {
    public MyToastModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "MyToastTiny";
    }

    @ReactMethod
    public void showshow(String message, final Promise promise) {
        Toast.makeText(getReactApplicationContext(), message, Toast.LENGTH_SHORT).show();

        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    Thread.sleep(4000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                WritableMap map = Arguments.createMap();

                map.putString("msg", "promise");

                promise.resolve(map);
            }
        }).start();
    }


    /**
     * 可以设置一些常量，能够在js层调用，本例中在JS代码中调用如"MyToastAndroid.LONG"
     *
     * @return
     */
    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>(2);
        constants.put("short", Toast.LENGTH_SHORT);
        constants.put("long", Toast.LENGTH_LONG);
        return constants;
    }

    @ReactMethod
    public void pickImage(final Callback errorcallback, final Callback successcallback) {

        final Intent galleryIntent = new Intent(Intent.ACTION_PICK);

        galleryIntent.setType("image/*");

        final Intent chooserIntent = Intent.createChooser(galleryIntent, "Pick an image");

        final Activity currentActivity = getCurrentActivity();
        if (currentActivity != null) {
            currentActivity.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    new RxForResult(currentActivity).appendIntent(chooserIntent).appendRequestCode(10).startReuqest()
                            .subscribe(new Action1<RxResultEntity>() {
                                @Override
                                public void call(RxResultEntity rxResultEntity) {
                                    WritableMap map = Arguments.createMap();
                                    map.putString("test", "hahha");
                                    successcallback.invoke(rxResultEntity.getResultCode());
                                }
                            });
                }
            });
        }

    }
}
