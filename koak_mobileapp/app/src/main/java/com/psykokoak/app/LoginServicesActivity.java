package com.psykokoak.app;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.net.Uri;
import android.util.Log;
import android.view.View;
import android.widget.Button;

import com.android.volley.RequestQueue;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;

public class LoginServicesActivity extends AppCompatActivity {

    private final String CLIENT_ID = "client_id=";
    private final String RESPONSE_TYPE = "response_type=";
    private final String STATE = "state=";
    private final String REDIRECT_URI = "redirect_uri=";
    private final String SCOPE = "scope=";
    private static String serviceLogin = "";

    Button loginSpotifyButton;
    Button loginRedditButton;
    Button loginGithubButton;
    Button loginYoutubeButton;
    Button loginGmailButton;
    Button loginTwitchButton;

    RequestQueue queue;
    StringRequest request;
    AVolley myVolley = new AVolley();

    public void signInSpotify(View v) {
        serviceLogin = "spotify";
        String SERVICE_URL = "https://accounts.spotify.com/authorize";
        String CLIENT_ID_SPOTIFY = CLIENT_ID + "37487a2e7652440380779ab859782d2a";
        String RESPONSE_TYPE_SPOTIFY = RESPONSE_TYPE + "code";
        String REDIRECT_URI_SPOTIFY = REDIRECT_URI + "http://localhost:8081";
        String SCOPE_SPOTIFY = SCOPE + "user-read-email,user-follow-read,user-library-read,playlist-modify-public,playlist-modify-private";
        String URL_REQUEST = SERVICE_URL + "?" + CLIENT_ID_SPOTIFY + "&" + SCOPE_SPOTIFY + "&" + REDIRECT_URI_SPOTIFY + "&" + RESPONSE_TYPE_SPOTIFY;
        Log.d("Debug" , "url_request : " + URL_REQUEST);
        Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(URL_REQUEST));
        startActivity(intent);
    }

    public void signInReddit(View v) {
        serviceLogin = "reddit";
        String SERVICE_URL = "https://www.reddit.com/api/v1/authorize.compact";
        String CLIENT_ID_REDDIT = CLIENT_ID + "IfNkH_m62BJoNWRd0MQ3kA";
        String RESPONSE_TYPE_REDDIT = RESPONSE_TYPE + "code";
        String STATE_REDDIT = STATE + "reddit";
        String REDIRECT_URI_REDDIT = REDIRECT_URI + "http://localhost:8081";
        String DURATION = "duration=";
        String DURATION_REDDIT = DURATION + "permanent";
        String SCOPE_REDDIT = SCOPE + "identity edit flair history modconfig modflair modlog modposts modwiki mysubreddits privatemessages read report save submit subscribe vote wikiedit wikiread account";
        String URL_REQUEST = SERVICE_URL + "?" + CLIENT_ID_REDDIT + "&" + RESPONSE_TYPE_REDDIT + "&" + STATE_REDDIT + "&" + REDIRECT_URI_REDDIT + "&" + DURATION_REDDIT + "&" + SCOPE_REDDIT;
        Log.d("Debug", Uri.parse(URL_REQUEST).toString());
        Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(URL_REQUEST));
        startActivity(intent);
    }

    public void signInGithub(View v) {
        String URL_REQUEST = "";
        Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(URL_REQUEST));
        startActivity(intent);
    }

    public void signInYoutube(View v) {
        serviceLogin = "youtube";
        String SERVICE_URL = "https://accounts.google.com/o/oauth2/v2/auth";
        String CLIENT_ID_YOUTUBE = CLIENT_ID + "999158494432-ov6dopfhvl962pivtr02ci70gfbfbvs2.apps.googleusercontent.com";
        String RESPONSE_TYPE_YOUTUBE = RESPONSE_TYPE + "code";
        String STATE_YOUTUBE = STATE + "youtube";
        String ACCESS_TYPE = "access_type=offline";
        String REDIRECT_URI_YOUTUBE = REDIRECT_URI + "http://localhost:8081";
        String prompt = "prompt=consent";
        String SCOPE_YOUTUBE = SCOPE + "profile email https://www.googleapis.com/auth/youtube https://mail.google.com/";
        String URL_REQUEST = SERVICE_URL + "?" + prompt + "&" + ACCESS_TYPE + "&" + RESPONSE_TYPE_YOUTUBE + "&" + CLIENT_ID_YOUTUBE + "&" + SCOPE_YOUTUBE + "&" + REDIRECT_URI_YOUTUBE + "&" + STATE_YOUTUBE;
        Log.d("Debug", Uri.parse(URL_REQUEST).toString());
        Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(URL_REQUEST));
        startActivity(intent);
    }

    public void signInGmail(View v) {
        serviceLogin = "gmail";
        String SERVICE_URL = "https://accounts.google.com/o/oauth2/v2/auth";
        String CLIENT_ID_GMAIL = CLIENT_ID + "999158494432-ov6dopfhvl962pivtr02ci70gfbfbvs2.apps.googleusercontent.com";
        String RESPONSE_TYPE_GMAIL = RESPONSE_TYPE + "code";
        String STATE_GMAIL = STATE + "gmail";
        String ACCESS_TYPE = "access_type=offline";
        String REDIRECT_URI_GMAIL = REDIRECT_URI + "http://localhost:8081";
        String prompt = "prompt=consent";
        String SCOPE_GMAIL = SCOPE + "profile email https://www.googleapis.com/auth/youtube https://mail.google.com/";
        String URL_REQUEST = SERVICE_URL + "?" + prompt + "&" + ACCESS_TYPE + "&" + RESPONSE_TYPE_GMAIL + "&" + CLIENT_ID_GMAIL + "&" + SCOPE_GMAIL + "&" + REDIRECT_URI_GMAIL + "&" + STATE_GMAIL;
        Log.d("Debug", Uri.parse(URL_REQUEST).toString());
        Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(URL_REQUEST));
        startActivity(intent);
    }

    public void signInTwitch(View v) {
        serviceLogin = "twitch";
        String SERVICE_URL = "https://id.twitch.tv/oauth2/authorize";
        String RESPONSE_TYPE_TWITCH = RESPONSE_TYPE + "code";
        String CLIENT_ID_TWITCH = CLIENT_ID + "cyl5w89xsw1ybpmc1cknlkw0u3k1xq";
        String REDIRECT_URI_TWITCH = REDIRECT_URI + "http://localhost:8081";
        String SCOPE_TWITCH = SCOPE + "viewing_activity_read";
        String STATE_TWITCH = STATE + "twitch";
        String URL_REQUEST = SERVICE_URL + "?" + RESPONSE_TYPE_TWITCH + "&" + CLIENT_ID_TWITCH + "&" + REDIRECT_URI_TWITCH + "&" + SCOPE_TWITCH + "&" + STATE_TWITCH;
        Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(URL_REQUEST));
        Log.d("Debug" , "url_request : " + URL_REQUEST);
        startActivity(intent);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login_services);

        loginSpotifyButton = findViewById(R.id.LoginSpotifyButton);
        loginSpotifyButton.setOnClickListener(this::signInSpotify);

        loginRedditButton = findViewById(R.id.LoginRedditButton);
        loginRedditButton.setOnClickListener(this::signInReddit);

        loginGithubButton = findViewById(R.id.LoginGithubButton);
        loginGithubButton.setOnClickListener(this::signInGithub);

        loginYoutubeButton = findViewById(R.id.LoginYoutubeButton);
        loginYoutubeButton.setOnClickListener(this::signInYoutube);

        loginGmailButton = findViewById(R.id.LoginGmailButton);
        loginGmailButton.setOnClickListener(this::signInGmail);

        loginTwitchButton = findViewById(R.id.LoginTwitchButton);
        loginTwitchButton.setOnClickListener(this::signInTwitch);
    }

    public void requestSpotify(String code) {
        HashMap<String, String> headers = new HashMap<>();
        HashMap<String, String> params = new HashMap<>();
        headers.put("Content-Type", "application/x-www-form-urlencoded");
        headers.put("Authorization", "Basic Mzc0ODdhMmU3NjUyNDQwMzgwNzc5YWI4NTk3ODJkMmE6MDdiZWVlZTczNGRlNGM3MGFlZDhjNGY5Y2EwNDRjN2E=");
        params.put("code", code);
        params.put("grant_type",  "authorization_code");
        params.put("redirect_uri", "http://localhost:8081");
        queue = Volley.newRequestQueue(this);
        request = myVolley.PostRequestString("https://accounts.spotify.com/api/token", headers, params, new CallbackRequest() {
            @Override
            public void onSuccess(String response) {
                JSONObject json;
                try {
                    json = new JSONObject(response);
                    String token = json.getString("access_token");
                    String refreshToken = json.getString("refresh_token");
                    Log.d("Debug", token);
                    Log.d("Debug", refreshToken);
                } catch (JSONException e) {
                    e.printStackTrace();
                    return;
                }
            }
            @Override
            public void onFail(VolleyError error) {
                Log.d("Debug", error.toString());
            }
        });
        queue.add(request);
    }

    public void requestReddit(String code) {
        HashMap<String, String> headers = new HashMap<>();
        HashMap<String, String> params = new HashMap<>();
        headers.put("Authorization", "Basic SWZOa0hfbTYyQkpvTldSZDBNUTNrQTo5YjNpTnVfWkhBUHBSZlhaSlEtWFZtSl9xYXgtV2c=");
        params.put("code", code);
        params.put("grant_type",  "authorization_code");
        params.put("redirect_uri", "http://localhost:8081");
        queue = Volley.newRequestQueue(this);
        request = myVolley.PostRequestString("https://www.reddit.com/api/v1/access_token", headers, params, new CallbackRequest() {
            @Override
            public void onSuccess(String response) {
                JSONObject json;
                try {
                    json = new JSONObject(response);
                    String token = json.getString("access_token");
                    String refreshToken = json.getString("refresh_token");
                    Log.d("Debug", token);
                    Log.d("Debug", refreshToken);
                } catch (JSONException e) {
                    e.printStackTrace();
                    return;
                }
            }
            @Override
            public void onFail(VolleyError error) {
                Log.d("Debug", error.toString());
            }
        });
        queue.add(request);
    }

    public void requestTwitch(String code) {
        HashMap<String, String> headers = new HashMap<>();
        HashMap<String, String> params = new HashMap<>();
        params.put("client_id", "cyl5w89xsw1ybpmc1cknlkw0u3k1xq");
        params.put("client_secret", "2nbmbdh6aov5um6cexvg90ubq43dlq");
        params.put("code", code);
        params.put("grant_type",  "authorization_code");
        params.put("redirect_uri", "http://localhost:8081");
        queue = Volley.newRequestQueue(this);
        request = myVolley.PostRequestString("https://id.twitch.tv/oauth2/token", headers, params, new CallbackRequest() {
            @Override
            public void onSuccess(String response) {
                JSONObject json;
                try {
                    json = new JSONObject(response);
                    String token = json.getString("access_token");
                    String refreshToken = json.getString("refresh_token");
                    Log.d("Debug", token);
                    Log.d("Debug", refreshToken);
                } catch (JSONException e) {
                    e.printStackTrace();
                    return;
                }
            }
            @Override
            public void onFail(VolleyError error) {
                Log.d("Debug", error.toString());
            }
        });
        queue.add(request);
    }

    public void requestGoogle(String code) {
        HashMap<String, String> headers = new HashMap<>();
        HashMap<String, String> params = new HashMap<>();
        headers.put("Content-Type", "application/x-www-form-urlencoded");
        params.put("client_id", "999158494432-ov6dopfhvl962pivtr02ci70gfbfbvs2.apps.googleusercontent.com");
        params.put("client_secret", "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");
        params.put("code", code);
        params.put("grant_type",  "authorization_code");
        params.put("redirect_uri", "http://localhost:8081");
        queue = Volley.newRequestQueue(this);
        request = myVolley.PostRequestString("https://oauth2.googleapis.com/token", headers, params, new CallbackRequest() {
            @Override
            public void onSuccess(String response) {
                JSONObject json;
                try {
                    json = new JSONObject(response);
                    String token = json.getString("access_token");
                    String refreshToken = json.getString("refresh_token");
                    Log.d("Debug", token);
                    Log.d("Debug", refreshToken);
                } catch (JSONException e) {
                    e.printStackTrace();
                    return;
                }
            }
            @Override
            public void onFail(VolleyError error) {
                Log.d("Debug", error.toString());
            }
        });
        queue.add(request);
    }

    @Override
    protected void onResume() {
        super.onResume();
        String uri = getIntent().getDataString();
        String code = "";
        String access_token = "";
        int start;
        int end;
        try {
            switch (serviceLogin) {
                case "spotify":
                    start = uri.indexOf("code=") + 5;
                    code = uri.substring(start);
                    requestSpotify(code);
                    break;
                case "reddit":
                    start = uri.indexOf("code=") + 5;
                    end = uri.indexOf("#");
                    code = uri.substring(start, end);
                    requestReddit(code);
                    break;
                case "github":
                    break;
                case "youtube":
                    start = uri.indexOf("code=") + 5;
                    end = uri.indexOf("&authuser");
                    code = uri.substring(start, end);
                    requestGoogle(code);
                    break;
                case "gmail":
                    start = uri.indexOf("code=") + 5;
                    end = uri.indexOf("&authuser");
                    code = uri.substring(start, end);
                    requestGoogle(code);
                    break;
                case "twitch":
                    start = uri.indexOf("code=") + 5;
                    end = uri.indexOf("&");
                    code = uri.substring(start, end);
                    requestTwitch(code);
                    break;
            }
            Log.d("Debug", "uri : " + uri);
            Log.d("Debug", "code : " + code);
            Log.d("Debug", "access_token : " + access_token);
        } catch (NullPointerException e) {
            Log.w("Exception", "Error : " + e);
        }
    }
}