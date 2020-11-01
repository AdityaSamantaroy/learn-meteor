/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable func-names */
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Tasks } from '../api/tasks.js';

import './body.html';
import './task.js';

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('tasks');
});

Template.body.helpers({
  // tasks: [
  //   { text: 'This is task 1' },
  //   { text: 'This is task 2' },
  //   { text: 'This is task 3' },
  // ],
  tasks() {
    const instance = Template.instance();
    if (instance.state.get('hideCompleted')) {
      return Tasks.find({ checked: { $ne: true } }, { sort: { createdAt: -1 } });
    }
    return Tasks.find({}, { sort: { createdAt: -1 } });
  },
  incompleteCount() {
    return Tasks.find({ checked: { $ne: true } }).count();
  },
});

Template.body.events({
  'submit .new-task': function (event) {
    event.preventDefault();

    const { target } = event;
    const text = target.text.value;

    //
    Meteor.call('tasks.insert', text);

    target.text.value = '';
  },
  'change .hide-completed input': function (event, instance) {
    instance.state.set('hideCompleted', event.target.checked);
  },
});
