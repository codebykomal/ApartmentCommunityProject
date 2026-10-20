function roleMiddleware(requiredRole){

    function checkRole(req,res,next)
    {
        if(req.user.role !== requiredRole)
        {
            return res.status(403).json({message:"Access Denied"});
        }

        next();
    }

    return checkRole;
}

module.exports = roleMiddleware;
/*
apartmentCommunity> db.users.updateOne({_id:ObjectId('6a8ef11b93bff7ae5104d173')},{$set:{role:"ADMIN"}})
{
  acknowledged: true,
  insertedId: null,
  matchedCount: 1,
  modifiedCount: 1,
  upsertedCount: 0
}
apartmentCommunity> db.users.find( {}, { name: 1, email: 1, role: 1 } )
[
  {
    _id: ObjectId('6a8ef11b93bff7ae5104d173'),
    name: 'dev',
    email: 'd@gmail.com',
    role: 'ADMIN'
  },
  {
    _id: ObjectId('6a908431e92edab4814ca36a'),
    name: 'komal',
    email: 'k@gmail.com',
    role: 'RESIDENT'
  },
  {
    _id: ObjectId('6a908442e92edab4814ca36b'),
    name: 'jiyu',
    email: 'j@gmail.com',
    role: 'RESIDENT'
  }
]*/