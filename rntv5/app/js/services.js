/***
    RAT AngularJS App Main Script
***/

var AppService = angular.module('RAT.Services', []);

AppService.service('DataTableS', DataTableS);

function DataTableS($rootScope) {
    this.getDefaults = getDefaults;
    this.checkBoxEvents = checkBoxEvents;
    this.createCheckBoxColumn = createCheckBoxColumn;
    this.createEditActionColumn = createEditActionColumn;
    this.createReportActionColumn = createReportActionColumn;
    this.getSelectedReferences = getSelectedReferences;
    this.onDeleteClick = onDeleteClick;
    this.resetDelete = resetDelete;

    this.refresh = 'RELOAD_DATA_TABLE';

    function getDefaults() {
        return {
            sAjaxSource: $rootScope.settings.PHPServicePath,
            sServerMethod: 'POST',
            responsive: true,
            bProcessing: true,
            bServerSide: true,
            lengthMenu: [
                [10, 20, 50, 100],
                [10, 20, 50, 100] // change per page values here
            ],
            // set the initial value
            pageLength: 10,    
            dom: "<'row' <'col-md-12'B>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12 text-align-reverse'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12 text-align-reverse'p>>", // horizobtal scrollable datatable
        };
    }
    function getCheckBoxDom(ID) {
        return '<label class="mt-checkbox mt-checkbox-single mt-checkbox-outline"><input type="checkbox" class="data-table-check-box" data-reference="'+ID+'" /><span></span></label>';
    }
    function getEditActionDom(ID) {
        return '<i data-reference="'+ID+'" title="Edit" class="edit-icon fa fa-edit font-green-jungle"></i>';
    }
    function getReportActionDom(ID) {
        return '<i data-reference="'+ID+'" title="Report" class="eye-icon fa fa-eye font-green-jungle"></i>';
    }
    function getDeleteActionDom() {
        return '<button type="button" disabled="true" style="margin-right: 8px;" class="btn material red delete-icon data-table-delete"><i class="fa fa-trash-o"></i></button>';
    }
    function createEditActionColumn(Index, Element, Reference, ActionFunction) {
        $(Element).find('td:eq('+Index+')').append(getEditActionDom(Reference));
        $(Element).find('td:eq('+Index+') .edit-icon').click(function() {
            ActionFunction($(this).data('reference'));
        });
    }
    function createReportActionColumn(Index, Element, Reference, ActionFunction) {
        $(Element).find('td:eq('+Index+')').append(getReportActionDom(Reference));
        $(Element).find('td:eq('+Index+') .eye-icon').click(function() {
            ActionFunction($(this).data('reference'),this);
        });
    }
    function createCheckBoxColumn(Element, Reference, Index) {
        Index = Index || 0;
        $(Element).find('td:eq('+Index+')').html(getCheckBoxDom(Reference));
    }
    function checkBoxEvents(Selector, ShowDelete) {
        var dataTable = $(Selector);
        var checkAll = dataTable.find('.check-box-column .check-all');

        dataTable.on('click', 'tbody input.data-table-check-box', function() {
            var totalCheckBox = dataTable.find('tbody input.data-table-check-box').size();
            var selectedCheckBoxCount = dataTable.find('tbody input.data-table-check-box:checked').size();
            
            if (totalCheckBox > 0 && totalCheckBox == selectedCheckBoxCount) {
                checkAll.prop('checked', true);
            } else {
                checkAll.prop('checked', false);
            }

            if (selectedCheckBoxCount) {
                dataTable.closest('.dataTables_wrapper').find('.data-table-delete').prop('disabled', false);
            } else {
                dataTable.closest('.dataTables_wrapper').find('.data-table-delete').prop('disabled', true);
            }
        });
        checkAll.click(function() {
            var status = $(this).prop('checked');
            dataTable.find('tbody input.data-table-check-box').each(function() {
                $(this).prop('checked', status);
            });

            var selectedCheckBoxCount = dataTable.find('tbody input.data-table-check-box:checked').size();
            if (selectedCheckBoxCount) {
                dataTable.closest('.dataTables_wrapper').find('.data-table-delete').prop('disabled', false);
            } else {
                dataTable.closest('.dataTables_wrapper').find('.data-table-delete').prop('disabled', true);
            }
        });

        if (ShowDelete == null)
            ShowDelete = true;

        if (ShowDelete) {
            dataTable.closest('.dataTables_wrapper').find('.dataTables_length').prepend(getDeleteActionDom());
        }
    }
    function getSelectedReferences(DataTable) {
        var selections = [];
        DataTable.find('tbody input.data-table-check-box:checked').each(function() {
            selections.push(parseInt($(this).data('reference')));
        });
        return selections;
    }
    function onDeleteClick(Selector, CB) {
        var dataTable = $(Selector);
        dataTable.closest('.dataTables_wrapper').find('.data-table-delete').click(function() {
            if (CB)
                CB(getSelectedReferences(dataTable));
        });
    }
    function resetDelete(Selector) {
        $(Selector).closest('.dataTables_wrapper').find('.data-table-delete').prop('disabled', true);
    }
}

AppService.service('ChannelS', ChannelS);

function ChannelS() {
    this.createChannel = createChannel;

    function createChannel(ChannelName) {
        if (ChannelName == null || ChannelName == '')
            return null;

        var Channel;
        try {
            Channel = new BroadcastChannel(ChannelName);
        } catch (E) {

        }
        return Channel;
    }
}

AppService.service('FilePicker', FilePicker);

function FilePicker() {
    this.imageSelector = imageSelector;
    this.fileSelector = fileSelector;
    this.displayFileName = displayFileName;
    this.displayImage = displayImage;

    function imageSelector(Selector, CB, RCB) {
        var upBtn = $(Selector).find('.up-btn');
        var chBtn = $(Selector).find('.ch-btn');
        var rmBtn = $(Selector).find('.rm-btn');
        var preview = $(Selector).find('img');
        
        if (preview.prop('src') != '') {
            upBtn.hide();
            chBtn.show();
            rmBtn.show();
        }

        upBtn.click(function() {
            $(Selector + ' .file-pick').click();
        });
        chBtn.click(function() {
            $(Selector + ' .file-pick').click();
        });

        $(Selector + ' .file-pick').on('change', function(evt) {
            //console.log('call');
            var file    = evt.target.files[0];
            var reader  = new FileReader();
            
            reader.onloadend = function () {
                preview
                    .prop('src', reader.result)  //set the scr prop.
                    .css('max-width', 250)  //set the width of the image
                    .css('max-height', 200);  //set the height of the image
            }
            
            if (file) {
                reader.readAsDataURL(file);
                if (CB != null)
                    CB(file);
                upBtn.hide();
                chBtn.show();
                rmBtn.show();
            }/* else {
                preview.prop('src', '');                
            }*/
        });

        rmBtn.click(function() {
            upBtn.show();
            chBtn.hide();
            rmBtn.hide();
            preview.prop('src', '');
            $(Selector + ' .file-pick').val('');
            if (RCB) {
                RCB();
            }
        });
    }

    function displayFileName(Selector, Name) {
        var upBtn = $(Selector).find('.up-btn');
        var chBtn = $(Selector).find('.ch-btn');
        var rmBtn = $(Selector).find('.rm-btn');
        var preview = $(Selector).find('input[type="text"]');
        
        if (preview.prop('value') != null && Name != '') {
            preview.prop('value', Name);
            upBtn.hide();
            chBtn.show();
            rmBtn.show();
        } else {
			preview.prop('value', '');
            upBtn.show();
            chBtn.hide();
            rmBtn.hide();
		}
    }

    function displayImage(Selector, Name) {
        var upBtn = $(Selector).find('.up-btn');
        var chBtn = $(Selector).find('.ch-btn');
        var rmBtn = $(Selector).find('.rm-btn');
        var preview = $(Selector).find('img');
        
        if (preview.prop('src') != null && Name != '') {
            preview.prop('src', Name);
            upBtn.hide();
            chBtn.show();
            rmBtn.show();
        } else {
			preview.prop('src', '');
			upBtn.show();
            chBtn.hide();
            rmBtn.hide();
		}
    }

    function fileSelector(Selector, CB, RCB) {
        var upBtn = $(Selector).find('.up-btn');
        var chBtn = $(Selector).find('.ch-btn');
        var rmBtn = $(Selector).find('.rm-btn');
        var preview = $(Selector).find('input[type="text"]');
        
        if (preview.prop('value') != null && preview.prop('value') != '') {
            upBtn.hide();
            chBtn.show();
            rmBtn.show();
        }

        upBtn.click(function() {
            $(Selector + ' .file-pick').click();
        });
        chBtn.click(function() {
            $(Selector + ' .file-pick').click();
        });

        $(Selector + ' .file-pick').on('change', function(evt) {
            var file    = evt.target.files[0];           
            if (file) {
                if (file.name && preview)
                    preview.val(file.name);
                if (CB != null)
                    CB(file);
                upBtn.hide();
                chBtn.show();
                rmBtn.show();
            }
        });

        rmBtn.click(function() {
            upBtn.show();
            chBtn.hide();
            rmBtn.hide();
            $(Selector + ' .file-pick').val('');
            if (preview)
                preview.val('');
            if (RCB) {
                RCB();
            }
        });
    }
}