import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { defineComponent, h } from "vue";
import { createI18n } from "vue-i18n";
import { useTranslate } from "../translate";

function mountWithTranslate() {
  const i18n = createI18n({
    legacy: false,
    locale: "en",
    // A message function, like the ones the vite plugin makes from the
    // locale files. Without vite, vue-i18n can't compile a plain string.
    messages: { en: { hello: () => "Hello" } },
  });
  let to: ReturnType<typeof useTranslate>["to"] = () => undefined;
  const Comp = defineComponent({
    setup() {
      to = useTranslate().to;
      return () => h("div");
    },
  });
  mount(Comp, { global: { plugins: [i18n] } });
  return to;
}

describe("useTranslate", () => {
  it("returns the text of a key that exists", () => {
    const to = mountWithTranslate();
    expect(to("hello")).toBe("Hello");
  });

  it("returns undefined for a key that does not exist", () => {
    const to = mountWithTranslate();
    expect(to("missing")).toBeUndefined();
  });
});
