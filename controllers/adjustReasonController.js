const  AdjustReasonService = require('../services/adjust_reason.service');

exports.getAdjustReasons = async (req, res) => {
    try {
      const response = await AdjustReasonService.getAllAdjustment_reason();
      res.json(response);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

exports.createReason = async (req, res) => { 
    try {
        const { reason, description, status } = req.body
        const ifExists = await AdjustReasonService.getByName(reason)
        if (!ifExists) {
            const response = await AdjustReasonService.createReason({reason, description, status})
            res.json(response);
        } else {
            res.status(200).json({message : "Adjustment Reason already exists"})
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getReasonById = async (req, res) => {
    try {
        const id = req.params.id;
        const response =  await AdjustReasonService.getReasonById(id);
        res.json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

  exports.deleteReason = async (req, res) => {
    try {
      const id = req.params.id;
      const supData = await AdjustReasonService.deleteReason(id);
      res.status(200).json(supData);
    } catch (error) {
      if (error.statusCode) {
        res.status(error.statusCode).json({
          status: error.statusCode,
          error: error.message,
          
        });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  };

  exports.restoreReason = async (req, res) => {
    try {
      const id = req.params.id;
      const supData = await AdjustReasonService.restoreReason(id);
      res.status(200).json(supData);
    } catch (error) {
      if (error.statusCode) {
        res.status(error.statusCode).json({
          status: error.statusCode,
          error: error.message,
          
        });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  };

  exports.editReason = async (req, res) => {
    try {
      const id = req.params.id;
      const { reason, description, status } = req.body
      const supData = await AdjustReasonService.editReason(id, reason, description, status);
      res.status(200).json(supData);
    } catch (error) {
      if (error.statusCode) {
        res.status(error.statusCode).json({
          status: error.statusCode,
          error: error.message,
          
        });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  };

  