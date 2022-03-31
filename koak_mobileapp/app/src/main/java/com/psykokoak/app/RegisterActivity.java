package com.psykokoak.app;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.app.ProgressDialog;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;

public class RegisterActivity extends AppCompatActivity {

    TextView alreadyAccount;
    EditText inputEmail, inputPassword;
    Button registerBtn;
    String emailPattern = "[a-zA-Z0-9._-]+@[a-z]+\\.+[a-z]+";
    ProgressDialog progressDialog;

    FirebaseAuth mAuth;
    FirebaseUser mUser;

    Button googleBtn;
    Button githubBtn;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        alreadyAccount=findViewById(R.id.alreadyAccount);
        inputEmail=findViewById(R.id.inputEmail);
        inputPassword=findViewById(R.id.inputPassword);
        registerBtn=findViewById(R.id.registerBtn);

        progressDialog=new ProgressDialog(this);

        mAuth=FirebaseAuth.getInstance();
        mUser=mAuth.getCurrentUser();

        googleBtn = findViewById(R.id.googleBtn);
        githubBtn = findViewById(R.id.githubBtn);

        //register button with google
        googleBtn.setOnClickListener(v -> {
            Intent intent=new Intent(RegisterActivity.this, GoogleSignInActivity.class);
            startActivity(intent);
        });

        //register button with github
        githubBtn.setOnClickListener(v -> {
            Intent intent=new Intent(RegisterActivity.this, GithubSignInActivity.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK|Intent.FLAG_ACTIVITY_NEW_TASK);
            startActivity(intent);
        });

        alreadyAccount.setOnClickListener(v -> startActivity(new Intent(RegisterActivity.this,MainActivity.class)));


        //register function
        registerBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                PerformAuth();
            }

            private void PerformAuth() {
                String email=inputEmail.getText().toString();
                String password=inputPassword.getText().toString();

                if (!email.matches(emailPattern)) {
                    inputEmail.setError("Enter proper email form");
                } else if (password.isEmpty() || password.length() < 6) {
                    inputPassword.setError("Enter proper password");
                } else {
                    progressDialog.setMessage("Please wait while Registration");
                    progressDialog.setCanceledOnTouchOutside(false);
                    progressDialog.show();

                    //create user with email and password with firebase
                    mAuth.createUserWithEmailAndPassword(email, password).addOnCompleteListener(new OnCompleteListener<AuthResult>() {
                        @Override
                        public void onComplete(@NonNull Task<AuthResult> task) {
                            if (task.isSuccessful()) {
                                progressDialog.dismiss();
                                sendUserToNextActivity();
                                Toast.makeText(RegisterActivity.this, "Registration successful", Toast.LENGTH_SHORT).show();
                            } else {
                                progressDialog.dismiss();
                                Toast.makeText(RegisterActivity.this, ""+task.getException(), Toast.LENGTH_SHORT).show();
                            }
                        }

                        //start next activity after registration
                        private void sendUserToNextActivity() {
                            Intent intent=new Intent(RegisterActivity.this, HomeActivity.class);
                            intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK|Intent.FLAG_ACTIVITY_NEW_TASK);
                            startActivity(intent);
                        }
                    });
                }
            }
        });
    }
}