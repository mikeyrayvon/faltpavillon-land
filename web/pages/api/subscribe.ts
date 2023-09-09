import mailchimp from "@mailchimp/mailchimp_marketing"

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: "us12",
});

export default async (req, res) => {
  const { first, last, email, zip, state, priceId, route } = req.body
  const response = await mailchimp.lists.batchListMembers(process.env.MAILCHIMP_LIST_ID, {
    members: [{
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        'FNAME': first,
        'LNAME': last,
        'MMERGE26': state,
        'MMERGE27': zip,
        'MMERGE28': priceId,
        'MMERGE29': route
      },
    }],
    update_existing: true
  });

  res.statusCode = 200
  res.json(response)
}
