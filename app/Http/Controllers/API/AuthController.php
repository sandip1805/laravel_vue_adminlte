<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Laravel\Passport\Client;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;
use App\User;
class AuthController extends Controller
{



    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $rules = [
            'email'=>'required|string|email|max:255',
            'password'=>'required|string|min:5'
        ];
        $messages = [
        ];

       $this->validate($request, $rules, $messages);

         // Check if a user with the specified email exists
        $user = User::where('email',$request->email)->first();
        if (!$user) {
            return response()->json([
                'message' => 'Wrong email or password'
            ], 422);
        }

        // If a user with the email was found - check if the specified password
        // belongs to this user
        if (!Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Wrong email or password'
            ], 422);
        }

        $passwordGrantClient = Client::Where('password_client', 1)->first();

        // Check if the request was successful
         // Make sure a Password Client exists in the DB
        if (!$passwordGrantClient) {
            return response()->json([
                'message' => 'Laravel Passport is not setup properly.'
            ], 500);
        }
        $data = [
            'grant_type' => 'password',
            'client_id' => $passwordGrantClient->id,
            'client_secret' => $passwordGrantClient->secret,
            'username' => $request->email,
            'password' => $request->password,
            'scope' => '*'
        ];
        $tokenRequest = Request::create('/oauth/token', 'POST', $data);
        $passportRes = app()->handle($tokenRequest);

        // Check if the request was successful
        if ($passportRes->getStatusCode() != 200) {
            return response()->json([
                'message' => 'Wrong email or password'
            ], 422);
        }

         // Get the data from the response
        $data = json_decode($passportRes->getContent());
        $data->user = $user;
        return ['data'=>$data];

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $rules = [
            'name'=>'required|string|max:255',
            'email'=>'required|string|email|max:255|unique:users',
            'password'=>'required|string|min:5',
            'confirm_password'=>'required|string|min:5',
        ];
        $messages = [
            'name.required'=>'Full Name fileld is required',
            'email.unique'=>'Email is already exists',
        ];

        $this->validate($request, $rules, $messages);

        $user = new User;
        $user->name = $request->name;
        $user->email = $request->email;
        $user->type = 'user';
        $user->password = Hash::make($request->password);
        $user->save();

        return ['message'=>'Registration has been done successfully'];
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function refreshToken(Request $request)
    {
        $passwordGrantClient = Client::Where('password_client', 1)->first();

        $data = [
            'grant_type' => 'refresh_token',
            'refresh_token' => $request->refresh_token,
            'client_id' => $passwordGrantClient->id,
            'client_secret' => $passwordGrantClient->secret,
            'scope' => '*'
        ];
        $tokenRequest = Request::create('/oauth/token', 'POST', $data);
        return app()->handle($tokenRequest);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return[
            'message' => 'You have been successfully logged out!'
        ];
    }

}
