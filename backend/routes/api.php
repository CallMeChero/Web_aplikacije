<?php
	Route::group([

	    'middleware' => 'api',

	], function () {

	    Route::post('login', 'AuthController@login');
	    Route::post('signup', 'AuthController@signup');
	    Route::post('logout', 'AuthController@logout');
	    Route::post('me', 'AuthController@me');
	    Route::post('refresh', 'AuthController@refresh');
	    Route::post('request-reset', 'PasswordResetController@sendPasswordEmail');
	    Route::post('reset-rassword', 'ChangePasswordController@changePassword');

	});