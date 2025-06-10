const mongodb = require('../data/database');
const ObjectId  = require('mongodb').ObjectId;

const getAll = async (req, res) => {
                // GET /courses
// #swagger.tags = ['Courses']
// #swagger.description = 'Gets all courses'
                const result = await mongodb.getDatabase().db().collection('courses').find();
                result.toArray().then((courses) => {
                                res.setHeader('Content-Type', 'application/json');
                                res.status(200).json(courses);

});
};

const getSingle = async (req, res) => {
                             // GET /courses
// #swagger.tags = ['Courses']
// #swagger.description = 'Gets single'   
                const courseId = new ObjectId(req.params.id);
                const result = await mongodb.getDatabase().db().collection('courses').find({ _id: courseId});
                result.toArray().then((courses) => {
                                res.setHeader('Content-Type', 'application/json');
                                res.status(200).json(courses[0]);

                });

};
const createCourse = async (req, res) =>{
                //#swagger.tags=['courses']
                
                const course = {
                                courseName:req.body.courseNameName,
                                department:req.body.department,
                                credits:req.body.description,
                                instructor:req.body.instructor,
                                startDate:req.body.startDate,
                                endDate:req.body.endDate,
                                schedule:req.body.schedule,
                                prerequisites:req.body.prerequisites,
                                level:req.body.level

};
const response = await mongodb.getDatabase().db().collection('courses').insertOne(course) ;
if (response.acknowledged){
                res.status(204).json({ message: 'Course created successfully' }); 

} else{
                res.status(500).json(response.error ||' Some error occurred while updating the Course');
}
};
const updateCourse = async (req, res) =>{
                //#swagger.tags=['courses']
                const courseId = new ObjectId(req.params.id);
                const course = {
                                  courseName:req.body.courseNameName,
                                department:req.body.department,
                                credits:req.body.description,
                                instructor:req.body.instructor,
                                startDate:req.body.startDate,
                                endDate:req.body.endDate,
                                schedule:req.body.schedule,
                                prerequisites:req.body.prerequisites,
                                level:req.body.level

};
                                

const response = await mongodb.getDatabase().db().collection('courses').replaceOne({ _id: courseId }, course);
if (response.modifiedCount > 0) {
                res.status(204).send();
                } else {
                                res.status(500).json(response.error || 'Some error occured while updating the course.');
}
};












const deleteCourse = async (req, res) => {
                const courseId = new ObjectId(req.params.id);
                const response = await mongodb.getDatabase().db().collection('courses').deleteOne({ _id: courseId},);
                if (response.deletedCount > 0) {
                                res.status(204).send();
                                } else {
                                                res.status(500).json(response.error || 'Some error occurred while deleting the Course');
                }

}


module.exports ={
                getAll,
                getSingle,
                createCourse,
                updateCourse,
                deleteCourse


};