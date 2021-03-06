// helpers
Template.CustomerEdit.helpers({
  customer: function() {
    return Session.get('customerData');
  },
});

// events
Template.CustomerView.events({
  'click .edit-customer-submit': function(event) {
    var formData = AutoForm.getFormValues('updateCustomerForm');
    var customer = Session.get('customerData');
    // call update
    Meteor.call('updateCustomer',
      customer._id, formData.updateDoc,
      function (error) {
        if(error) {
          $("#alert").html('<div class="alert alert-danger alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><i class="fa fa-warning"></i> Error ' + error.message + '</div>');
        } else {
          $("#alert").html('<div class="alert alert-success alert-dismissible"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Customer has been saved.</div>');

          // record history
          Meteor.call('createHistory', {
            userId: Meteor.userId(),
            message: 'Updated customer ' + customer.name
          });

          // auto dismis
          $("#alert").fadeTo(2000, 500).slideUp(500, function(){
            $("#alert").slideUp(500);
          });

          $('body').scrollTop(0);

          // set edit to false
          Session.set('EditCustomer', !Session.get('EditCustomer'));
        }
      }
    );

  },
});
