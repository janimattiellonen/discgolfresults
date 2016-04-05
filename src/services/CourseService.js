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
                l.id AS lid,
                l.layout,
                l.description,
                v.id AS vid,
                v.version
             FROM
                lk_course AS c JOIN lk_course_version AS v ON c.id = v.course_id
                JOIN lk_course_layout AS l ON l.id = v.layout_id
             ORDER BY 
                c.name ASC, 
                c.code ASC`,
            callback
        );
    }

    toArray(courses) {
        let arr = null;

        courses = courses.map(course => {
            
            course.layouts = course.layouts.map(layout => {
                layout.versions = layout.versions.toArray();

                return layout;
            });

            course.layouts = course.layouts.toArray();

            return course;
        });

        return courses.toArray();
    }
}
