class StatusUpdateEntity {
  constructor({ report_id, old_status, new_status }) {
    this.report_id = report_id;
    this.previous_status = old_status;
    this.current_status = new_status;
    this.updated_at = new Date();
  }
}

module.exports = StatusUpdateEntity;
