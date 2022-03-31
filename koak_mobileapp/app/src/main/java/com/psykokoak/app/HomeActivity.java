package com.psykokoak.app;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.Spinner;

import androidx.appcompat.app.AppCompatActivity;

import com.android.volley.RequestQueue;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;

import java.util.HashMap;

public class HomeActivity extends AppCompatActivity {

    Spinner services_name, actions_services, services_reactions, reactions_triggers;
    String selected_services, selected_actions, selected_reactions, selected_triggers;
    String request_services_actions, request_services_reactions;
    Button button;
    ImageButton signOutBtn;
    Button GoToServices;
    RequestQueue queue;
    StringRequest request;
    AVolley myVolley = new AVolley();
    String stringKoak;
    EditText nameKoak;
    EditText descriptionBox;
    FirebaseAuth mAuth;
    FirebaseUser mUser;
    String credential;
    Button PutCredential;
    String accessToken;


    //send koak to the server in a string
    public void requestKoak(CallbackRequest callback) {
        stringKoak = request_services_actions + selected_actions + request_services_reactions + selected_triggers;
        HashMap<String, String> headers = new HashMap<>();
        HashMap<String, String> params = new HashMap<>();
        params.put("name", nameKoak.getText().toString());
        headers.put("credential", credential);
        Log.d("Debug", "StringKoak: " + stringKoak + "    credential: " + credential);
        queue = Volley.newRequestQueue(this);
        request = myVolley.PostRequestString("http://localhost:8080" + stringKoak, headers, params, new CallbackRequest() {
            @Override
            public void onSuccess(String response) {
                Log.d("Debug", stringKoak);
            }
        });
        queue.add(request);
    }

    public void requestLoginGoogle(CallbackRequest callback) {
        HashMap<String, String> headers = new HashMap<>();
        HashMap<String, String> params = new HashMap<>();
        headers.put("credential", credential);
        Log.d("Debug", "credential: " + credential);
        queue = Volley.newRequestQueue(this);
        request = myVolley.PostRequestString("http://localhost:8080/auth/login", headers, params, new CallbackRequest() {
            @Override
            public void onSuccess(String response) {
                Log.d("Debug", "You are successfully connected");
            }
        });
        queue.add(request);
    }

    public void goToActivity(Class classname) {
        Intent intent = new Intent(this, classname);
        startActivity(intent);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);

        mAuth = FirebaseAuth.getInstance();
        mUser = mAuth.getCurrentUser();
        credential = mUser.getUid();

        services_name = findViewById(R.id.services_name);
        actions_services = findViewById(R.id.action_services);
        services_reactions = findViewById(R.id.services_reactions);
        reactions_triggers = findViewById(R.id.reactions_triggers);
        button = findViewById(R.id.button);
        GoToServices = findViewById(R.id.ServicesButton);
        nameKoak = findViewById(R.id.koakString);
        signOutBtn = findViewById(R.id.logoutBtn);
        PutCredential = findViewById(R.id.credential);

        signOutBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mAuth.signOut();
                signOutUser();
            }
        });

        PutCredential.setOnClickListener(v -> requestLoginGoogle(new CallbackRequest()));

        //spinner with the services names
        services_name.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                selected_services = parent.getItemAtPosition(position).toString();
                switch (selected_services) {
                    case "Spotify":
                        actions_services.setAdapter(new ArrayAdapter<>(HomeActivity.this,
                                android.R.layout.simple_spinner_dropdown_item,
                                getResources().getStringArray(R.array.spotify_services)));
                        request_services_actions = "/spotify";
                        break;
                    case "Twitch":
                        actions_services.setAdapter(new ArrayAdapter<>(HomeActivity.this,
                                android.R.layout.simple_spinner_dropdown_item,
                                getResources().getStringArray(R.array.twitch_services)));
                        request_services_actions = "/twitch";
                        break;
                    case "Gmail":
                        actions_services.setAdapter(new ArrayAdapter<>(HomeActivity.this,
                                android.R.layout.simple_spinner_dropdown_item,
                                getResources().getStringArray(R.array.gmail_services)));
                        request_services_actions = "/gmail";
                        break;
                    case "Youtube":
                        actions_services.setAdapter(new ArrayAdapter<>(HomeActivity.this,
                                android.R.layout.simple_spinner_dropdown_item,
                                getResources().getStringArray(R.array.youtube_services)));
                        request_services_actions = "/youtube";
                        break;
                    case "Reddit":
                        actions_services.setAdapter(new ArrayAdapter<>(HomeActivity.this,
                                android.R.layout.simple_spinner_dropdown_item,
                                getResources().getStringArray(R.array.reddit_services)));
                        request_services_actions = "/reddit";
                        break;

                    case "Github":
                        actions_services.setAdapter(new ArrayAdapter<>(HomeActivity.this,
                                android.R.layout.simple_spinner_dropdown_item,
                                getResources().getStringArray(R.array.github_services)));
                        request_services_actions = "/github";
                        break;
                }
                actions_services.setVisibility(View.VISIBLE);
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {
            }
        });

        //spinner with actions
        actions_services.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                selected_actions = parent.getItemAtPosition(position).toString();
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {
            }
        });

        //spinner with the services names
        services_reactions.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                selected_reactions = parent.getItemAtPosition(position).toString();
                switch (selected_reactions) {
                    case "Spotify":
                        reactions_triggers.setAdapter(new ArrayAdapter<>(HomeActivity.this,
                                android.R.layout.simple_spinner_dropdown_item,
                                getResources().getStringArray(R.array.triggers_spotify)));
                        request_services_reactions = "/spotify";
                        break;
                    case "Gmail":
                        reactions_triggers.setAdapter(new ArrayAdapter<>(HomeActivity.this,
                                android.R.layout.simple_spinner_dropdown_item,
                                getResources().getStringArray(R.array.triggers_gmail)));
                        request_services_reactions = "/gmail";
                        break;
                    case "Youtube":
                        reactions_triggers.setAdapter(new ArrayAdapter<>(HomeActivity.this,
                                android.R.layout.simple_spinner_dropdown_item,
                                getResources().getStringArray(R.array.triggers_youtube)));
                        request_services_reactions = "/youtube";
                        break;
                    case "Reddit":
                        reactions_triggers.setAdapter(new ArrayAdapter<>(HomeActivity.this,
                                android.R.layout.simple_spinner_dropdown_item,
                                getResources().getStringArray(R.array.triggers_reddit)));
                        request_services_reactions = "/reddit";
                        break;
                }
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {
            }
        });

        //spinner with triggers
        reactions_triggers.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                selected_triggers = parent.getItemAtPosition(position).toString();
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {
            }
        });
        button.setOnClickListener(v -> requestKoak(new CallbackRequest()));
        GoToServices.setOnClickListener(v -> goToActivity(LoginServicesActivity.class));
    }


    //sign out user on home
    private void signOutUser() {
        Intent mainActivity = new Intent(HomeActivity.this, MainActivity.class);
        mainActivity.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(mainActivity);
        finish();
    }
}