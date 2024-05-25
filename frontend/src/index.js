const { BigQuery } = require('@google-cloud/bigquery');
const bigquery = new BigQuery();

exports.getLocation = async (req, res) => {
  const merchantID = req.query.merchantID;

  if (!merchantID) {
    res.status(400).send('Merchant ID is required');
    return;
  }

  const query = `
    SELECT pincode, latitude, longitude
    FROM \`your_project_id.bob_the_builder.indian_pincode_merchant_map\`
    WHERE merchantID = @merchantID
  `;

  const options = {
    query: query,
    params: { merchantID: merchantID },
  };

  try {
    const [rows] = await bigquery.query(options);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).send(`Error querying BigQuery: ${err.message}`);
  }
};
