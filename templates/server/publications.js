Meteor.publish('<%= name %>', function() {
  return <%= name %>.find();
})