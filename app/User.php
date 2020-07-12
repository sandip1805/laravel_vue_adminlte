<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use DateTimeInterface;
use Carbon\Carbon;
use Laravel\Passport\HasApiTokens;
class User extends Authenticatable
{
    use Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password','type','bio'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected $appends = ['display'];

    /* protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    } */

    public function getDateOfBirthAttribute($date) {
        if (!empty($date))
        return Carbon::parse($date)->format('d/m/Y');
    }

    //public function setDateOfBirthAttribute($date) {
        /* $date1 = '2020-05-05';
        $a = Carbon::parse($date1)->toDateTimeString();
        dd($a); */
        //$this->attributes['date_of_birth'] = Carbon::parse($date)->toDateTimeString();
    //}

    public function getDisplayAttribute() {
        return 'car';
        /* $t = Carbon::parse($date)->format('d/m/Y');
        dd($t); */
    }
}
