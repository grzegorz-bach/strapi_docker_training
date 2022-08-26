"use strict";

const { default: axios } = require("axios");

/**
 * atlassian-setting service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService(
  "api::atlassian-setting.atlassian-setting",
  ({ strapi }) => ({
    async sendTicket({ summary, description, project, issue_type }) {
      try {
        const config = await strapi.entityService.findMany(
          "api::atlassian-setting.atlassian-setting"
        );
        await axios({
          url: `${config.cloud_domain}/rest/api/3/issue`,
          method: "post",
          headers: {
            Authorization: `Basic ${btoa(
              `${config.user_email}:${config.api_token}`
            )}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          data: {
            fields: {
              summary,
              issuetype: {
                id: issue_type,
              },
              project: {
                key: project,
              },
              description: {
                type: "doc",
                version: 1,
                content: [
                  {
                    type: "paragraph",
                    content: [
                      {
                        text: description || "",
                        type: "text",
                      },
                    ],
                  },
                ],
              },
            },
          },
        });
      } catch (err) {
        console.log({ err });
      }
    },
  })
);
