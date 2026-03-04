const ReportService = require("../services/report.service");

class ReportController {

  // ==========================================
  // GET SINGLE REPORT (Interaction View)
  // ==========================================
  static async getPost(req, res, next) {
    try {
      const { reportId } = req.params;

      const post = await ReportService.getPost(reportId);

      return res.status(200).json({
        success: true,
        data: post
      });

    } catch (error) {
      next(error);
    }
  }


  // ==========================================
  // UPVOTE REPORT
  // ==========================================
  static async upvote(req, res, next) {
    try {
      const { reportId } = req.params;

      if (!req.user?.id) {
        return res.status(401).json({
          success: false,
          message: "Authentication required"
        });
      }

      const updated = await ReportService.upvote(
        reportId,
        req.user.id
      );

      return res.status(200).json({
        success: true,
        message: "Upvote registered successfully",
        upvote_count: updated.upvote_count
      });

    } catch (error) {
      next(error);
    }
  }


  // ==========================================
  // REMOVE UPVOTE (Optional Feature)
  // ==========================================
  static async removeUpvote(req, res, next) {
    try {
      const { reportId } = req.params;

      if (!req.user?.id) {
        return res.status(401).json({
          success: false,
          message: "Authentication required"
        });
      }

      const updated = await ReportService.removeUpvote(
        reportId,
        req.user.id
      );

      return res.status(200).json({
        success: true,
        message: "Upvote removed",
        upvote_count: updated.upvote_count
      });

    } catch (error) {
      next(error);
    }
  }


  // ==========================================
  // ADD COMMENT
  // ==========================================
  static async addComment(req, res, next) {
    try {
      const { reportId } = req.params;
      const { text } = req.body;

      if (!req.user?.id) {
        return res.status(401).json({
          success: false,
          message: "Authentication required"
        });
      }

      if (!text) {
        return res.status(400).json({
          success: false,
          message: "Comment text is required"
        });
      }

      const updated = await ReportService.addComment(reportId, {
        user_id: req.user.id,
        text
      });

      return res.status(201).json({
        success: true,
        message: "Comment added successfully",
        comment_count: updated.comment_count
      });

    } catch (error) {
      next(error);
    }
  }


  // GET ALL REPOrts
  static async getBulkInteraction(req,res){
    try {
      const {report_ids} = req.body;

      if(!report_ids || !Array.isArray(report_ids)){
        return res.status(400).json({
          success:false,
          message:"report_ids must be an array"
        });

      }

      const data = await ReportService.getBulk(report_ids);
      return res.status(200).json({
        success:true,
        data
      });
      
    } catch (error) {
      return res.status(500).json({
        success:false,
        message:error.message
      })
    }
  }


  // edit comment

  static async EditComment(req,res){
    
    try {

      const {report_id,comment_id} = req.params;
      const user_id = req.user.id;
      const {text} = req.body;

      const result = await ReportService.editComment(report_id,comment_id,user_id,text);

      return res.status(200).json({
        success:true,
        message:"Comment updated Successfully",
        data:result
      });
      
    } catch (error) {
      return res.status(500).json({
        success:false,
        message:error.message
      })
    }
  }


//  Delete Comment 

static async DeleteComment(req,res){
  try {
    
    const {report_id,comment_id} = req.params;
    const user_id = req.user.id;

    const result = await ReportService.deleteComment(report_id,comment_id,user_id);

    return res.status(200).json({
      success:true,
      message:"Comment deleted Successfully",
      data:result
    });
  } catch (error) {
    return res.status(500).json({
        success:false,
        message:error.message
      })
  }
}

}

module.exports = ReportController;
