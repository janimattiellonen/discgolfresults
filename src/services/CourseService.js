export default class CourseService {
    setConnection(connection) {
        this.connection = connection;
    }

    getCourses(callback) {
        this.connection.query(
            `SELECT
                c.id AS course_id,
                c.name,
                c.code,
                v.*,
                v.id AS course_version
             FROM
                lk_course AS c JOIN lk_course_version AS v ON v.course_id = v.id
             ORDER BY 
                c.name ASC, 
                c.code ASC
            `
            callback
        );
    }
}

/*

`SELECT
                s.id AS score_id,
                s.par_total as score,
                s.*,
                v.id AS version_id,
                v.*,
                c.code,
                c.name
            FROM 
                lk_score AS s
                JOIN lk_course_version AS v ON s.course_vid = v.id
                JOIN lk_course AS c ON v.course_id = c.id
            WHERE
                s.course_vid = :version_id
            ORDER BY
                s.date DESC`,
                */