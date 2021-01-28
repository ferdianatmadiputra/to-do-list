'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.addConstraint('Tasks', {
      fields: ['UserId'],
      type: 'foreign key',
      name: 'fkey_user_to_tasks',
      references: { 
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
    .then(()=> {
      return queryInterface.addConstraint('Tasks', {
        fields: ['ProjectId'],
        type: 'foreign key',
        name: 'fkey_project_to_tasks',
        references: { 
          table: 'Projects',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
    })
    .then(() => {
      return queryInterface.addConstraint('UserProjects', {
        fields: ['ProjectId'],
        type: 'foreign key',
        name: 'fkey_project_to_userprojects',
        references: { 
          table: 'Projects',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
    })
    .then(() => {
      return queryInterface.addConstraint('UserProjects', {
        fields: ['UserId'],
        type: 'foreign key',
        name: 'fkey_user_to_userprojects',
        references: { 
          table: 'Users',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
    })
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface
    .removeConstraint('Tasks','fkey_user_to_tasks')
    .then(()=>{
      return queryInterface
      .removeConstraint('Tasks','fkey_project_to_tasks')
    })
    .then(()=>{
      return queryInterface
      .removeConstraint('UserProjects','fkey_project_to_userprojects')
    })
    .then(()=>{
      return queryInterface
      .removeConstraint('UserProjects','fkey_user_to_userprojects')
    })
  }
};
