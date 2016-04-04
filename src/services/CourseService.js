export default class CourseService {
    setConnection(connection) {
        this.connection = connection;
    }

    getCourses(callback) {
        this.connection.query(
            `SELECT
                c.id AS cid,
                c.name,
                c.code,
                v.id AS vid
             FROM
                lk_course AS c JOIN lk_course_version AS v ON v.course_id = v.id
             ORDER BY 
                c.name ASC, 
                c.code ASC`,
            callback
        );
    }
}
