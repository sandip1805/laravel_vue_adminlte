(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[13],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/user/UsersComponent.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/user/UsersComponent.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var primevue_calendar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! primevue/calendar */ "./node_modules/primevue/calendar.js");
/* harmony import */ var primevue_calendar__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(primevue_calendar__WEBPACK_IMPORTED_MODULE_0__);
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
  components: {
    'Calendar': primevue_calendar__WEBPACK_IMPORTED_MODULE_0___default.a
  },
  // local filter start
  filters: {
    uppercase: function uppercase(value) {
      if (!value) return '';
      return value.toUpperCase();
    }
  },
  // local filter end
  data: function data() {
    return {
      editMode: false,
      serverErrors: [],
      users: {},
      userForm: {
        id: '',
        name: '',
        email: '',
        password: '',
        confirm_password: '',
        type: '',
        bio: '',
        photo: '',
        date_of_birth: null
      }
    };
  },
  methods: {
    resetForm: function resetForm() {
      var _this = this;

      this.userForm = {
        id: '',
        name: '',
        email: '',
        password: '',
        confirm_password: '',
        type: '',
        bio: '',
        photo: '',
        date_of_birth: null
      }, this.$nextTick(function () {
        _this.$refs.userFormRef.reset();
      });
    },
    newModel: function newModel() {
      this.resetForm();
      /* $('#createUserModal').modal({
      show:true,
      keyboard: false
      }) */

      $('#createUserModal').modal('show');
    },
    createUser: function createUser() {
      var _this2 = this;

      //this.userForm.post('api/user')
      this.editMode = false;
      this.$Progress.start();
      axios.post("api/user", this.userForm).then(function (response) {
        _this2.serverErrors = []; //this.$emit('AfterCreate'); //local event emitter

        _this2.$emit('LocalEvtEmitData', {
          name: 'Tushar'
        }); //local event emitter with data


        Fire.$emit('AfterCreate'); //global event emitter

        $('#createUserModal').modal('hide');
        Toast.fire({
          icon: 'success',
          title: 'User created successfully!'
        });

        _this2.$Progress.finish();
      })["catch"](function (error) {
        _this2.$Progress.fail();

        _this2.serverErrors = error.response.data.errors;
      });
    },
    editModel: function editModel(id) {
      var _this3 = this;

      this.editMode = true;
      this.resetForm();
      this.$Progress.start();
      axios.get("api/user/".concat(id)).then(function (response) {
        _this3.userForm = response.data;

        _this3.$Progress.finish();

        $('#createUserModal').modal('show');
      })["catch"](function (error) {
        _this3.$Progress.fail();

        _this3.serverErrors = error.response.data.errors;
        /*if(e.response.status === 401) {
            this.$router.push({
            name: 'Login'
            })
        }*/
      });
    },
    updateUser: function updateUser() {
      var _this4 = this;

      this.editMode = true;
      this.$Progress.start();
      axios.put("api/user/".concat(this.userForm.id), this.userForm).then(function (response) {
        _this4.serverErrors = [];
        Fire.$emit('AfterCreate'); //global event emitter

        $('#createUserModal').modal('hide');
        Swal.fire('Updated!', response.data.message, 'success');

        _this4.$Progress.finish();
      })["catch"](function (error) {
        _this4.editMode = true;

        _this4.$Progress.fail();

        _this4.serverErrors = error.response.data.errors;
      });
    },
    loadUsers: function loadUsers() {
      var _this5 = this;

      this.$Progress.start();
      axios.get("api/user").then(function (response) {
        _this5.$Progress.finish();

        _this5.users = response.data;
      })["catch"](function (error) {
        _this5.$Progress.fail(); // this.errors.push(error)

        /*if(e.response.status === 401) {
            this.$router.push({
            name: 'Login'
            })
        }*/

      });
    },
    deleteUser: function deleteUser(id) {
      var _this6 = this;

      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(function (result) {
        if (result.value) {
          //send delete request to the server
          _this6.$Progress.start();

          axios["delete"]("api/user/".concat(id)).then(function (response) {
            console.log(response);
            Swal.fire('Deleted!', response.data.message, 'success');
            Fire.$emit('AfterCreate'); //global event emitter

            _this6.$Progress.finish();
          })["catch"](function (error) {
            //this.serverErrors = error.response.data.errors;
            Swal.fire('Failed!', 'There was something wrong!', 'warning');

            _this6.$Progress.fail();
          });
        }
      });
    }
  },
  mounted: function mounted() {
    var _this7 = this;

    this.loadUsers();
    /* this.$on('AfterCreate', ()=>{
        this.loadUsers();
    }) */
    // local event subscriber

    this.$on('LocalEvtEmitData', function (data) {
      console.log(data);
    }); // local event subscriber with data

    Fire.$on('AfterCreate', function () {
      _this7.loadUsers();
    }); // global event subscriber

    /* setInterval(() => {
    this.loadUsers();
    }, 3000); */
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/user/UsersComponent.vue?vue&type=template&id=63036c3e&":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/user/UsersComponent.vue?vue&type=template&id=63036c3e& ***!
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
  return _c("div", { staticClass: "container" }, [
    _c("div", { staticClass: "row" }, [
      _c("div", { staticClass: "col-12" }, [
        _c("div", { staticClass: "card mt-5" }, [
          _c("div", { staticClass: "card-header" }, [
            _c("h3", { staticClass: "card-title" }, [_vm._v("User List")]),
            _vm._v(" "),
            _c("div", { staticClass: "card-tools" }, [
              _c(
                "button",
                {
                  staticClass: "btn btn-success",
                  attrs: {
                    "data-toggle": "modal",
                    "data-target": "#createUserModal"
                  },
                  on: {
                    click: function($event) {
                      return _vm.newModel()
                    }
                  }
                },
                [
                  _vm._v("Add New "),
                  _c("i", { staticClass: "fas fa-user-plus fa-fw" })
                ]
              )
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "card-body table-responsive p-0" }, [
            _c("table", { staticClass: "table table-hover" }, [
              _vm._m(0),
              _vm._v(" "),
              _c(
                "tbody",
                _vm._l(_vm.users.data, function(user) {
                  return _c("tr", { key: user.id }, [
                    _c("td", [_vm._v(_vm._s(user.id))]),
                    _vm._v(" "),
                    _c("td", [_vm._v(_vm._s(user.name))]),
                    _vm._v(" "),
                    _c("td", [_vm._v(_vm._s(user.email))]),
                    _vm._v(" "),
                    _c("td", [_vm._v(_vm._s(_vm._f("capitalize")(user.type)))]),
                    _vm._v(" "),
                    _c("td", [_vm._v(_vm._s(user.date_of_birth))]),
                    _vm._v(" "),
                    _c("td", [
                      _c(
                        "a",
                        {
                          attrs: { href: "javascript:void(0);" },
                          on: {
                            click: function($event) {
                              return _vm.editModel(user.id)
                            }
                          }
                        },
                        [_c("i", { staticClass: "fas fa-edit blue" })]
                      ),
                      _vm._v(" | "),
                      _c(
                        "a",
                        {
                          attrs: { href: "javascript:void(0);" },
                          on: {
                            click: function($event) {
                              return _vm.deleteUser(user.id)
                            }
                          }
                        },
                        [_c("i", { staticClass: "fas fa-trash red" })]
                      )
                    ])
                  ])
                }),
                0
              )
            ])
          ])
        ])
      ])
    ]),
    _vm._v(" "),
    _c(
      "div",
      {
        staticClass: "modal fade",
        attrs: {
          id: "createUserModal",
          "data-backdrop": "static",
          "data-keyboard": "false",
          tabindex: "-1",
          role: "dialog",
          "aria-labelledby": "createUserModalLabel",
          "aria-hidden": "true"
        }
      },
      [
        _c(
          "div",
          {
            staticClass: "modal-dialog modal-dialog-centered",
            attrs: { role: "document" }
          },
          [
            _c(
              "div",
              { staticClass: "modal-content" },
              [
                _c("div", { staticClass: "modal-header" }, [
                  _c(
                    "h5",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: !_vm.editMode,
                          expression: "!editMode"
                        }
                      ],
                      staticClass: "modal-title",
                      attrs: { id: "createUserModalLabel" }
                    },
                    [_vm._v("Create User")]
                  ),
                  _vm._v(" "),
                  _c(
                    "h5",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: _vm.editMode,
                          expression: "editMode"
                        }
                      ],
                      staticClass: "modal-title",
                      attrs: { id: "createUserModalLabel" }
                    },
                    [_vm._v("Edit User")]
                  ),
                  _vm._v(" "),
                  _vm._m(1)
                ]),
                _vm._v(" "),
                _c("ValidationObserver", {
                  ref: "userFormRef",
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
                                  _vm.editMode
                                    ? handleSubmit(_vm.updateUser)
                                    : handleSubmit(_vm.createUser)
                                }
                              }
                            },
                            [
                              _c("div", { staticClass: "modal-body" }, [
                                _c(
                                  "div",
                                  { staticClass: "form-group" },
                                  [
                                    _c("label", { attrs: { for: "name" } }, [
                                      _vm._v("Name")
                                    ]),
                                    _vm._v(" "),
                                    _c("ValidationProvider", {
                                      attrs: {
                                        name: "Name",
                                        rules: "required"
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
                                                  {
                                                    staticClass: "input-group"
                                                  },
                                                  [
                                                    _c(
                                                      "div",
                                                      {
                                                        staticClass:
                                                          "input-group-prepend"
                                                      },
                                                      [
                                                        _c(
                                                          "span",
                                                          {
                                                            staticClass:
                                                              "input-group-text"
                                                          },
                                                          [
                                                            _c("i", {
                                                              staticClass:
                                                                "fas fa-user"
                                                            })
                                                          ]
                                                        )
                                                      ]
                                                    ),
                                                    _vm._v(" "),
                                                    _c("input", {
                                                      directives: [
                                                        {
                                                          name: "model",
                                                          rawName: "v-model",
                                                          value:
                                                            _vm.userForm.name,
                                                          expression:
                                                            "userForm.name"
                                                        }
                                                      ],
                                                      staticClass:
                                                        "form-control",
                                                      attrs: {
                                                        type: "text",
                                                        name: "name",
                                                        id: "name",
                                                        placeholder: "Name"
                                                      },
                                                      domProps: {
                                                        value: _vm.userForm.name
                                                      },
                                                      on: {
                                                        input: function(
                                                          $event
                                                        ) {
                                                          if (
                                                            $event.target
                                                              .composing
                                                          ) {
                                                            return
                                                          }
                                                          _vm.$set(
                                                            _vm.userForm,
                                                            "name",
                                                            $event.target.value
                                                          )
                                                        }
                                                      }
                                                    })
                                                  ]
                                                ),
                                                _vm._v(" "),
                                                _vm.serverErrors.name
                                                  ? _c(
                                                      "div",
                                                      {
                                                        staticClass:
                                                          "text-danger"
                                                      },
                                                      [
                                                        _vm._v(
                                                          "\n                    " +
                                                            _vm._s(
                                                              _vm.serverErrors
                                                                .name[0]
                                                            ) +
                                                            "\n                    "
                                                        )
                                                      ]
                                                    )
                                                  : _vm._e(),
                                                _vm._v(" "),
                                                _c(
                                                  "span",
                                                  {
                                                    staticClass: "text-danger"
                                                  },
                                                  [_vm._v(_vm._s(errors[0]))]
                                                )
                                              ]
                                            }
                                          }
                                        ],
                                        null,
                                        true
                                      )
                                    })
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  { staticClass: "form-group" },
                                  [
                                    _c("label", { attrs: { for: "email" } }, [
                                      _vm._v("Email")
                                    ]),
                                    _vm._v(" "),
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
                                                  {
                                                    staticClass: "input-group"
                                                  },
                                                  [
                                                    _c(
                                                      "div",
                                                      {
                                                        staticClass:
                                                          "input-group-prepend"
                                                      },
                                                      [
                                                        _c(
                                                          "span",
                                                          {
                                                            staticClass:
                                                              "input-group-text"
                                                          },
                                                          [
                                                            _c("i", {
                                                              staticClass:
                                                                "fas fa-envelope-square"
                                                            })
                                                          ]
                                                        )
                                                      ]
                                                    ),
                                                    _vm._v(" "),
                                                    _c("input", {
                                                      directives: [
                                                        {
                                                          name: "model",
                                                          rawName: "v-model",
                                                          value:
                                                            _vm.userForm.email,
                                                          expression:
                                                            "userForm.email"
                                                        }
                                                      ],
                                                      staticClass:
                                                        "form-control",
                                                      attrs: {
                                                        type: "email",
                                                        name: "email",
                                                        id: "email",
                                                        placeholder:
                                                          "Email Address"
                                                      },
                                                      domProps: {
                                                        value:
                                                          _vm.userForm.email
                                                      },
                                                      on: {
                                                        input: function(
                                                          $event
                                                        ) {
                                                          if (
                                                            $event.target
                                                              .composing
                                                          ) {
                                                            return
                                                          }
                                                          _vm.$set(
                                                            _vm.userForm,
                                                            "email",
                                                            $event.target.value
                                                          )
                                                        }
                                                      }
                                                    })
                                                  ]
                                                ),
                                                _vm._v(" "),
                                                _vm.serverErrors.email
                                                  ? _c(
                                                      "div",
                                                      {
                                                        staticClass:
                                                          "text-danger"
                                                      },
                                                      [
                                                        _vm._v(
                                                          "\n                    " +
                                                            _vm._s(
                                                              _vm.serverErrors
                                                                .email[0]
                                                            ) +
                                                            "\n                    "
                                                        )
                                                      ]
                                                    )
                                                  : _vm._e(),
                                                _vm._v(" "),
                                                _c(
                                                  "span",
                                                  {
                                                    staticClass: "text-danger"
                                                  },
                                                  [_vm._v(_vm._s(errors[0]))]
                                                )
                                              ]
                                            }
                                          }
                                        ],
                                        null,
                                        true
                                      )
                                    })
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  { staticClass: "form-group" },
                                  [
                                    _c("label", { attrs: { for: "name" } }, [
                                      _vm._v("Bio")
                                    ]),
                                    _vm._v(" "),
                                    _c("ValidationProvider", {
                                      attrs: { name: "Bio", rules: "required" },
                                      scopedSlots: _vm._u(
                                        [
                                          {
                                            key: "default",
                                            fn: function(ref) {
                                              var errors = ref.errors
                                              return [
                                                _c("textarea", {
                                                  directives: [
                                                    {
                                                      name: "model",
                                                      rawName: "v-model",
                                                      value: _vm.userForm.bio,
                                                      expression: "userForm.bio"
                                                    }
                                                  ],
                                                  staticClass: "form-control",
                                                  attrs: {
                                                    name: "bio",
                                                    id: "bio",
                                                    placeholder: "Bio"
                                                  },
                                                  domProps: {
                                                    value: _vm.userForm.bio
                                                  },
                                                  on: {
                                                    input: function($event) {
                                                      if (
                                                        $event.target.composing
                                                      ) {
                                                        return
                                                      }
                                                      _vm.$set(
                                                        _vm.userForm,
                                                        "bio",
                                                        $event.target.value
                                                      )
                                                    }
                                                  }
                                                }),
                                                _vm._v(" "),
                                                _vm.serverErrors.bio
                                                  ? _c(
                                                      "div",
                                                      {
                                                        staticClass:
                                                          "text-danger"
                                                      },
                                                      [
                                                        _vm._v(
                                                          "\n                    " +
                                                            _vm._s(
                                                              _vm.serverErrors
                                                                .bio[0]
                                                            ) +
                                                            "\n                    "
                                                        )
                                                      ]
                                                    )
                                                  : _vm._e(),
                                                _vm._v(" "),
                                                _c(
                                                  "span",
                                                  {
                                                    staticClass: "text-danger"
                                                  },
                                                  [_vm._v(_vm._s(errors[0]))]
                                                )
                                              ]
                                            }
                                          }
                                        ],
                                        null,
                                        true
                                      )
                                    })
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  { staticClass: "form-group" },
                                  [
                                    _c("label", { attrs: { for: "type" } }, [
                                      _vm._v("User Type")
                                    ]),
                                    _vm._v(" "),
                                    _c("ValidationProvider", {
                                      attrs: {
                                        name: "User Type",
                                        rules: "required"
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
                                                  {
                                                    staticClass: "input-group"
                                                  },
                                                  [
                                                    _c(
                                                      "div",
                                                      {
                                                        staticClass:
                                                          "input-group-prepend"
                                                      },
                                                      [
                                                        _c(
                                                          "span",
                                                          {
                                                            staticClass:
                                                              "input-group-text"
                                                          },
                                                          [
                                                            _c("i", {
                                                              staticClass:
                                                                "fas fa-user-tag"
                                                            })
                                                          ]
                                                        )
                                                      ]
                                                    ),
                                                    _vm._v(" "),
                                                    _c(
                                                      "select",
                                                      {
                                                        directives: [
                                                          {
                                                            name: "model",
                                                            rawName: "v-model",
                                                            value:
                                                              _vm.userForm.type,
                                                            expression:
                                                              "userForm.type"
                                                          }
                                                        ],
                                                        staticClass:
                                                          "form-control",
                                                        attrs: {
                                                          name: "type",
                                                          id: "type"
                                                        },
                                                        on: {
                                                          change: function(
                                                            $event
                                                          ) {
                                                            var $$selectedVal = Array.prototype.filter
                                                              .call(
                                                                $event.target
                                                                  .options,
                                                                function(o) {
                                                                  return o.selected
                                                                }
                                                              )
                                                              .map(function(o) {
                                                                var val =
                                                                  "_value" in o
                                                                    ? o._value
                                                                    : o.value
                                                                return val
                                                              })
                                                            _vm.$set(
                                                              _vm.userForm,
                                                              "type",
                                                              $event.target
                                                                .multiple
                                                                ? $$selectedVal
                                                                : $$selectedVal[0]
                                                            )
                                                          }
                                                        }
                                                      },
                                                      [
                                                        _c(
                                                          "option",
                                                          {
                                                            attrs: { value: "" }
                                                          },
                                                          [
                                                            _vm._v(
                                                              "Select User Role"
                                                            )
                                                          ]
                                                        ),
                                                        _vm._v(" "),
                                                        _c(
                                                          "option",
                                                          {
                                                            attrs: {
                                                              value: "admin"
                                                            }
                                                          },
                                                          [_vm._v("Admin")]
                                                        ),
                                                        _vm._v(" "),
                                                        _c(
                                                          "option",
                                                          {
                                                            attrs: {
                                                              value: "user"
                                                            }
                                                          },
                                                          [
                                                            _vm._v(
                                                              "Standard User"
                                                            )
                                                          ]
                                                        ),
                                                        _vm._v(" "),
                                                        _c(
                                                          "option",
                                                          {
                                                            attrs: {
                                                              value: "author"
                                                            }
                                                          },
                                                          [_vm._v("Author")]
                                                        )
                                                      ]
                                                    )
                                                  ]
                                                ),
                                                _vm._v(" "),
                                                _vm.serverErrors.type
                                                  ? _c(
                                                      "div",
                                                      {
                                                        staticClass:
                                                          "text-danger"
                                                      },
                                                      [
                                                        _vm._v(
                                                          "\n                    " +
                                                            _vm._s(
                                                              _vm.serverErrors
                                                                .type[0]
                                                            ) +
                                                            "\n                    "
                                                        )
                                                      ]
                                                    )
                                                  : _vm._e(),
                                                _vm._v(" "),
                                                _c(
                                                  "span",
                                                  {
                                                    staticClass: "text-danger"
                                                  },
                                                  [_vm._v(_vm._s(errors[0]))]
                                                )
                                              ]
                                            }
                                          }
                                        ],
                                        null,
                                        true
                                      )
                                    })
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  { staticClass: "form-group" },
                                  [
                                    _c(
                                      "label",
                                      { attrs: { for: "password" } },
                                      [_vm._v("Password")]
                                    ),
                                    _vm._v(" "),
                                    _c("ValidationProvider", {
                                      attrs: {
                                        name: "Password",
                                        rules: "confirmed:confirm_password"
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
                                                  {
                                                    staticClass: "input-group"
                                                  },
                                                  [
                                                    _c(
                                                      "div",
                                                      {
                                                        staticClass:
                                                          "input-group-prepend"
                                                      },
                                                      [
                                                        _c(
                                                          "span",
                                                          {
                                                            staticClass:
                                                              "input-group-text"
                                                          },
                                                          [
                                                            _c("i", {
                                                              staticClass:
                                                                "fas fa-key"
                                                            })
                                                          ]
                                                        )
                                                      ]
                                                    ),
                                                    _vm._v(" "),
                                                    _c("input", {
                                                      directives: [
                                                        {
                                                          name: "model",
                                                          rawName: "v-model",
                                                          value:
                                                            _vm.userForm
                                                              .password,
                                                          expression:
                                                            "userForm.password"
                                                        }
                                                      ],
                                                      staticClass:
                                                        "form-control",
                                                      attrs: {
                                                        type: "password",
                                                        name: "password",
                                                        id: "password",
                                                        placeholder: "Password"
                                                      },
                                                      domProps: {
                                                        value:
                                                          _vm.userForm.password
                                                      },
                                                      on: {
                                                        input: function(
                                                          $event
                                                        ) {
                                                          if (
                                                            $event.target
                                                              .composing
                                                          ) {
                                                            return
                                                          }
                                                          _vm.$set(
                                                            _vm.userForm,
                                                            "password",
                                                            $event.target.value
                                                          )
                                                        }
                                                      }
                                                    })
                                                  ]
                                                ),
                                                _vm._v(" "),
                                                _vm.serverErrors.password
                                                  ? _c(
                                                      "div",
                                                      {
                                                        staticClass:
                                                          "text-danger"
                                                      },
                                                      [
                                                        _vm._v(
                                                          "\n                    " +
                                                            _vm._s(
                                                              _vm.serverErrors
                                                                .password[0]
                                                            ) +
                                                            "\n                    "
                                                        )
                                                      ]
                                                    )
                                                  : _vm._e(),
                                                _vm._v(" "),
                                                _c(
                                                  "span",
                                                  {
                                                    staticClass: "text-danger"
                                                  },
                                                  [_vm._v(_vm._s(errors[0]))]
                                                )
                                              ]
                                            }
                                          }
                                        ],
                                        null,
                                        true
                                      )
                                    })
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  { staticClass: "form-group" },
                                  [
                                    _c(
                                      "label",
                                      { attrs: { for: "confirm_password" } },
                                      [_vm._v("Confirm Password")]
                                    ),
                                    _vm._v(" "),
                                    _c("ValidationProvider", {
                                      attrs: {
                                        name: "Confirm Password",
                                        rules: "",
                                        vid: "confirm_password"
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
                                                  {
                                                    staticClass: "input-group"
                                                  },
                                                  [
                                                    _c(
                                                      "div",
                                                      {
                                                        staticClass:
                                                          "input-group-prepend"
                                                      },
                                                      [
                                                        _c(
                                                          "span",
                                                          {
                                                            staticClass:
                                                              "input-group-text"
                                                          },
                                                          [
                                                            _c("i", {
                                                              staticClass:
                                                                "fas fa-key"
                                                            })
                                                          ]
                                                        )
                                                      ]
                                                    ),
                                                    _vm._v(" "),
                                                    _c("input", {
                                                      directives: [
                                                        {
                                                          name: "model",
                                                          rawName: "v-model",
                                                          value:
                                                            _vm.userForm
                                                              .confirm_password,
                                                          expression:
                                                            "userForm.confirm_password"
                                                        }
                                                      ],
                                                      staticClass:
                                                        "form-control",
                                                      attrs: {
                                                        type: "password",
                                                        name:
                                                          "confirm_password",
                                                        id: "confirm_password",
                                                        placeholder:
                                                          "Confirm Password"
                                                      },
                                                      domProps: {
                                                        value:
                                                          _vm.userForm
                                                            .confirm_password
                                                      },
                                                      on: {
                                                        input: function(
                                                          $event
                                                        ) {
                                                          if (
                                                            $event.target
                                                              .composing
                                                          ) {
                                                            return
                                                          }
                                                          _vm.$set(
                                                            _vm.userForm,
                                                            "confirm_password",
                                                            $event.target.value
                                                          )
                                                        }
                                                      }
                                                    })
                                                  ]
                                                ),
                                                _vm._v(" "),
                                                _vm.serverErrors
                                                  .confirm_password
                                                  ? _c(
                                                      "div",
                                                      {
                                                        staticClass:
                                                          "text-danger"
                                                      },
                                                      [
                                                        _vm._v(
                                                          "\n                    " +
                                                            _vm._s(
                                                              _vm.serverErrors
                                                                .confirm_password[0]
                                                            ) +
                                                            "\n                    "
                                                        )
                                                      ]
                                                    )
                                                  : _vm._e(),
                                                _vm._v(" "),
                                                _c(
                                                  "span",
                                                  {
                                                    staticClass: "text-danger"
                                                  },
                                                  [_vm._v(_vm._s(errors[0]))]
                                                )
                                              ]
                                            }
                                          }
                                        ],
                                        null,
                                        true
                                      )
                                    })
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  { staticClass: "form-group" },
                                  [
                                    _c(
                                      "label",
                                      { attrs: { for: "date_of_birth" } },
                                      [_vm._v("Register Date")]
                                    ),
                                    _vm._v(" "),
                                    _c("ValidationProvider", {
                                      attrs: {
                                        name: "Register Date",
                                        rules: "required",
                                        vid: "date_of_birth"
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
                                                  {
                                                    staticClass: "input-group"
                                                  },
                                                  [
                                                    _c("Calendar", {
                                                      attrs: {
                                                        monthNavigator: true,
                                                        yearNavigator: true,
                                                        yearRange: "2000:2030",
                                                        dateFormat: "dd/mm/yy",
                                                        showIcon: true
                                                      },
                                                      model: {
                                                        value:
                                                          _vm.userForm
                                                            .date_of_birth,
                                                        callback: function(
                                                          $$v
                                                        ) {
                                                          _vm.$set(
                                                            _vm.userForm,
                                                            "date_of_birth",
                                                            $$v
                                                          )
                                                        },
                                                        expression:
                                                          "userForm.date_of_birth"
                                                      }
                                                    })
                                                  ],
                                                  1
                                                ),
                                                _vm._v(" "),
                                                _vm.serverErrors.date_of_birth
                                                  ? _c(
                                                      "div",
                                                      {
                                                        staticClass:
                                                          "text-danger"
                                                      },
                                                      [
                                                        _vm._v(
                                                          "\n                    " +
                                                            _vm._s(
                                                              _vm.serverErrors
                                                                .date_of_birth[0]
                                                            ) +
                                                            "\n                    "
                                                        )
                                                      ]
                                                    )
                                                  : _vm._e(),
                                                _vm._v(" "),
                                                _c(
                                                  "span",
                                                  {
                                                    staticClass: "text-danger"
                                                  },
                                                  [_vm._v(_vm._s(errors[0]))]
                                                )
                                              ]
                                            }
                                          }
                                        ],
                                        null,
                                        true
                                      )
                                    })
                                  ],
                                  1
                                )
                              ]),
                              _vm._v(" "),
                              _c("div", { staticClass: "modal-footer" }, [
                                _c(
                                  "button",
                                  {
                                    staticClass: "btn btn-danger",
                                    attrs: {
                                      type: "button",
                                      "data-dismiss": "modal"
                                    }
                                  },
                                  [_vm._v("Close")]
                                ),
                                _vm._v(" "),
                                _c(
                                  "button",
                                  {
                                    directives: [
                                      {
                                        name: "show",
                                        rawName: "v-show",
                                        value: !_vm.editMode,
                                        expression: "!editMode"
                                      }
                                    ],
                                    staticClass: "btn btn-primary",
                                    attrs: { type: "submit", disabled: invalid }
                                  },
                                  [_vm._v("Create")]
                                ),
                                _vm._v(" "),
                                _c(
                                  "button",
                                  {
                                    directives: [
                                      {
                                        name: "show",
                                        rawName: "v-show",
                                        value: _vm.editMode,
                                        expression: "editMode"
                                      }
                                    ],
                                    staticClass: "btn btn-primary",
                                    attrs: { type: "submit", disabled: invalid }
                                  },
                                  [_vm._v("Update")]
                                )
                              ])
                            ]
                          )
                        ]
                      }
                    }
                  ])
                })
              ],
              1
            )
          ]
        )
      ]
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("tr", [
        _c("th", [_vm._v("ID")]),
        _vm._v(" "),
        _c("th", [_vm._v("Name")]),
        _vm._v(" "),
        _c("th", [_vm._v("Email")]),
        _vm._v(" "),
        _c("th", [_vm._v("Type")]),
        _vm._v(" "),
        _c("th", [_vm._v("DOB")]),
        _vm._v(" "),
        _c("th", [_vm._v("Actions")])
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "button",
      {
        staticClass: "close",
        attrs: {
          type: "button",
          "data-dismiss": "modal",
          "aria-label": "Close"
        }
      },
      [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("×")])]
    )
  }
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/components/user/UsersComponent.vue":
/*!*********************************************************!*\
  !*** ./resources/js/components/user/UsersComponent.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UsersComponent_vue_vue_type_template_id_63036c3e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UsersComponent.vue?vue&type=template&id=63036c3e& */ "./resources/js/components/user/UsersComponent.vue?vue&type=template&id=63036c3e&");
/* harmony import */ var _UsersComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UsersComponent.vue?vue&type=script&lang=js& */ "./resources/js/components/user/UsersComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _UsersComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _UsersComponent_vue_vue_type_template_id_63036c3e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _UsersComponent_vue_vue_type_template_id_63036c3e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/user/UsersComponent.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/user/UsersComponent.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./resources/js/components/user/UsersComponent.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UsersComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./UsersComponent.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/user/UsersComponent.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UsersComponent_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/user/UsersComponent.vue?vue&type=template&id=63036c3e&":
/*!****************************************************************************************!*\
  !*** ./resources/js/components/user/UsersComponent.vue?vue&type=template&id=63036c3e& ***!
  \****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UsersComponent_vue_vue_type_template_id_63036c3e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./UsersComponent.vue?vue&type=template&id=63036c3e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/user/UsersComponent.vue?vue&type=template&id=63036c3e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UsersComponent_vue_vue_type_template_id_63036c3e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UsersComponent_vue_vue_type_template_id_63036c3e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);