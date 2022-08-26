module.exports = {
  async afterCreate(event) {
    const { result } = event;

    await strapi.service("api::atlassian-setting.atlassian-setting").sendTicket({
      summary: "You have a new order!",
      project: "SL",
      issue_type: '10001'
    });
  },
};
