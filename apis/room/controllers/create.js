import Room from '../../../models/Room.js';

const createController = (req, res) => {
  const newRoom = new Room({
    name: req.body.name,
    accessType: req.body.accessType,
    ownerID: req.user._id,
    password: req.body.password,
    ageRestricted: req.body.ageRestricted ? true : false,
    members: [{_id: req.user._id}],
    description: req.body.description
  });
  newRoom.save()
    .then(room => {
      console.log(room);
      res.status(200).redirect('/app');
    })
    .catch(err => console.log(err)
    )
};

export default createController;
