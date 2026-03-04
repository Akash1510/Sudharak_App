class DashboardStatsEntity {
  constructor({
    total = 0,
    pending = 0,
    in_progress = 0,
    resolved = 0,
    rejected = 0
  }) {
    this.total = total;
    this.pending = pending;
    this.in_progress = in_progress;
    this.resolved = resolved;
    this.rejected = rejected;
  }
}

module.exports = DashboardStatsEntity;
