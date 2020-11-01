/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
/* eslint-disable import/no-unresolved */
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
// import { Tasks } from '../api/tasks.js';

import './task.html';

Template.task.helpers({
  isOwner() {
    return this.owner === Meteor.userId();
  },
});

Template.task.events({
  'click .toggle-checked': function () {
    // Set the checked property to the opposite of its current value
    Meteor.call('tasks.setChecked', this._id, !this.checked);
  },
  'click .delete': function () {
    Meteor.call('tasks.remove', this._id);
  },
  'click .toggle-private': function () {
    Meteor.call('tasks.setPrivate', this._id, !this.private);
  },
});
