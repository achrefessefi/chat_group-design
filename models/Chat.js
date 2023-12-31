const { DataTypes } = require('sequelize');
 
const Chat = (sequelize) => {
  const ChatModel = sequelize.define('Chat', {
    content: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return ChatModel;
};
 
module.exports = Chat;