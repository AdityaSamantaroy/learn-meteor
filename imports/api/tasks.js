import { Meteor } from 'meteor/meteor';
import { Mongo } from "meteor/mongo";
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks')

if (Meteor.isServer) {
	//if code is running in server
	Meteor.publish('tasks', function tasksPublication() {
		return Tasks.find({
			$or: [
				{ private: { $ne: true } },
				{owner: this.userId},
			],
		});
	});
}

Meteor.methods({
	'tasks.insert'(text) {
		check(text, String);

		if (! this.userId){
			throw new Meteor.Error('not-authorized');
		}

		Tasks.insert({
			text,
			createdAt: new Date(),
			owner: Meteor.userId(), //current user's _id
			username: Meteor.user().username, // Meteor.user() to get the whole user document
		  }); 
		
	},

	'tasks.remove'(taskId) {
		check(taskId, String);
		
		const task = Tasks.findOne(taskId);

		if( task.private && task.owner !== this.userId) {
			throw new Meteor.Error('not-authorized');
		}

		Tasks.remove(taskId);
	},

	'tasks.setChecked'(taskId, setChecked) {
		check(taskId, String);
		check(setChecked, Boolean);

		const task = Tasks.findOne(taskId);

		if( task.private && task.owner !== this.userId) {
			throw new Meteor.Error('not-authorized');
		}

		Tasks.update(taskId, {
			$set: { checked: setChecked},
		});

	},
	'tasks.setPrivate'(taskId, setPrivateState) {
		check(taskId, String);
		check(setPrivateState, Boolean);

		const task = Tasks.findOne(taskId);

		if(task.owner !== this.userId) {
			throw new Meteor.Error('not-authorized');
		}

		Tasks.update(taskId, { $set: { private : setPrivateState} });
	},
});