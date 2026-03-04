class ReportEntity {
  constructor(obj) {
    

    this.report_id = obj.report_id;
    this.department = obj.department;

    this.status = obj.status;
    this.severity = obj.severity;

    this.upvote_count = obj.upvote_count || 0;

    this.comment_count = obj.comments?.length || 0;

    this.upvoted_by = obj.upvoted_by || [];

    this.comments = obj.comments?.map(comment => ({
      user_id: comment.user_id,
      text: comment.text,
      created_at: comment.created_at
    })) || [];

    this.created_at = obj.createdAt;
    this.updated_at = obj.updatedAt;
  }
}

module.exports = ReportEntity;
