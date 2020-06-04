var Login = function () {
	var Path = window.location.pathname;
    var APIPath = window.location.origin + Path.replace('/app/', '/services/').replace('index.html', '') + 'api.php';

	var handleLogin = function() {
		$('.login-form').validate({
	            errorElement: 'span', //default input error message container
	            errorClass: 'help-block', // default input error message class
	            focusInvalid: false, // do not focus the last invalid input
	            rules: {
	                EmailID: {
						required: true,
						email: true
	                },
	                Password: {
	                    required: true
	                },
	                Remember: {
	                    required: false
	                }
	            },

	            messages: {
	                EmailID: {
	                    required: "An email address is required."
	                },
	                Password: {
	                    required: "A password is required."
	                }
	            },

	            invalidHandler: function (event, validator) { //display error alert on form submit   
	                //$('.alert-danger', $('.login-form')).show();
	            },

	            highlight: function (element) { // hightlight error inputs
	                $(element)
	                    .closest('.form-group').addClass('has-error'); // set error class to the control group
	            },

	            success: function (label) {
	                label.closest('.form-group').removeClass('has-error');
	                label.remove();
	            },

	            errorPlacement: function (error, element) {
	                error.insertAfter(element.closest('.input-icon'));
	            },

	            submitHandler: function (form) {
	            }
			});
			
			$('.login-form .login-btn').click(function() {
				if ($('.login-form').valid()) {		

					$('.alert-danger', $('.login-form')).hide();

					var Dt = new Date();
					var TimezoneOffset = Dt.getTimezoneOffset();
					
					$("#login-btn").prop('disabled', true);
					// $.ajax({
					// 	url: APIPath,
					// 	type: 'POST',
					// 	data: {
					// 		EndPoint: 'Services/Settings/User',
					// 		EmailID: $('#mail').val(),
					// 		TimezoneOffset: TimezoneOffset
					// 	},
					// 	success: function(res) {
					// 		$("#login-btn").prop('disabled', false);
							
					// 		var Res = JSON.parse(res);
					// 		if (Res.S) {
					// 			Cookies.set(InitSettings.APP.CookieStorageName, Res['D']);
					// 			window.location.href = 'home.html';
					// 		} else {
					// 			$('.alert-danger', $('.login-form')).text(Res['M']);
					// 			$('.alert-danger', $('.login-form')).show();
					// 		}
					// 	}
					// });
				

					$.ajax({
						url: APIPath,
						type: 'POST',
						data: {
							EndPoint: 'Account/Authenticate/login',
							EmailID: $('#EmailID').val(),
							Password: $('#Password').val(),
							TimezoneOffset: TimezoneOffset
						},
						success: function(res) {
							$("#login-btn").prop('disabled', false);
							var Res = JSON.parse(res);
							if (Res.S) {
								Cookies.set(InitSettings.APP.CookieStorageName, Res['D']);
								window.location.href = 'home.html';
							} else {
								$('.alert-danger', $('.login-form')).text(Res['M']);
								$('.alert-danger', $('.login-form')).show();
							}
						}
					});
				}
			});

	        // $('.login-form input').keypress(function (e) {
	        //     if (e.which == 13) {
	        //         if ($('.login-form').validate().form()) {
	        //             $('.login-form').submit();
	        //         }
	        //         return false;
	        //     }
			// });
			
			$('#EmailID').keypress(function(event) {
				if (event.keyCode == 13) {
					$('#login-btn').click();  
				}
			});
		
			$('#Password').keypress(function(event) {
				if (event.keyCode == 13) {
					$('#login-btn').click();  
				}
			});
			$('#email').keypress(function(event) {
				if (event.keyCode == 13) {
					$('#submit-btn').click();  
				}
			});
	}

	var handleForgetPassword = function () {
		$('.forget-form').validate({
	            errorElement: 'span', //default input error message container
	            errorClass: 'help-block', // default input error message class
	            focusInvalid: false, // do not focus the last invalid input
	            ignore: "",
	            rules: {
	                email: {
	                    required: true,
	                    email: true
	                }
	            },

	            messages: {
	                email: {
	                    required: "Email is required."
	                }
	            },

	            invalidHandler: function (event, validator) { //display error alert on form submit   

	            },

	            highlight: function (element) { // hightlight error inputs
	                $(element)
	                    .closest('.form-group').addClass('has-error'); // set error class to the control group
	            },

	            success: function (label) {
	                label.closest('.form-group').removeClass('has-error');
	                label.remove();
	            },

	            errorPlacement: function (error, element) {
	                error.insertAfter(element.closest('.input-icon'));
	            },

	            submitHandler: function (form) {
	                form.submit();
	            }
			});
			
			$('.submit-btn').click(function() {
				$.ajax({
					url: APIPath,
                    type: 'POST',
					data: {
						EndPoint: 'Account/Authenticate/forgetPassword',
						EmailID: $('#email').val()
					},
					success: function(res) {
						$(".submit-btn").prop('disabled', false);
						var Res = JSON.parse(res);
						if (Res.S) {
							alert('Reset link successfully sent, please reset your password');
							window.location.href = 'index.html';
						} else {
							alert(Res.M);
							window.location.href = 'index.html';
						}
					}
				});
			});

	        $('.forget-form input').keypress(function (e) {
	            if (e.which == 13) {
	                if ($('.forget-form').validate().form()) {
	                    $('.forget-form').submit();
	                }
	                return false;
	            }
	        });

	        jQuery('#forget-password').click(function () {
	            jQuery('.login-form').hide();
	            jQuery('.forget-form').show();
	        });

	        jQuery('#back-btn').click(function () {
	            jQuery('.login-form').show();
	            jQuery('.forget-form').hide();
	        });

	}

	var handleRegister = function () {

		        function format(state) {
            if (!state.id) { return state.text; }
            var $state = $(
             '<span><img src="../assets/global/img/flags/' + state.element.value.toLowerCase() + '.png" class="img-flag" /> ' + state.text + '</span>'
            );
            
            return $state;
        }

        if (jQuery().select2 && $('#country_list').size() > 0) {
            $("#country_list").select2({
	            placeholder: '<i class="fa fa-map-marker"></i>&nbsp;Select a Country',
	            templateResult: format,
                templateSelection: format,
                width: 'auto', 
	            escapeMarkup: function(m) {
	                return m;
	            }
	        });


	        $('#country_list').change(function() {
	            $('.register-form').validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
	        });
    	}


         $('.register-form').validate({
	            errorElement: 'span', //default input error message container
	            errorClass: 'help-block', // default input error message class
	            focusInvalid: false, // do not focus the last invalid input
	            ignore: "",
	            rules: {
	                
	                fullname: {
	                    required: true
	                },
	                email: {
	                    required: true,
	                    email: true
	                },
	                address: {
	                    required: true
	                },
	                city: {
	                    required: true
	                },
	                country: {
	                    required: true
	                },

	                username: {
	                    required: true
	                },
	                password: {
	                    required: true
	                },
	                rpassword: {
	                    equalTo: "#register_password"
	                },

	                tnc: {
	                    required: true
	                }
	            },

	            messages: { // custom messages for radio buttons and checkboxes
	                tnc: {
	                    required: "Please accept TNC first."
	                }
	            },

	            invalidHandler: function (event, validator) { //display error alert on form submit   

	            },

	            highlight: function (element) { // hightlight error inputs
	                $(element)
	                    .closest('.form-group').addClass('has-error'); // set error class to the control group
	            },

	            success: function (label) {
	                label.closest('.form-group').removeClass('has-error');
	                label.remove();
	            },

	            errorPlacement: function (error, element) {
	                if (element.attr("name") == "tnc") { // insert checkbox errors after the container                  
	                    error.insertAfter($('#register_tnc_error'));
	                } else if (element.closest('.input-icon').size() === 1) {
	                    error.insertAfter(element.closest('.input-icon'));
	                } else {
	                	error.insertAfter(element);
	                }
	            },

	            submitHandler: function (form) {
	                form.submit();
	            }
	        });

			$('.register-form input').keypress(function (e) {
	            if (e.which == 13) {
	                if ($('.register-form').validate().form()) {
	                    $('.register-form').submit();
	                }
	                return false;
	            }
	        });

	        jQuery('#register-btn').click(function () {
	            jQuery('.login-form').hide();
	            jQuery('.register-form').show();
	        });

	        jQuery('#register-back-btn').click(function () {
	            jQuery('.login-form').show();
	            jQuery('.register-form').hide();
	        });
	}
    
    return {
        //main function to initiate the module
        init: function () {
        	
            handleLogin();
            handleForgetPassword();
            handleRegister();    

            // init background slide images
		    $.backstretch([
		        "../assets/pages/media/bg/1.jpg",
		        "../assets/pages/media/bg/2.jpg",
		        "../assets/pages/media/bg/3.jpg",
		        "../assets/pages/media/bg/4.jpg"
		        ], {
		          fade: 1000,
		          duration: 8000
		    	}
        	);
        }
    };

}();

jQuery(document).ready(function() {
    Login.init();
});