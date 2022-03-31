package com.psykokoak.app;

import android.util.Log;

import com.android.volley.Request;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.StringRequest;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class AVolley {

    private static final String TAG = "AVolley";

    public StringRequest GetRequestString(String url, HashMap<String, String> headers, CallbackRequest call) {
        return new StringRequest(Request.Method.GET, url,
                response -> {
                    Log.d(TAG, "response = " + response);
                    try {
                        call.onSuccess(response);
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                },
                error -> {
                    Log.w(TAG, "error = " + error);
                    call.onFail(error);
                }) {
            @Override
            public Map<String, String> getHeaders() {
                return headers;
            }
        };
    }

    public StringRequest PostRequestString(String url, HashMap<String, String> headers, HashMap<String, String> params, CallbackRequest call) {
        return new StringRequest(Request.Method.POST, url,
                response -> {
                    Log.d(TAG, "response = " + response);
                    try {
                        call.onSuccess(response);
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                },
                error -> {
                    Log.w(TAG, "error = " + error);
                    call.onFail(error);
                }) {
            @Override
            public Map<String, String> getHeaders() {
                return headers;
            }

            @Override
            public Map<String, String> getParams() {
                return params;
            }
        };
    }

    public JsonObjectRequest PatchRequestJSON(String url, HashMap<String, String> headers, HashMap<String, String> params, JSONObject body, CallbackRequest call) {
        return new JsonObjectRequest(Request.Method.PATCH, url, body,
                response -> {
                    Log.d(TAG, "response = " + response);
                    try {
                        call.onSuccess();
                    } catch (JSONException e) {
                        e.printStackTrace();
                    }
                },
                error -> {
                    Log.w(TAG, "error = " + error);
                    call.onFail(error);
                }) {
            @Override
            public Map<String, String> getHeaders() {
                return headers;
            }

            @Override
            public Map<String, String> getParams() {
                return params;
            }
        };
    }
}
