package tiny.reacttest;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

/**
 * Created by tiny on 16/12/28.
 */

public class MyTellProgressManager extends SimpleViewManager<TellPatientConditionProgress> {
    @Override
    public String getName() {
        return "MyTellProgress";
    }

    @Override
    protected TellPatientConditionProgress createViewInstance(ThemedReactContext reactContext) {
        return new TellPatientConditionProgress(reactContext, null);
    }

    @ReactProp(name = "start")
    public void setColor(TellPatientConditionProgress view, String start) {
        if (start.equalsIgnoreCase("start")) {
            view.startAnimation();
        }
    }

}
