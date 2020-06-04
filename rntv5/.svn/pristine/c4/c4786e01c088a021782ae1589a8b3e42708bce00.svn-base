$(document).ready(function() {

    Cookies.remove(InitSettings.APP.CookieStorageName);

	$('#PinPage').hide();
	$('#ForgotPasswordPage').hide();
    $('#ForgotPinPage').hide();
    $(".IsLoading").hide("hidden");

	$.validator.addMethod(
        "regex",
        function(value, element, regexp) {
            var re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
        },
        "Please enter a valid email address."
    );

    $('#Login').click(function() {
        LoginCredential();
    });

    $('#LoginName').keypress(function(event) {
        if (event.keyCode == 13) {
            $('#Login').click();  
        }
    });

    $('#LoginPass').keypress(function(event) {
        if (event.keyCode == 13) {
            $('#Login').click();  
        }
    });

    function LoginCredential() {
        $('#LoginForm').validate({
            errorElement: 'span',
            rules: {
                LoginName: {required: true},
                LoginPass: {required: true, minlength: 6}
            },
            messages: {
                LoginName: "Enter your username",
                LoginPass: {
                    required: "Enter your password",
                    minlength: "Please enter at least 6 characters"
                }
            },
            submitHandler: function(form) {
                $(".IsLoading").show("visible");
                var FormData = GetFormData('LoginForm');
                FormData['FunctionName'] = 'Login';
                var Data = {'PostData' : AesEncryption(FormData)};

                $.ajax({
                    url     : '../services/app/account/login.php',
                    type    : 'POST',
                    data    : Data,
                    success : function(Res) {
                        var ResData = AesDecryption(Res);
                        console.log(ResData);

                        $(".IsLoading").hide("hidden");
                        if($('#rememberme').is(":checked")) {
                            Cookies.set(InitSettings.APP.LoginName, $('#LoginName').val());
                        } else {
                           Cookies.remove(InitSettings.APP.LoginName);
                        }

                        if(ResData.Status == 'S') {
                             var LoginID = ResData['LoginID'];
                            $("#LoginID").val(LoginID);
                            $('#PinPage').slideToggle();
                            $('#title').text("PIN Validation");
                            $('#PinPass').focus();
                            $('#LoginPage').hide();
                        }
                        else if(ResData.Status == 'D') {
                            $('.InvalidAccountError').removeClass('hide');
                        }
                        else {
                            $('.InvalidPasswordError').removeClass('hide');
                        }
                    }
                });
            }
        });
    }

    $("#LoginPass").on("change keyup paste", function() {
       $('.InvalidPasswordError').addClass('hide');
       $('.InvalidAccountError').addClass('hide');
    });  

	$('#PinForm').validate({
		errorElement: 'span',
        rules: {
            PinPass: {required: true, minlength: 4}
        },
        messages: {
			PinPass: {
				required: "Enter your PIN",
				minlength: "Please enter at least 4 characters"
			}
        },
        submitHandler: function(form) {
            $(".IsLoading").show("visible");
            
            var Dt = new Date();
            var TimezoneOffset = Dt.getTimezoneOffset();

            var FormData = GetFormData('PinForm');
            FormData['FunctionName']    = 'PinValidation';
            FormData['TimezoneOffset']  = TimezoneOffset;

            var Parms = {'PostData' : AesEncryption(FormData)};

            $.ajax({
                url     : '../services/app/account/login.php',
                type    : 'POST',
                data    : Parms,
                success : function(Res) {
                    var ResData = AesDecryption(Res);
                    $(".IsLoading").hide("hidden");

                    if(ResData.Status == 'S') {
                        Cookies.set(InitSettings.APP.CookieStorageName, ResData['StorageData']);
                        window.location.href = 'home.html'; 
                    }
                    else {
                        $('.InvalidPinError').removeClass('hide');
                    }
                }
            });
        }
    });

    $("#PinPass").on("change keyup paste", function() {
        $('.InvalidPinError').addClass('hide');
    });

    $('#ForgotPasswordForm').validate({
		errorElement: 'span',
        rules: {
            Email: {required: true, email: true, regex: /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/}
        },
        submitHandler: function(form) {
            // if($("#email_id").val() == 'admin@mail.com') {
            //     window.location.href = 'home.html'; 
            // }
            // else {
            //     alert("Invalid Email");
            // }
            $(".IsLoading").show("visible");

            var FormData = GetFormData('ForgotPasswordForm');
            FormData['FunctionName']    = 'ForgotPassword';

            var Parms = {'PostData' : AesEncryption(FormData)};
            $.ajax({
                url: '../services/app/account/login.php',
                type: 'POST',
                data: Parms,
                success: function(Res) {
                    var ResData = AesDecryption(Res);
                    console.log(ResData);
                    $(".IsLoading").hide("hidden");
                    if (ResData['Status'] == 'S') {
                        $('#ModalForgotPasswordSuccess').modal('show');
                        // window.location.href = 'home/index.html';
                    } else {
                        $('.InvalidEmailError').removeClass('hide');
                    }
                }
            });
        }
    });

    $('#ForgotPinForm').validate({
        errorElement: 'span',
        rules: {
            Email: {required: true, email: true, regex: /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/}
        },
        submitHandler: function(form) {
            $(".IsLoading").show("visible");

            var FormData = GetFormData('ForgotPinForm');
            FormData['FunctionName']    = 'ForgotPin';

            var Parms = {'PostData' : AesEncryption(FormData)};

            $.ajax({
                url: '../services/app/account/login.php',
                type: 'POST',
                data: Parms,
                success: function(Res) {
                    var ResData = AesDecryption(Res);
                    console.log(ResData);
                    $(".IsLoading").hide("hidden");
                    if (ResData['Status'] == 'S') {
                        $('#ModalForgotPinSuccess').modal('show');
                    } else {
                        $('.InvalidEmailIDError').removeClass('hide');
                    }
                }
            });
        }
    });

    $("#Email").on("change keyup paste", function() {
        $('.InvalidEmailError').addClass('hide');
    });

    $("#EmailID").on("change keyup paste", function() {
        $('.InvalidEmailIDError').addClass('hide');
    });

    
    $("#ResetForm").validate({
        errorElement: 'span',
        rules: {
            NewPassword: {required: true, minlength: 8},
            ConfirmPassword: {
                equalTo: "#NewPassword"
            }
        },
        messages: {
            NewPassword: " Enter your password atleast 6 characters",
            ConfirmPassword: " Confirm password doesn't match"
        },
   
        submitHandler: function(form) {
            $(".IsLoading").show("visible");
            var Email = window.location.href.slice(window.location.href.indexOf('=') + 1);
            // var Parems = {'FunctionName': 'ResetPassword', 'Password': $('#NewPassword').val(), 'Email': Email}

            var FormData = GetFormData('ResetForm');
            FormData['FunctionName']    = 'ResetPassword';
            FormData['Email'] = Email;

            var Parms = {'PostData' : AesEncryption(FormData)};

            $.ajax({
                url: '../services/app/account/login.php',
                data: Parms,
                type: 'POST',
                success: function(Res) {
                    var ResData = AesDecryption(Res);
                    console.log(ResData);
                    $(".IsLoading").hide("hidden");
                    if (ResData['Status'] == 'S') {
                        $('#ModalResetSuccess').modal('show');
                        setTimeout(function() {
                            window.location.href="index.html";
                        }, 1000)
                    }
                }
            });
        }
    });
    
    $("#ResetPinForm").validate({
        errorElement: 'span',
        rules: {
            NewPin: {required: true, minlength: 4},
            ConfirmPin: {
                equalTo: "#NewPin"
            }
        },
        messages: {
            NewPin: " Please enter only 4 digits",
            ConfirmPin: " Confirm PIN doesn't match."
        },
   
        submitHandler: function(form) {
            $(".IsLoading").show("visible");
            var Email = window.location.href.slice(window.location.href.indexOf('=') + 1);
            // var Parems = {'FunctionName': 'ResetPassword', 'Password': $('#NewPassword').val(), 'Email': Email}

            var FormData = GetFormData('ResetPinForm');
            FormData['FunctionName']    = 'ResetPin';
            FormData['Email'] = Email;

            var Parms = {'PostData' : AesEncryption(FormData)};

            $.ajax({
                url: '../services/app/account/login.php',
                data: Parms,
                type: 'POST',
                success: function(Res) {
                    var ResData = AesDecryption(Res);
                    console.log(ResData);
                    $(".IsLoading").hide("hidden");
                    if (ResData['Status'] == 'S') {
                        $('#ModalResetPinSuccess').modal('show');
                        setTimeout(function() {
                            window.location.href="index.html";
                        }, 1000)
                    }
                }
            });
        }
    });


    $('#ForgotPasswordSection').click(function() {
    	$('#LoginContainer').hide();
		$('#ForgotPasswordPage').slideToggle();
    });

    $('#ForgotPinSection').click(function() {
        $('#LoginContainer').hide();
        $('#ForgotPinPage').slideToggle();
    });

    $('#ForgotPasswordBack').click(function() {
    	$('#LoginContainer').slideToggle();
		$('#ForgotPasswordPage').hide();
    });

    $('#ForgotPinBack').click(function() {
        $('#LoginContainer').slideToggle();
        $('#ForgotPinPage').hide();
    });

    $('#LoginName').val(Cookies.get(InitSettings.APP.LoginName));

    function AesEncryption(Data) {
        return CryptoJS.AES.encrypt(JSON.stringify(Data), InitSettings.GLOBAL.AesKey, {format: CryptoJSAesJson}).toString();
    }
    function AesDecryption(Data) {
        return JSON.parse(CryptoJS.AES.decrypt(Data, InitSettings.GLOBAL.AesKey, {format: CryptoJSAesJson}).toString(CryptoJS.enc.Utf8));
    }

    function GetFormData(FormId) {
        var ResData = new Object();
        var FormDataArr = $("#"+FormId).serializeArray();
        FormDataArr.forEach(function(Item) {
            ResData[Item.name] = Item.value;
        });
        return ResData;
    }
});

