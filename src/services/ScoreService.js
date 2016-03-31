export default class ScoreService {
    setConnection(connection) {
        this.connection = connection;
    }

    getScores(versionId, callback) {
        this.connection.query(
            `SELECT
                s.*,
                v.fairway_count
            FROM 
                lk_score AS s
                JOIN lk_course_version AS v ON s.course_vid = v.id
            WHERE
                s.course_vid = :version_id`,
            {version_id: versionId},
            callback
        );
    }
}
