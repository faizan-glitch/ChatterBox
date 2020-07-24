// import message from '../../../models/message.js';

//! This is all messages delete file has not been changed accordingly

// const deletemessageByID = (req, res) => {
//   message.findOneAndDelete(
//     {
//       _id: req.params.id,
//       ownerID: req.user._id
//     }
//   )
//     .then(_ => { return res.status(200).send(); })
//     .catch(err => { return res.status(500).send(); });
//   return res.status(403).send();
// };

// const deletemessagesByUserID = async (req, res) => {
//   const result = await message.deleteMany({ ownerID: req.user._id });
//   res.status(200).send(result);
// };

// const deleteUserFrommessage = async (req, res) => {
//   if (!req.isAuthenticated() || req.user._id !== req.body.userID) {
//     return res.status(403).send();
//   }
//   const result = await message.findById({ _id: req.body.messageID });
//   result.members.pull({ _id: req.body.userID });
//   res.status(200).send();
//   result.save();
// };

// export default {
//   deletemessageByID,
//   deletemessagesByUserID,
//   deleteUserFrommessage
// };