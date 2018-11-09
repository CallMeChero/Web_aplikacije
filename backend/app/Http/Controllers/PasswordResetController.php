<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Mail;
use App\Mail\ResetPasswordEmail;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class PasswordResetController extends Controller
{
	public function sendPasswordEmail(Request $request) {

		$email = $request->email;
		if(!$this->validateUser($email)) {
			return $this->failed();
		}

		$this->sendEmail($email);
		$this->success();
	}

	public function validateUser($email) {
		return User::where('email','=',$email)->first() ? true : false;
	}

	public function failed() {

		return response()->json([
			'error' => "Email doesn't exist"
		], Response::HTTP_NOT_FOUND);
	}

	public function sendEmail($email) {

		$token = $this->createToken($email);
		Mail::to($email)->send(new ResetPasswordEmail($token));
	}

	public function success(){
		return response()->json([
			'data' => "Check your mailbox :)"
		], Response::HTTP_OK);
	}

	public function createToken($email) {

		$duplicateToken = DB::table('password_resets')->where('email', '=', $email)->first();
		if($duplicateToken) {
			return $duplicateToken;
		}

		$token = str_random(60);
		$this->saveToken($token,$email);
		return $token;
	}

	public function saveToken($token, $email) {

        DB::table('password_resets')->insert([
            'email' => $email,
            'token' => $token,
            'created_at' => Carbon::now()
        ]);
    }
}
