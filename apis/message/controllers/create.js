import message from '../../../models/Message.js';

const createController = (req, res) => {
  const newmessage = new message({
    sender_id: req.user._id,
    data: req.body.data,
    timestamp: req.time,
    recipient_id: req.room._id
  });
  newmessage.save()
    .then(message => {
      console.log(message);
      res.status(200).redirect('/app');
    })
    .catch(err => console.log(err)
    );
};

export default createController;
