var FormEditable = function() {

    $.mockjaxSettings.responseTime = 500;

    var log = function(settings, response) {
        var s = [],
            str;
        s.push(settings.type.toUpperCase() + ' url = "' + settings.url + '"');
        for (var a in settings.data) {
            if (settings.data[a] && typeof settings.data[a] === 'object') {
                str = [];
                for (var j in settings.data[a]) {
                    str.push(j + ': "' + settings.data[a][j] + '"');
                }
                str = '{ ' + str.join(', ') + ' }';
            } else {
                str = '"' + settings.data[a] + '"';
            }
            s.push(a + ' = ' + str);
        }
        s.push('RESPONSE: status = ' + response.status);

        if (response.responseText) {
            if ($.isArray(response.responseText)) {
                s.push('[');
                $.each(response.responseText, function(i, v) {
                    s.push('{value: ' + v.value + ', text: "' + v.text + '"}');
                });
                s.push(']');
            } else {
                s.push($.trim(response.responseText));
            }
        }
        s.push('--------------------------------------\n');
        $('#console').val(s.join('\n') + $('#console').val());
    }

    var initAjaxMock = function() {
        //ajax mocks

        $.mockjax({
            url: '/post',
            response: function(settings) {
                log(settings, this);
            }
        });

        $.mockjax({
            url: '/error',
            status: 400,
            statusText: 'Bad Request',
            response: function(settings) {
                this.responseText = 'Please input correct value';
                log(settings, this);
            }
        });

        $.mockjax({
            url: '/status',
            status: 500,
            response: function(settings) {
                this.responseText = 'Internal Server Error';
                log(settings, this);
            }
        });

        $.mockjax({
            url: '/groups',
            response: function(settings) {
                this.responseText = [{
                    value: 0,
                    text: 'Guest'
                }, {
                    value: 1,
                    text: 'Service'
                }, {
                    value: 2,
                    text: 'Customer'
                }, {
                    value: 3,
                    text: 'Operator'
                }, {
                    value: 4,
                    text: 'Support'
                }, {
                    value: 5,
                    text: 'Admin'
                }];
                log(settings, this);
            }
        });

    }

    var initEditables = function() {

        //set editable mode based on URL parameter
        if (App.getURLParameter('mode') == 'inline') {
            $.fn.editable.defaults.mode = 'inline';
            $('#inline').attr("checked", true);
        } else {
            $('#inline').attr("checked", false);
        }

        //global settings 
        $.fn.editable.defaults.inputclass = 'form-control';
        $.fn.editable.defaults.url = '/post';

        //editables element samples 
        $('#height').editable({
            url: '/post',
            type: 'text',
            pk: 1,
            name: 'height',
            title: 'Enter height'
        });
		
		$('#weight').editable({
            url: '/post',
            type: 'text',
            pk: 1,
            name: 'weight',
            title: 'Enter weight'
        });
		
		$('#systolic').editable({
            url: '/post',
            type: 'text',
            pk: 1,
            name: 'systolic',
            title: 'Enter systolic'
        });
		
		$('#diastolic').editable({
            url: '/post',
            type: 'text',
            pk: 1,
            name: 'diastolic',
            title: 'Enter diastolic'
        });
		
		$('#fasting').editable({
            url: '/post',
            type: 'text',
            pk: 1,
            name: 'fasting',
            title: 'Enter fasting'
        });
		
		$('#random').editable({
            url: '/post',
            type: 'text',
            pk: 1,
            name: 'random',
            title: 'Enter random'
        });
		
		//General Info
		$('#room_no').editable({
            url: '/post',
            type: 'text',
            pk: 1,
            name: 'room number',
            title: 'Enter room nnumber'
        });
		
		$('#professional').editable({
            url: '/post',
            type: 'text',
            pk: 1,
            name: 'professional',
            title: 'Enter professional'
        });
		
		$('#diagnosis').editable({
            prepend: "Select",
            inputclass: 'form-control',
            source: [{
                value: 1,
                text: 'Diagnosis 2'
            }, {
                value: 2,
                text: 'Diagnosis 3'
            }],
        });
		
		$('#high_risk').editable({
            prepend: "Select",
            inputclass: 'form-control',
            source: [{
                value: 1,
                text: 'High Risk 2'
            }, {
                value: 2,
                text: 'High Risk 3'
            }],
        });
		
		$('#home-health-service').editable({
            prepend: "Select",
            inputclass: 'form-control',
            source: [{
                value: 1,
                text: 'Home Health Service 2'
            }, {
                value: 2,
                text: 'Home Health Service 3'
            }],
        });
		
		$('#anticoagulants').editable({
            prepend: "Select",
            inputclass: 'form-control',
            source: [{
                value: 1,
                text: 'ASA'
            }, {
                value: 2,
                text: 'Plavix'
            }],
        });
		
		$('#cubic-cm').editable({
            prepend: "Select",
            inputclass: 'form-control',
            source: [{
                value: 1,
                text: 'Cublic Centimeter 2'
            }, {
                value: 2,
                text: 'Cublic Centimeter 3'
            }],
        });
		
		$('#plan').editable({
            prepend: "Select",
            inputclass: 'form-control',
            source: [{
                value: 1,
                text: 'Plan 2'
            }, {
                value: 2,
                text: 'Plan 3'
            }],
        });
		
		$('#insurance').editable({
            prepend: "Select",
            inputclass: 'form-control',
            source: [{
                value: 1,
                text: 'Insurance 2'
            }, {
                value: 2,
                text: 'Insurance 3'
            }],
        });
		
		$('#note').editable({
            showbuttons: (App.isRTL() ? 'left' : 'right')
        });
		
		//Consultation Info
		$('#facility').editable({
            prepend: "Select",
            inputclass: 'form-control',
            source: [{
                value: 1,
                text: 'Donnelly place'
            }, {
                value: 2,
                text: 'Brighton Gardens'
            }],
        });
		
		$('#pcp').editable({
            prepend: "Select",
            inputclass: 'form-control',
            source: [{
                value: 1,
                text: 'kim Goldmintz MD'
            }, {
                value: 2,
                text: 'Lloyd Language MD'
            }],
        });
		
		$('#provider').editable({
            prepend: "Select",
            inputclass: 'form-control',
            source: [{
                value: 1,
                text: 'Richard james, MD'
            }, {
                value: 2,
                text: 'Carolyn Maldonado, MD'
            }],
        });
		
		$('#em').editable({
            prepend: "Select",
            inputclass: 'form-control',
            source: [{
                value: 1,
                text: '99305'
            }, {
                value: 2,
                text: '99308'
            }],
        });

    }

    return {
        //main function to initiate the module
        init: function() {

            // inii ajax simulation
            initAjaxMock();

            // init editable elements
            initEditables();

            // init editable toggler
            $('#enable').click(function() {
                $('#user .editable').editable('toggleDisabled');
            });

            // init 
            $('#inline').on('change', function(e) {
                if ($(this).is(':checked')) {
                    window.location.href = 'form_editable.html?mode=inline';
                } else {
                    window.location.href = 'form_editable.html';
                }
            });

            // handle editable elements on hidden event fired
            $('#user .editable').on('hidden', function(e, reason) {
                if (reason === 'save' || reason === 'nochange') {
                    var $next = $(this).closest('tr').next().find('.editable');
                    if ($('#autoopen').is(':checked')) {
                        setTimeout(function() {
                            $next.editable('show');
                        }, 300);
                    } else {
                        $next.focus();
                    }
                }
            });


        }

    };

}();

jQuery(document).ready(function() {
    FormEditable.init();
});