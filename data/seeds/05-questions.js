exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("questions")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("questions").insert([
        {
          topic_id: 1,
          type: "context",
          style: "text",
          question: "What is our current priority?",
          default: true
        },
        {
          topic_id: 1,
          type: "context",
          style: "text",
          question: "When is the next deadline?",
          default: true
        },
        {
          topic_id: 1,
          type: "context",
          style: "text",
          question: "Are there any announcements for the team?",
          default: true
        },
        {
          topic_id: 1,
          type: "request",
          style: "text",
          question: "What are you working on?",
          default: true
        },
        {
          topic_id: 1,
          type: "request",
          style: "text",
          question: "What will you work on?",
          default: true
        },
        {
          topic_id: 1,
          type: "request",
          style: "text",
          question: "Do you have any blockers?",
          default: true
        },
        {
          topic_id: 2,
          type: "context",
          style: "text",
          question: "What is our current priority?",
          default: true
        },
        {
          topic_id: 2,
          type: "context",
          style: "text",
          question: "When is the next deadline?",
          default: true
        },
        {
          topic_id: 2,
          type: "context",
          style: "text",
          question: "Are there any announcements for the team?",
          default: false
        },
        {
          topic_id: 2,
          type: "request",
          style: "text",
          question: "What are you working on?",
          default: true
        },
        {
          topic_id: 2,
          type: "request",
          style: "text",
          question: "What will you work on?",
          default: true
        },
        {
          topic_id: 2,
          type: "request",
          style: "text",
          question: "Do you have any blockers?",
          default: false
        },
      ]);
    });
};
