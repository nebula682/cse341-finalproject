const mongodb = require('../data/database');
const ObjectId  = require('mongodb').ObjectId;

const getAll = async (req, res) => {
                 // GET /students
// #swagger.tags = ['students']
// #swagger.description = 'Gets all students'

                const result = await mongodb.getDatabase().db().collection('students').find();
                result.toArray().then((students) => {
                                res.setHeader('Content-Type', 'application/json');
                                res.status(200).json(students);

});
};

const getSingle = async (req, res) => {
                //#swagger.tags=['students']
                const studentId = new ObjectId(req.params.id);
                const result = await mongodb.getDatabase().db().collection('students').find({ _id: studentId});
                result.toArray().then((students) => {
                                res.setHeader('Content-Type', 'application/json');
                                res.status(200).json(students[0]);

                });

};
const createStudent = async (req, res) =>{
                //#swagger.tags=['students']
                
                const student = {
                                firstName:req.body.firstName,
                                lastName:req.body.lastName,
                                email:req.body.email,
                                enrollmentDate:req.body.enrollmentDate,
                                courses:req.body.courses,
                                gpa:req.body.gpa,
                                dateOfBirth:req.body,dateOfBirth
};
const response = await mongodb.getDatabase().db().collection('students').insertOne(student) ;
if (response.acknowledged){
                res.status(204).json({ message: 'Student created successfully' }); 

} else{
                res.status(500).json(response.error ||' Some error occurred while updating the Student');
}
};
const updateStudent = async (req, res) =>{
                //#swagger.tags=['students']
                const studentId = new ObjectId(req.params.id);
                const student = { 
                                firstName:req.body.firstName,
                                lastName:req.body.lastName,
                                email:req.body.email,
                                enrollmentDate:req.body.enrollmentDate,
                                courses:req.body.courses,
                                gpa:req.body.gpa,
                                dateOfBirth:req.body,dateOfBirth
                                 
};
                                

const response = await mongodb.getDatabase().db().collection('students').replaceOne({ _id: studentId }, student);
if (response.modifiedCount > 0) {
                res.status(204).send();
                } else {
                                res.status(500).json(response.error || 'Some error occured while updating the student.');
}
};












const deleteStudent = async (req, res) => {
                const contactId = new ObjectId(req.params.id);
                const response = await mongodb.getDatabase().db().collection('students').deleteOne({ _id: studentId},);
                if (response.deletedCount > 0) {
                                res.status(204).send();
                                } else {
                                                res.status(500).json(response.error || 'Some error occurred while deleting the Student');
                }

}


module.exports ={
                getAll,
                getSingle,
                createStudent,
                updateStudent,
                deleteStudent


};