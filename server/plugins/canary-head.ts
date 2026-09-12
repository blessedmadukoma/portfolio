import {
  contactProtocolText,
  createContactReference,
} from "#shared/utils/canary";

const REFERENCE_PATTERN = /BM-[a-z0-9]+-[a-z0-9]+/;

function escapeAttribute(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("render:html", (html) => {
    // Reuse the code the page already rendered so both surfaces agree.
    const rendered = html.body.join("").match(REFERENCE_PATTERN)?.[0];
    const text = contactProtocolText(rendered ?? createContactReference());

    html.head.push(`<!-- ${text.replace(/--+/g, "-").replace(/>/g, "")} -->`);
    html.head.push(
      `<meta name="contact-protocol" content="${escapeAttribute(text)}">`,
    );
  });
});
