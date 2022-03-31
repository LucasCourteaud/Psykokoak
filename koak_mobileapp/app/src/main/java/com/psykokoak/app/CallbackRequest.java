package com.psykokoak.app;

import android.util.Log;

import com.android.volley.VolleyError;

import org.json.JSONException;

public class CallbackRequest {

    public void onSuccess(String response) throws JSONException {
        Log.d("request", "Request success");
    }

    public void onSuccess() throws JSONException {
        Log.d("request", "Request success");
    }

    public void onFail(VolleyError error) {
        Log.w("request", "RequestError: " + error.toString());
    }
}
