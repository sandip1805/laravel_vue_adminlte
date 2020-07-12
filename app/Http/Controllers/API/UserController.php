<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Storage;
use Carbon\Carbon;
use App\User;
class UserController extends Controller
{

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //$this->authorize('isAdmin');
        //$this->middleware('auth:api');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return User::latest()->paginate(10);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $rules = [
            'name'=>'required|string|max:255',
            'email'=>'required|string|email|max:255|unique:users',
            'password'=>'required|string|min:6',
            'confirm_password'=>'required|string|min:6',
            'date_of_birth'=>'required',
        ];
        $messages = [
            'name.required'=>'Name fileld is required',
            'email.unique'=>'Email is already exists'
        ];

        $this->validate($request, $rules, $messages);

        $user = new User;
        $user->name = $request->name;
        $user->email = $request->email;
        $user->type = $request->type;
        $user->bio = $request->bio;
        $user->photo = $request->photo;
        $user->password = Hash::make($request->password);
        $user->date_of_birth = Carbon::parse($request->date_of_birth)->toDateTimeString();
        $user->save();

        return $request->all();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {

        //Find user
        $user = User::findOrFail($id);

        return $user;
    }

    public function profile(Request $request)
    {
        return $request->user();
    }

    public function updateProfile(Request $request)
    {
        $userData = $request->user();

        $this->validate($request,[
            'name' => 'required|string|max:191',
            'email' => 'required|string|email|max:191|unique:users,email,'.$userData->id,
            'password' => 'sometimes|required|min:6'
        ]);

        // Path to the project's root folder
        //echo base_path();

        // Path to the 'app' folder
        //echo app_path();

        // Path to the 'public' folder
        //echo public_path();

        // Path to the 'storage' folder
        //echo storage_path();

        // Path to the 'storage/app' folder
        //echo storage_path('app');
        //$file = $request->photo;
        //$path = $request->photo->path();
        //$extension = $request->photo->extension();
        //$request->photo->storeAs(public_path('img/profile'), $imageName);
        $currentPhoto = $userData->photo;
        if($request->photo != $currentPhoto){
            $name = time().'.' . explode('/', explode(':', substr($request->photo, 0, strpos($request->photo, ';')))[1])[1];
            \Image::make($request->photo)->save(public_path('img/profile/').$name);

            $request->merge(['photo' => $name]);
            $userPhoto = public_path('img/profile/').$currentPhoto;
            if(file_exists($userPhoto)){
                @unlink($userPhoto);
            }
        }

        //$userData->update($request->all());
        $userData->name = $request->name;
        $userData->email = $request->email;
        $userData->bio = $request->bio;
        $userData->photo = $request->photo;
        if(!empty($request->password)){
            $userData->password = Hash::make($request->password);
        }
        $userData->save();
        return ['message'=>'Profile has been updated.'];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

        $rules = [
            'name'=>'required|string|max:255',
            'email'=>'required|string|email|max:255|unique:users,email,'.$id,
            'password'=>'sometimes|string|min:6',
            'confirm_password'=>'sometimes|string|min:6',
            'date_of_birth'=>'required',
        ];
        $messages = [
            'name.required'=>'Name fileld is required',
            'email.unique'=>'Email is already exists'
        ];

        $this->validate($request, $rules, $messages);

        if (preg_match("/^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/",$request->date_of_birth)) {
            $request->date_of_birth = Carbon::createFromFormat('d/m/Y', $request->date_of_birth)->format("yy-m-d H:i:s");
        } else {
            $request->date_of_birth = Carbon::parse($request->date_of_birth)->toDateTimeString();
        }

        $user = User::findOrFail($id);
        $user->name = $request->name;
        $user->email = $request->email;
        $user->type = $request->type;
        $user->bio = $request->bio;
        $user->photo = $request->photo;
        if (isset($request->password) && !empty($request->password)) {
            $user->password = Hash::make($request->password);
        }
        $user->date_of_birth = $request->date_of_birth;
        $user->save();

        return ['message'=>'Record has been updated.'];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //Added Access Control List To Prevent From Delete
        //Only Admin Can Delete the Record
        $this->authorize('isAdmin');
        //Find user
        $user = User::findOrFail($id);
        //delete user
        $user->delete();
        return ['message'=>'Record has been deleted.'];
        //return response()->json(['message'=>'Record has been deleted.'], 201);
    }
}
