/***
GLobal Directives
***/

// Route State Load Spinner(used on page or content load)
RAT.directive('ngSpinnerBar', ['$rootScope',
    function($rootScope) {
        return {
            link: function(scope, element, attrs) {
                // by defult hide the spinner bar
                element.addClass('hide'); // hide spinner bar by default

                // display the spinner bar whenever the route changes(the content part started loading)
                $rootScope.$on('$stateChangeStart', function() {
                    element.removeClass('hide'); // show spinner bar
                });

                // hide the spinner bar on rounte change success(after the content loaded)
                $rootScope.$on('$stateChangeSuccess', function() {
                    element.addClass('hide'); // hide spinner bar
                    $('body').removeClass('page-on-load'); // remove page loading indicator
                    Layout.setSidebarMenuActiveLink('match'); // activate selected link in the sidebar menu
                   
                    // auto scorll to page top
                    setTimeout(function () {
                        App.scrollTop(); // scroll to the top on content load
                    }, $rootScope.settings.layout.pageAutoScrollOnLoad);     
                });

                // handle errors
                $rootScope.$on('$stateNotFound', function() {
                    element.addClass('hide'); // hide spinner bar
                });

                // handle errors
                $rootScope.$on('$stateChangeError', function() {
                    element.addClass('hide'); // hide spinner bar
                });
            }
        };
    }
])

// Handle global LINK click
RAT.directive('a', function() {
    return {
        restrict: 'E',
        link: function(scope, elem, attrs) {
            if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
                elem.on('click', function(e) {
                    e.preventDefault(); // prevent link click for above criteria
                });
            }
        }
    };
});

// Handle Dropdown Hover Plugin Integration
RAT.directive('dropdownMenuHover', function () {
  return {
    link: function (scope, elem) {
      elem.dropdownHover();
    }
  };  
});

// Validation for upload file
RAT.directive('validFile', function () {
    return {
        require: 'ngModel',
        link: function (scope, el, attrs, ngModel) {
            ngModel.$render = function () {
                ngModel.$setViewValue(el.val());
            };

            el.bind('change', function () {
                scope.$apply(function () {
                    ngModel.$render();
                });
            });
        }
    };
});
RAT.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
});

RAT.directive('ckEditor', function () {
  return {
    require: '?ngModel',
    link: function (scope, elm, attr, ngModel) {
      var ck = CKEDITOR.replace(elm[0]);
      if (!ngModel) return;
      ck.on('instanceReady', function () {
        ck.setData(ngModel.$viewValue);
      });
      function updateModel() {
        scope.$apply(function () {
          ngModel.$setViewValue(ck.getData());
        });
      }
      ck.on('change', updateModel);
      ck.on('key', updateModel);
      ck.on('dataReady', updateModel);

      ngModel.$render = function (value) {
        ck.setData(ngModel.$viewValue);
      };
    }
  };
});

RAT.directive("myDirective", ['$compile',function ($compile) {
    var template = '<ul>';
    template += '<li ng-repeat="item in list">';
    template += '<span ng-bind="item.name"></span>';
    template += '<div my-directive list="item.children"></div>';
    template += '</li>';
    template += '</ul>';

    return {
    restrict: 'EA',
    template: template,
    scope: {
      list: '='
    },
    transclude:true,
    compile: function(tElem) {
      var contents = tElem.contents().remove();
      var compiledContents;
      return {
        post: function(scope, iElem, iAttrs, ctrl, transclude) {
          if (!compiledContents) {
            compiledContents = $compile(contents);
          }
          
          compiledContents(scope, function(clone) {
            iElem.append(clone);
            iElem.prepend(transclude());
          });
        }
      };
    }
    };

}]);
/* PERMISSION TREE HEADER */
RAT.directive("permissionHeader", ['$compile', function ($compile) {

    var template = '<div class="MenuItem Title">'
    template += '   <div class="MenuLabel">Pages</div>'
    template += '   <div class="MenuAction">'
    template += '       <div class="md-checkbox-inline">'
    template += '           <div class="md-checkbox">'
    template += '               <input type="checkbox" id="SelectAll" ng-model="IsSelectedAllMenu" ng-change="SelectMenu(list, IsSelectedAllMenu)" class="md-check">'
    template += '               <label for="SelectAll">'
    template += '                   <span></span>'
    template += '                   <span class="check"></span>'
    template += '                   <span class="box"></span>All'
    template += '               </label>'
    template += '           </div>'
    template += '       </div>'
    template += '   </div>'
    template += '</div>'


    return {
        restrict: 'EA',
        template: template,
        scope: {
          list: '='
        },
        transclude:true,
        compile: function(tElem) {
          var contents = tElem.contents().remove();
          var compiledContents;
          return {
            post: function(scope, iElem, iAttrs, ctrl, transclude) {
                if (!compiledContents) {
                    compiledContents = $compile(contents);
                }
              
                compiledContents(scope, function(clone) {
                    iElem.append(clone);
                    iElem.prepend(transclude());
                });
            }
          };
        }
    };
}]);
/* PERMISSION TREE */
RAT.directive("permissionTree", ['$compile',function ($compile) {
    var template = '<ul>'
    template += '   <li ng-repeat="MenuItem in list">'
    template += '        <div class="MenuItem">'
    template += '            <div class="MenuLabel">{{MenuItem.MenuLabel}} </div>'
    template += '            <div class="MenuAction">'
    template += '                <div class="md-checkbox-inline">'
    template += '                    <div class="md-checkbox" ng-repeat="Action in MenuItem.MenuActions">'
    template += '                        <input type="checkbox" id="Menu_{{Action.RefID}}" class="md-check" ng-model="Action.IsSelected" ng-change="SelectMenu(MenuItem, Action.IsSelected)" >'
    template += '                        <label for="Menu_{{Action.RefID}}">'
    template += '                            <span></span>'
    template += '                            <span class="check"></span>'
    template += '                            <span class="box"></span>{{Action.MenuLabel}}'
    template += '                        </label>'
    template += '                    </div>'
    template += '                    '
    template += '                </div>'
    template += '            </div>'
    template += '        </div>'
    template += '        <div class="separator"></div>'
    template += '        <div permission-tree list="MenuItem.Menu"></div>'
    template += '    </li>'
    template += '</ul>'

    return {
        restrict: 'EA',
        template: template,
        scope: {
          list: '='
        },
        transclude:true,
        compile: function(tElem) {
          var contents = tElem.contents().remove();
          var compiledContents;
          return {
            post: function(scope, iElem, iAttrs, ctrl, transclude) {
                if (!compiledContents) {
                    compiledContents = $compile(contents);
                }
              
                compiledContents(scope, function(clone) {
                    iElem.append(clone);
                    iElem.prepend(transclude());
                });
            }
          };
        }
    };
}]);


RAT.directive('preventDefault', function () {
    return function(scope, element, attrs) {
        $(element).click(function(event) {
            event.preventDefault();
        });
    }
});

RAT.directive("matchPassword", function () {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=matchPassword"
        },
        link: function(scope, element, attributes, ngModel) {

            ngModel.$validators.matchPassword = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
});

RAT.directive("compareTo", function() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function(scope, element, attributes, ngModel) {
             
            ngModel.$validators.compareTo = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };
 
            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
});

RAT.directive('contenteditable', ['$sce', function($sce) {
    return {
        restrict: 'A', // only activate on element attribute
        require: '?ngModel', // get a hold of NgModelController
        link: function(scope, element, attrs, ngModel) {
            if (!ngModel) return; // do nothing if no ng-model

            // Specify how UI should be updated
            ngModel.$render = function() {
                element.html($sce.getTrustedHtml(ngModel.$viewValue || ''));
            };
            
            if (ngModel.$$parentForm != null && ngModel.$$parentForm.$name != null & ngModel.$$parentForm.$name != '') {
                var rootModel = ngModel.$$parentForm.$name.replace('Form', '');
                // console.log(scope[rootModel][ngModel.$name]);
                if (scope[rootModel] != null && scope[rootModel][ngModel.$name] != null) {
                    //scope.$watch(scope[rootModel][ngModel.$name], function() {
                        element.html(scope[rootModel][ngModel.$name] + '');
                        ngModel.$setViewValue(scope[rootModel][ngModel.$name] + '');
                    //});
                }
            }

            // Listen for change events to enable binding
            element.on('blur keyup change', function() {
                scope.$evalAsync(read);
            });
            read(); // initialize

            // Write data to the model
            function read() {
                var html = element.html();
                // When we clear the content editable the browser leaves a <br> behind
                // If strip-br attribute is provided then we strip this out
                if ( attrs.stripBr && html == '<br>' ) {
                    html = '';
                }

                var value = html.trim();
                if (value.match(/^-{0,1}\d+$/)) {
                    value = parseInt(value);
                } else if (value.match(/^\d+\.\d+$/)) {
                    value = parseFloat(value);
                }
                ngModel.$setViewValue(value);
            }
        }
    };
}]);

