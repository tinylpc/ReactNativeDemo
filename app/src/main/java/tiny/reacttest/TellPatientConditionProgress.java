package tiny.reacttest;

import android.animation.Animator;
import android.animation.AnimatorSet;
import android.animation.ObjectAnimator;
import android.content.Context;
import android.content.res.TypedArray;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.graphics.RectF;
import android.util.AttributeSet;
import android.view.View;
import android.view.animation.LinearInterpolator;
import android.widget.RelativeLayout;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;

import java.util.ArrayList;

import static android.R.attr.duration;


/**
 * Created by Sojo on 2015/3/8.
 */
public class TellPatientConditionProgress extends RelativeLayout implements LifecycleEventListener {

    /**
     * static fields
     */
    private final static int PERIOD = 1500;
    private final static int VIEW_COUNTS = 2;
    private final static float SCALE = 2.0F;

    // 动态扩散圆环相关
    private Paint mWavePaint;
    private Paint mStaticPaint;
    private Paint mStaticCircleRingPaint;
    private int colorPink;
    private float static_radius;
    private int colorWhite;
    private float mStrokeWidth;
    private AnimatorSet mAnimatorSet = new AnimatorSet();
    private ArrayList<Animator> mAnimatorList = new ArrayList<Animator>();
    private LayoutParams mParams;
    private int mAnimDelay;
    private boolean isAnimRunning = false;
    private CenterCircle centerCircle;

    // 录音动画相关
    private double mAudioDuration;
    private boolean isAudioRunning = false;
    private double mCurrentAudioStep = 0;
    private Paint mDynamicRing;
    private Paint mTrackPaint;
    private int trackColor;

    private ProgressCallBack mCallback;

    public TellPatientConditionProgress(Context context, AttributeSet attrs) {

        super(context, attrs);
        // 获取自定义的属性
        initAttrs(context, attrs);
        initVariable();
        initParams();
        generateWaveViews();
        addView(centerCircle, mParams);
    }

    private void initAttrs(Context context, AttributeSet attrs) {

        TypedArray typeArray = context.getTheme()
                .obtainStyledAttributes(attrs, R.styleable.TellPatientConditionProgress, 0, 0);
        static_radius = typeArray.getDimension(R.styleable.TellPatientConditionProgress_mStaticRadius, 100);
        mStrokeWidth = typeArray.getDimension(R.styleable.TellPatientConditionProgress_mStrokeWidth, 5);
        colorPink = typeArray.getColor(R.styleable.TellPatientConditionProgress_mRingColor, 0xFF1CFA56);
        colorWhite = typeArray.getColor(R.styleable.TellPatientConditionProgress_centerColor, 0xFFFFFFFF);
        trackColor = typeArray.getColor(R.styleable.TellPatientConditionProgress_trackColor, 0xFFFFFFFF);
        typeArray.recycle();
    }

    private void initParams() {

        int width = (int) (2 * (static_radius + mStrokeWidth));
        mParams = new LayoutParams(width, width);
        // 居中显示
        mParams.addRule(CENTER_IN_PARENT, TRUE);
    }

    private void generateWaveViews() {

        calculateAnimDelay();
        initAnimSet();
        for (int i = 0; i < VIEW_COUNTS; i++) {
            CircleWaveView circleWaveView = new CircleWaveView(getContext());
            addView(circleWaveView, mParams);
            addAnimCombination(circleWaveView, i);
        }
        mAnimatorSet.playTogether(mAnimatorList);
        centerCircle = new CenterCircle(getContext());
    }

    private void calculateAnimDelay() {

        mAnimDelay = PERIOD / VIEW_COUNTS;
    }

    private void initAnimSet() {

        mAnimatorSet.setDuration(PERIOD);
        mAnimatorSet.setInterpolator(new LinearInterpolator()); // 匀速插值器
    }

    private void addAnimCombination(CircleWaveView circleWaveView, int i) {

        // x轴的缩放动画
        final ObjectAnimator scaleXAnimator = ObjectAnimator.ofFloat(circleWaveView, "scaleX", 1.0f, SCALE);
        scaleXAnimator.setRepeatCount(ObjectAnimator.INFINITE);
        scaleXAnimator.setRepeatMode(ObjectAnimator.RESTART);
        scaleXAnimator.setStartDelay(i * mAnimDelay);
        scaleXAnimator.setDuration(PERIOD);
        scaleXAnimator.setInterpolator(new LinearInterpolator());
        mAnimatorList.add(scaleXAnimator);

        // y轴的缩放动画
        final ObjectAnimator scaleYAnimator = ObjectAnimator.ofFloat(circleWaveView, "scaleY", 1.0f, SCALE);
        scaleYAnimator.setRepeatMode(ObjectAnimator.RESTART);
        scaleYAnimator.setRepeatCount(ObjectAnimator.INFINITE);
        scaleYAnimator.setStartDelay(i * mAnimDelay);
        scaleYAnimator.setDuration(PERIOD);
        scaleYAnimator.setInterpolator(new LinearInterpolator());
        mAnimatorList.add(scaleYAnimator);

        // 颜色的alpha渐变动画
        final ObjectAnimator alphaAnimator = ObjectAnimator.ofFloat(circleWaveView, "alpha", 1.0f, 0f);
        alphaAnimator.setRepeatMode(ObjectAnimator.RESTART);
        alphaAnimator.setRepeatCount(ObjectAnimator.INFINITE);
        alphaAnimator.setDuration(PERIOD);
        alphaAnimator.setStartDelay(i * mAnimDelay);
        alphaAnimator.setInterpolator(new LinearInterpolator());
        mAnimatorList.add(alphaAnimator);
    }

    private void initVariable() {

        /**
         * 动画圆画笔
         */
        mWavePaint = new Paint();
        mWavePaint.setAntiAlias(true);
        mWavePaint.setColor(colorPink);
        mWavePaint.setStyle(Paint.Style.FILL);
        mWavePaint.setStrokeWidth(mStrokeWidth);

        mStaticPaint = new Paint();
        mStaticPaint.setAntiAlias(true);
        mStaticPaint.setColor(colorWhite);
        mStaticPaint.setStyle(Paint.Style.FILL);
        mStaticPaint.setStrokeWidth(mStrokeWidth);

        mStaticCircleRingPaint = new Paint();
        mStaticCircleRingPaint.setAntiAlias(true);
        mStaticCircleRingPaint.setColor(colorPink);
        mStaticCircleRingPaint.setStyle(Paint.Style.STROKE);
        mStaticCircleRingPaint.setStrokeWidth(mStrokeWidth);

        mTrackPaint = new Paint();
        mTrackPaint.setAntiAlias(true);
        mTrackPaint.setColor(getResources().getColor(R.color.tell_ring_color1));
        mTrackPaint.setStyle(Paint.Style.STROKE);
        mTrackPaint.setStrokeWidth(mStrokeWidth);

        /**
         * 动态画笔配置
         */
        mDynamicRing = new Paint();
        mDynamicRing.setAntiAlias(true);
        mDynamicRing.setStyle(Paint.Style.STROKE);
        mDynamicRing.setColor(colorPink);
        mDynamicRing.setStrokeWidth(mStrokeWidth);
    }

    /**
     * 重置
     */
    public void reset() {

        isAnimRunning = false;
        isAudioRunning = false;
        centerCircle.postInvalidate();
    }

    public void startProgress(double totalTime) {

        mAudioDuration = totalTime * 1000;
        centerCircle.start();
    }

    public void stopProgress() {

        centerCircle.stop();
    }

    public void stopProgressImmediately(){
        centerCircle.stopImmediately();
    }

    public void setProgressCallback(ProgressCallBack callback){
        this.mCallback = callback;
    }

    public synchronized void startAnimation() {

        isAnimRunning = true;
        centerCircle.postInvalidate();
        int childCount = this.getChildCount();
        for (int i = 0; i < childCount; i++) {
            View childView = this.getChildAt(i);
            if (childView instanceof CircleWaveView) {
                childView.setVisibility(VISIBLE);
            }
        }
        mAnimatorSet.start();
    }

    public synchronized void stopAnimation() {

        if (isAnimRunning) {
            mAnimatorSet.end();
            isAnimRunning = false;
            centerCircle.postInvalidate();
        }
    }

    @Override
    public void onWindowFocusChanged(boolean hasWindowFocus) {

        super.onWindowFocusChanged(hasWindowFocus);
    }

    @Override
    public void onHostResume() {

    }

    @Override
    public void onHostPause() {
        WritableMap event = Arguments.createMap();
        event.putInt("duration",100);//key用于js中的nativeEvent
        ReactContext reactContext = (ReactContext) getContext();
        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                getId(),//native层和js层两个视图会依据getId()而关联在一起
                "tinyPause",//事件名称
                event//事件携带的数据
        );
    }

    @Override
    public void onHostDestroy() {

    }

    private final class CircleWaveView extends View {

        public CircleWaveView(Context context) {

            super(context);
            this.setVisibility(View.INVISIBLE);
        }

        @Override
        protected void onDraw(Canvas canvas) {

            super.onDraw(canvas);
            int radius = (Math.min(getWidth(), getHeight())) / 2 - 15;
            canvas.drawCircle(getWidth() / 2, getWidth() / 2, radius, mWavePaint);
        }
    }

    private final class CenterCircle extends View implements Runnable {

        private Thread progressThread;
        private RectF rectF;

        public CenterCircle(Context context) {
            super(context);
            rectF = new RectF();
        }

        @Override
        protected void onDraw(Canvas canvas) {

            super.onDraw(canvas);
            if (isAnimRunning) {
                mStaticCircleRingPaint.setColor(colorWhite);
            } else {
                if (isAudioRunning) {
                    mStaticCircleRingPaint.setColor(getResources().getColor(R.color.tell_ring_color1));
                } else {
                    mStaticCircleRingPaint.setColor(getResources().getColor(R.color.tell_ring_color2));
                }
            }
            if (!isAudioRunning) {
                canvas.drawCircle(getWidth() / 2, getHeight() / 2, static_radius, mStaticPaint);
                canvas.drawCircle(getWidth() / 2, getHeight() / 2, static_radius, mStaticCircleRingPaint);
            } else {
                rectF.left = (getWidth() / 2 - static_radius);
                rectF.top = (getHeight() / 2 - static_radius);
                rectF.right = static_radius * 2 + (getWidth() / 2 - static_radius);
                rectF.bottom = static_radius * 2 + (getHeight() / 2 - static_radius);
                canvas.drawCircle(getWidth() / 2, getHeight() / 2, static_radius, mTrackPaint);
                canvas.drawArc(rectF, -90, -(float) (mCurrentAudioStep / mAudioDuration) * 360, false, mDynamicRing);
                mCurrentAudioStep = mCurrentAudioStep + 40;
                if(mCurrentAudioStep >= mAudioDuration){
                    if(mCallback != null){
                        mCallback.onProgressFinish();
                    }
                }
            }
        }

        @Override
        public void run() {

            while (isAudioRunning) {
                if (mCurrentAudioStep > mAudioDuration) {
                    if (mCurrentAudioStep - mAudioDuration < 40) {
                        mCurrentAudioStep = mAudioDuration;
                    } else {
                        stopImmediately();
                        break;
                    }
                }
                postInvalidate();
                try {
                    Thread.sleep(40);
                } catch (InterruptedException e) {
                }
            }
        }

        public void start() {

            isAudioRunning = true;
            if (progressThread == null || !progressThread.isAlive()) {
                progressThread = new Thread(this);
                progressThread.start();
            }

        }

        public void stop() {
            if (mCurrentAudioStep < mAudioDuration) {
                postInvalidate();
            } else {
                isAudioRunning = false;
                mCurrentAudioStep = 0;
                postInvalidate();
            }
        }

        public void stopImmediately() {
            reset();
            isAudioRunning = false;
            mCurrentAudioStep = 0;
            postInvalidate();
        }
    }

    public interface ProgressCallBack{
        void onProgressFinish();
    }

}
