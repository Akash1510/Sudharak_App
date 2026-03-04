const ReportModel = require("../models/report.model");
const ReportEntity = require("../entities/report.entities");

class PostRepository {

  // ========================================
  // CREATE INTERACTION ENTRY (When report created)
  // ========================================
  static async createPost(report_id, department) {

    if (!report_id) {
      throw new Error("Report ID is required");
    }

    const existing = await ReportModel.findOne({ report_id });
    if (existing) {
      return new ReportEntity(existing);
    }

    const post = await ReportModel.create({
      report_id,
      department,
      upvote_count: 0,
      upvoted_by: [],
      comments: []
    });

    return new ReportEntity(post);
  }


  // ========================================
  // FIND REPORT BY ID (RAW DOCUMENT)
  // ========================================
  static async findByReportId(report_id) {

    if (!report_id) {
      throw new Error("Report ID is required");
    }

    const post = await ReportModel.findOne({ report_id });

    if (!post) {
      throw new Error("Report not found");
    }

    return post;
  }


  // ========================================
  // ATOMIC UPVOTE (Duplicate Safe)
  // ========================================
  static async incrementUpvote(report_id, user_id) {

    if (!user_id) {
      throw new Error("User ID required for upvote");
    }

    const updated = await ReportModel.findOneAndUpdate(
      {
        report_id,
        upvoted_by: { $ne: user_id }
      },
      {
        $inc: { upvote_count: 1 },
        $push: { upvoted_by: user_id }
      },
      { new: true }
    );

    if (!updated) {
      throw new Error("User has already upvoted");
    }

    return new ReportEntity(updated);
  }


  // ========================================
  // ADD COMMENT
  // ========================================
  static async addComment(report_id, comment) {

    if (!comment || !comment.text) {
      throw new Error("Comment text is required");
    }

    const updated = await ReportModel.findOneAndUpdate(
      { report_id },
      {
        $push: {
          comments: {
            user_id: comment.user_id,
            text: comment.text.trim(),
            created_at: new Date()
          }
        }
      },
      { new: true }
    );

    if (!updated) {
      throw new Error("Report not found");
    }

    return new ReportEntity(updated);
  }

  // Edit Comment

  static async EditComment(reportId,commentId,userId,newComment) {

  if(!newComment || !newComment.trim()){
    throw new Error("Comment text is required")
  }
    const updated = await ReportModel.findOneAndUpdate({
       reportId,
      "comments._id":commentId,
      "comments.user_id":userId

    },{
      $set:{
        "comments.$.text":newComment.trim(),
        "comments.$.updated_at":new Date()
      }
    },{
      new:true
    });
    
    if(!updated){
      throw new Error("Comment not found or not authorized");
    }

    return new ReportEntity(updated);
  }


  // Delete Comment

  static async DeleteComment(reportId,commentId,userId){
    const updated = await ReportModel.findOneAndUpdate({
      reportId
    },{
      $pull:{
        comments:{
          _id:commentId,
          user_id:userId
        }
      }
    },{
      new:true
    });
    if(!updated){
      throw new Error("Report Not found");
    }
    return new ReportEntity(updated);
  }

  // ========================================
  // REMOVE UPVOTE (Optional Feature)
  // ========================================
  static async removeUpvote(report_id, user_id) {

    const updated = await ReportModel.findOneAndUpdate(
      {
        report_id,
        upvoted_by: user_id
      },
      {
        $inc: { upvote_count: -1 },
        $pull: { upvoted_by: user_id }
      },
      { new: true }
    );

    if (!updated) {
      throw new Error("User has not upvoted yet");
    }

    return new ReportEntity(updated);
  }


  // ========================================
  // GET REPORT (ENTITY FORMAT)
  // ========================================
  static async getReportEntity(report_id) {

    const post = await this.findByReportId(report_id);

    return new ReportEntity(post);
  }

  // Get All Reports

  static async findByReportIds(report_ids){
    const interactions = await ReportModel.find({
      report_id:{$in : report_ids}
    }).select("report_id status upvote_count comments upvoted_by").lean()
   

    //  show only last 2 comments 
    return interactions.map(
      item => ({
        ...item,
        comments : item.comments.slice(-2)
      })
    );
  }

}

module.exports = PostRepository;
