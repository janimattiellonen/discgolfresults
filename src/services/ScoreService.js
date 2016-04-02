export default class ScoreService {
    setConnection(connection) {
        this.connection = connection;
    }

    getScores(versionId, callback) {
        this.connection.query(
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
            {version_id: versionId},
            callback
        );
    }
}
