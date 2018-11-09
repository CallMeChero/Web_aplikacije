@component('mail::message')
We are here to help you reset your password! :)

Do you really want to reset your password?

@component('mail::button', ['url' => 'http://localhost:4200/response-reset?token='.$token])
Reset my Password
@endcomponent

Thanks,<br>
David Ćeranić
@endcomponent
