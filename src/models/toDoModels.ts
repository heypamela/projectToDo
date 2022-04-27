import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db/pg';

export interface IToDo extends Model {
  id_to_do: number,
  title: string,
  deadline: string,
  category: string,
  done: boolean
}

export interface IUser extends Model {
  id_user: number,
  name: string,
  email: string,
  password: string
}

export const toDo = sequelize.define<IToDo>('ToDo', {
  id_to_do: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  title: {
    type: DataTypes.STRING
  },
  deadline: {
    type: DataTypes.STRING
  },
  category: {
    type: DataTypes.STRING
  },
  done: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'to-dos',
  timestamps: false
});

export const User = sequelize.define<IUser>('Users', {
  id_user: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'users',
  timestamps: false
});


toDo.belongsToMany(User, { through: 'toDoUser' });
User.belongsToMany(toDo, { through: 'toDoUser' });