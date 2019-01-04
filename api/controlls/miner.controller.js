import * as Miner_Services from '../services/miner.service';

export async function createMiner(req, res) {
  try {
    let data = req.body;
    if(!data.username || !data.address_eth || !data.email){
      throw {
        status:400,
        success:false,
        error: "Parameter Invalid."
      }
    }
    data = await Miner_Services.createMiner(data);
    return res.json({
      success: true,
      data
    });
  } catch (err) {
    return res.status(err.status).json(err);
  }
}

export async function getMiner(req, res) {
  try {
    let data = req.query.address || null;
    if(!data){
      throw {
        status:400,
        success:false,
        error: "Parameter Invalid."
      }
    }
    data = await Miner_Services.getMiner(data);
    return res.json({
      success: true,
      data
    });
  } catch (err) {
    return res.status(err.status).json(err);
  }
}
