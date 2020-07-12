(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/auth/LoginComponent.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/auth/LoginComponent.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_AuthService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../../services/AuthService */ "./resources/js/services/AuthService.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      serverErrors: [],
      loginForm: {
        id: '',
        name: '',
        email: '',
        password: ''
      }
    };
  },
  methods: {
    resetForm: function resetForm() {
      var _this = this;

      this.loginForm = {
        id: '',
        name: '',
        email: '',
        password: ''
      }, this.$nextTick(function () {
        _this.$refs.loginFormRef.reset();
      });
    },
    login: function login() {
      var _this2 = this;

      this.$Progress.start();
      _services_AuthService__WEBPACK_IMPORTED_MODULE_0__["login"](this.loginForm).then(function (response) {
        _this2.serverErrors = [];

        _this2.$myStore.commit('LoginUser', response.data.data);

        _this2.$myStore.commit('UserData', response.data.data);

        _this2.$Progress.finish();

        _this2.$router.push({
          name: 'dashboard'
        });

        Toast.fire({
          icon: 'success',
          title: 'Welcome to the dashboard!'
        });
      })["catch"](function (error) {
        _this2.$Progress.fail();

        if (error.response.data.errors) {
          _this2.serverErrors = error.response.data.errors;
        }

        if (error.response.data.message) {
          Toast.fire({
            icon: 'error',
            title: error.response.data.message
          });
        }
      });
    }
  },
  mounted: function mounted() {//console.log(this.$myStore.state.test)
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/auth/LoginComponent.vue?vue&type=template&id=5a228f80&":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/auth/LoginComponent.vue?vue&type=template&id=5a228f80& ***!
  \**********************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "login-page" }, [
    _c("div", { staticClass: "login-box" }, [
      _vm._m(0),
      _vm._v(" "),
      _c("div", { staticClass: "card" }, [
        _c(
          "div",
          { staticClass: "card-body login-card-body" },
          [
            _c("p", { staticClass: "login-box-msg" }, [
              _vm._v(
                _vm._s(_vm.$myStore.state.test) +
                  "Sign in to start your session"
              )
            ]),
            _vm._v(" "),
            _c("ValidationObserver", {
              ref: "loginFormRef",
              scopedSlots: _vm._u([
                {
                  key: "default",
                  fn: function(ref) {
                    var invalid = ref.invalid
                    var handleSubmit = ref.handleSubmit
                    return [
                      _c(
                        "form",
                        {
                          on: {
                            submit: function($event) {
                              $event.preventDefault()
                              return handleSubmit(_vm.login)
                            }
                          }
                        },
                        [
                          _c("ValidationProvider", {
                            attrs: {
                              name: "Email Address",
                              rules: "required|email"
                            },
                            scopedSlots: _vm._u(
                              [
                                {
                                  key: "default",
                                  fn: function(ref) {
                                    var errors = ref.errors
                                    return [
                                      _c(
                                        "div",
                                        { staticClass: "input-group mb-3" },
                                        [
                                          _c("input", {
                                            directives: [
                                              {
                                                name: "model",
                                                rawName: "v-model",
                                                value: _vm.loginForm.email,
                                                expression: "loginForm.email"
                                              }
                                            ],
                                            staticClass: "form-control",
                                            attrs: {
                                              type: "email",
                                              name: "email",
                                              id: "email",
                                              placeholder: "Email Address"
                                            },
                                            domProps: {
                                              value: _vm.loginForm.email
                                            },
                                            on: {
                                              input: function($event) {
                                                if ($event.target.composing) {
                                                  return
                                                }
                                                _vm.$set(
                                                  _vm.loginForm,
                                                  "email",
                                                  $event.target.value
                                                )
                                              }
                                            }
                                          }),
                                          _vm._v(" "),
                                          _c(
                                            "div",
                                            {
                                              staticClass: "input-group-append"
                                            },
                                            [
                                              _c(
                                                "div",
                                                {
                                                  staticClass:
                                                    "input-group-text"
                                                },
                                                [
                                                  _c("span", {
                                                    staticClass:
                                                      "fas fa-envelope"
                                                  })
                                                ]
                                              )
                                            ]
                                          )
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _vm.serverErrors.email
                                        ? _c(
                                            "div",
                                            { staticClass: "text-danger" },
                                            [
                                              _vm._v(
                                                "\n                    " +
                                                  _vm._s(
                                                    _vm.serverErrors.email[0]
                                                  ) +
                                                  "\n                    "
                                              )
                                            ]
                                          )
                                        : _vm._e(),
                                      _vm._v(" "),
                                      _c(
                                        "span",
                                        { staticClass: "text-danger" },
                                        [_vm._v(_vm._s(errors[0]))]
                                      )
                                    ]
                                  }
                                }
                              ],
                              null,
                              true
                            )
                          }),
                          _vm._v(" "),
                          _c("ValidationProvider", {
                            attrs: { name: "Password", rules: "required" },
                            scopedSlots: _vm._u(
                              [
                                {
                                  key: "default",
                                  fn: function(ref) {
                                    var errors = ref.errors
                                    return [
                                      _c(
                                        "div",
                                        { staticClass: "input-group mb-3" },
                                        [
                                          _c("input", {
                                            directives: [
                                              {
                                                name: "model",
                                                rawName: "v-model",
                                                value: _vm.loginForm.password,
                                                expression: "loginForm.password"
                                              }
                                            ],
                                            staticClass: "form-control",
                                            attrs: {
                                              type: "password",
                                              name: "password",
                                              id: "password",
                                              placeholder: "Password"
                                            },
                                            domProps: {
                                              value: _vm.loginForm.password
                                            },
                                            on: {
                                              input: function($event) {
                                                if ($event.target.composing) {
                                                  return
                                                }
                                                _vm.$set(
                                                  _vm.loginForm,
                                                  "password",
                                                  $event.target.value
                                                )
                                              }
                                            }
                                          }),
                                          _vm._v(" "),
                                          _c(
                                            "div",
                                            {
                                              staticClass: "input-group-append"
                                            },
                                            [
                                              _c(
                                                "div",
                                                {
                                                  staticClass:
                                                    "input-group-text"
                                                },
                                                [
                                                  _c("span", {
                                                    staticClass: "fas fa-lock"
                                                  })
                                                ]
                                              )
                                            ]
                                          )
                                        ]
                                      ),
                                      _vm._v(" "),
                                      _vm.serverErrors.password
                                        ? _c(
                                            "div",
                                            { staticClass: "text-danger" },
                                            [
                                              _vm._v(
                                                "\n                        " +
                                                  _vm._s(
                                                    _vm.serverErrors.password[0]
                                                  ) +
                                                  "\n                        "
                                              )
                                            ]
                                          )
                                        : _vm._e(),
                                      _vm._v(" "),
                                      _c(
                                        "span",
                                        { staticClass: "text-danger" },
                                        [_vm._v(_vm._s(errors[0]))]
                                      )
                                    ]
                                  }
                                }
                              ],
                              null,
                              true
                            )
                          }),
                          _vm._v(" "),
                          _c("div", { staticClass: "row" }, [
                            _c("div", { staticClass: "col-4" }, [
                              _c(
                                "button",
                                {
                                  staticClass: "btn btn-primary btn-block",
                                  attrs: { type: "submit", disabled: invalid }
                                },
                                [_vm._v("Login")]
                              )
                            ]),
                            _vm._v(" "),
                            _c("div", { staticClass: "col-8" }, [
                              _c(
                                "p",
                                { staticClass: "mb-1" },
                                [
                                  _c(
                                    "router-link",
                                    {
                                      staticClass: "text-center",
                                      attrs: { to: "/register" }
                                    },
                                    [_vm._v("Register a new membership")]
                                  )
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "p",
                                { staticClass: "mb-1" },
                                [
                                  _c(
                                    "router-link",
                                    {
                                      staticClass: "text-center",
                                      attrs: { to: "#" }
                                    },
                                    [_vm._v("I forgot my password")]
                                  )
                                ],
                                1
                              )
                            ])
                          ])
                        ],
                        1
                      )
                    ]
                  }
                }
              ])
            })
          ],
          1
        )
      ])
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "login-logo" }, [
      _c("a", { attrs: { href: "../../index2.html" } }, [
        _c("b", [_vm._v("Admin")]),
        _vm._v("LTE")
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/auth/LoginComponent.vue":
/*!*********************************************************!*\
  !*** ./resources/js/components/auth/LoginComponent.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _LoginComponent_vue_vue_type_template_id_5a228f80___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LoginComponent.vue?vue&type=template&id=5a228f80& */ "./resources/js/components/auth/LoginComponent.vue?vue&type=template&id=5a228f80&");
/* harmony import */ var _LoginComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LoginComponent.vue?vue&type=script&lang=js& */ "./resources/js/components/auth/LoginComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _LoginComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _LoginComponent_vue_vue_type_template_id_5a228f80___WEBPACK_IMPORTED_MODULE_0__["render"],
  _LoginComponent_vue_vue_type_template_id_5a228f80___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/auth/LoginComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/auth/LoginComponent.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/auth/LoginComponent.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./LoginComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/auth/LoginComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/auth/LoginComponent.vue?vue&type=template&id=5a228f80&":
/*!****************************************************************************************!*\
  !*** ./resources/js/components/auth/LoginComponent.vue?vue&type=template&id=5a228f80& ***!
  \****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginComponent_vue_vue_type_template_id_5a228f80___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./LoginComponent.vue?vue&type=template&id=5a228f80& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/auth/LoginComponent.vue?vue&type=template&id=5a228f80&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginComponent_vue_vue_type_template_id_5a228f80___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_LoginComponent_vue_vue_type_template_id_5a228f80___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);