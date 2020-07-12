<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Laravel\Passport\Passport;
class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        // 'App\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Gate::define('isAdmin',function($user){
            return $user->type === 'admin';
        });

        Gate::define('isAuthor',function($user){
            return $user->type === 'author';
        });

        Gate::define('isUser',function($user){
            return $user->type === 'user';
        });

        // use guest in blade file
        /* @can('isAdmin')
        <li class="nav-item">
                <router-link to="/developer" class="nav-link">
                    <i class="nav-icon fas fa-cogs"></i>
                    <p>
                        Developer
                    </p>
                </router-link>
         </li>
         @endcan */
        Passport::routes();
        //Passport::tokensExpireIn(now()->addMinutes(120));
        //Passport::tokensExpireIn(now()->addSeconds(20));

    }
}
