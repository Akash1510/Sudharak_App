class DashboardReportEntity {
  constructor(doc) {
    const obj = doc.toJSON ? doc.toJSON() : doc;

    this.report_id = obj.report_id;
    this.department = obj.department;
    this.status = obj.status;
    this.severity = obj.severity;

    this.upvote_count = obj.upvote_count;
    this.comment_count = obj.comments?.length || 0;

    this.resolved_image = obj.resolved_image;
    this.resolved_by = obj.resolved_by;
    this.resolved_at = obj.resolved_at;

    this.created_at = obj.createdAt;
    this.updated_at = obj.updatedAt;
  }
}

module.exports = DashboardReportEntity;
