const ReportRepository = require("../repositories/report.repository");

class ReportService {

  // ==========================================
  // CREATE INTERACTION ENTRY
  // (Called when report created - Kafka/internal)
  // ==========================================
  static async createPost(report_id, department) {

    if (!report_id) {
      throw new Error("Report ID is required");
    }

    return ReportRepository.createPost(report_id, department);
  }


  // ==========================================
  // GET REPORT (ENTITY FORMAT)
  // ==========================================
  static async getPost(report_id) {

    if (!report_id) {
      throw new Error("Report ID is required");
    }

    return ReportRepository.getReportEntity(report_id);
  }


  // ==========================================
  // UPVOTE (Atomic Safe)
  // ==========================================
  static async upvote(report_id, user_id) {

    if (!report_id) {
      throw new Error("Report ID is required");
    }

    if (!user_id) {
      throw new Error("User must be authenticated to upvote");
    }

    // Atomic handled inside repository
    return ReportRepository.incrementUpvote(report_id, user_id);
  }


  // ==========================================
  // REMOVE UPVOTE (Optional Feature)
  // ==========================================
  static async removeUpvote(report_id, user_id) {

    if (!report_id) {
      throw new Error("Report ID is required");
    }

    if (!user_id) {
      throw new Error("User must be authenticated");
    }

    return ReportRepository.removeUpvote(report_id, user_id);
  }


  // ==========================================
  // ADD COMMENT
  // ==========================================
  static async addComment(report_id, comment) {

    if (!report_id) {
      throw new Error("Report ID is required");
    }

    if (!comment || !comment.text) {
      throw new Error("Comment text is required");
    }

    if (comment.text.length > 500) {
      throw new Error("Comment cannot exceed 500 characters");
    }

    if (!comment.user_id) {
      throw new Error("User must be authenticated to comment");
    }

    return ReportRepository.addComment(report_id, comment);
  }

//   EDit Comment

static async editComment(reportId,commentId,userId,newComment){
  if(!reportId){
    throw new Error("Report Id is required");
  }
  if(newComment.text.length > 500){
    throw new Error("Comment cannot exceed 500 characer")
  }
  if(!newComment.userId){
    throw new Error("User must be authenticated to comment");
  }
  return ReportRepository.EditComment(reportId,commentId,userId,newComment);
}

static async deleteComment(reportId,commentId,userId){
  
  if(!reportId)
  {
    throw new Error("Report Id is requierd");
  }
  if(!commentId){
    throw new Error("Comment Id is required");
  }
  if(!userId){
    throw new Error("user Id is required");
  }
  return ReportRepository.DeleteComment(reportId,commentId,userId);
}
  // Get Interaction Reports

  static async getBulk(report_ids){
    if(!report_ids.length ) return [];

    return ReportRepository.findByReportIds(report_ids);
    
  }

}

module.exports = ReportService;
