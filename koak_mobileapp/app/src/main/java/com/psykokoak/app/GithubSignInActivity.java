package com.psykokoak.app;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.OAuthProvider;

import java.util.ArrayList;
import java.util.List;

public class GithubSignInActivity extends AppCompatActivity {

    EditText inputEmail;
    Button loginBtn;
    String emailPattern = "[a-zA-Z0-9._-]+@[a-z]+\\.+[a-z]+";
    FirebaseAuth mAuth;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_github_sign_in);

        inputEmail=findViewById(R.id.inputEmail);
        loginBtn=findViewById(R.id.loginBtn);
        mAuth=FirebaseAuth.getInstance();

        //button for login with github
        loginBtn.setOnClickListener(v -> {
            String email=inputEmail.getText().toString();
            Log.d("DEBUG", "email = " + email);
            if (!email.matches(emailPattern)) {
                Toast.makeText(GithubSignInActivity.this, "Enter a proper email", Toast.LENGTH_SHORT).show();
            } else {
                OAuthProvider.Builder provider = OAuthProvider.newBuilder("github.com");
                provider.addCustomParameter("login", email);
                List<String> scopes =
                        new ArrayList<String>() {
                            {
                                add("user:email");
                            }
                        };
                provider.setScopes(scopes);

                Task<AuthResult> pendingResultTask = mAuth.getPendingAuthResult();
                if (pendingResultTask != null) {
                    pendingResultTask
                            .addOnSuccessListener(
                                    authResult -> {})
                            .addOnFailureListener(
                                    e -> Toast.makeText(GithubSignInActivity.this, ""+e.getMessage(), Toast.LENGTH_SHORT).show());
                } else {
                    mAuth
                            .startActivityForSignInWithProvider(GithubSignInActivity.this, provider.build())
                            .addOnSuccessListener(
                                    authResult -> OpenNextActivity())
                            .addOnFailureListener(
                                    e -> Toast.makeText(GithubSignInActivity.this, ""+e.getMessage(), Toast.LENGTH_LONG).show());
                }
            }
        });
    }

    //start the next activity after login
    private void OpenNextActivity() {
        Intent intent=new Intent(GithubSignInActivity.this, HomeActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK|Intent.FLAG_ACTIVITY_NEW_TASK);
        startActivity(intent);
        finish();
    }
}