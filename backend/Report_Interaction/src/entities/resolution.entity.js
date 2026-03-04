class ResolutionEntity {
  constructor({ report_id, resolved_image, resolved_by }) {
    this.report_id = report_id;
    this.resolved_image = resolved_image;
    this.resolved_by = resolved_by;
    this.resolved_at = new Date();
  }
}

module.exports = ResolutionEntity;
