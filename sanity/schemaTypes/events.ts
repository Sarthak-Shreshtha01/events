import { defineField, defineType } from "sanity";

export const events = defineType({
  name: "events",
  title: "Events",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "manager",
      type: "reference",
      to: { type: "manager" },
    }),
    defineField({
      name: "attendees",
      type: "number",
    }),
    defineField({
      name: "description",
      type: "text",
    }),
    defineField({
      name: "category",
      type: "string",
      validation: (Rule) =>
        Rule.min(1).max(20).required().error("Please enter a category"),
    }),
    defineField({
      name: "image",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "eventDateTime",
      title: "Date and Time of Event",
      type: "datetime",
    }),
  ],
});