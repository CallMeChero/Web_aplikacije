<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\ChangePasswordRequest;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;
use App\User;


class ChangePasswordController extends Controller
{
    public function changePassword(ChangePasswordRequest $request) {
    	return $this->getPasswordResetTable($request)->count() > 0 ? $this->changePass($request) : $this->tokenNotFound();
    }

    public function getPasswordResetTable($request) {
    	return DB::table('password_resets')->where(['email' => $request->email, 'token' => $request->resetToken]);
    }

    public function tokenNotFound() {

    	return response()->json([
    		'error' => 'Token or email does not exist'
    	], Response::HTTP_UNPROCESSABLE_ENTITY);

    }

    public function changePass($request) {

    	$email = $request->email;
    	$user = User::where('email', '=', $email)->first();

    	//vec smo u modelu napraviti mutaciju za pass, tak da nam tu ne treba bcrypt
    	$user->update(['password' => $request->password]);
    	$this->getPasswordResetTable($request)->delete();

    	return response()->json(['data' => 'Password is changed. Do not forget it now.'], Response::HTTP_CREATED);
    }
}
